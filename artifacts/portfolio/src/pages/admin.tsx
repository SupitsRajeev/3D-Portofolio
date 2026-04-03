import { useState } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useContent } from "@/context/ContentContext";
import { useAuth } from "@/context/AuthContext";
import {
  defaultContent,
  COLOR_SCHEMES,
  SKILL_ICONS,
  PROJECT_ICONS,
  HIGHLIGHT_ICONS,
  type PortfolioContent,
  type ColorScheme,
  type Project,
  type SkillGroup,
  type AboutHighlight,
} from "@/content";
import { ArrowLeft, Plus, Trash2, RotateCcw, Save, GripVertical, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Field({
  label,
  id,
  children,
  hint,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      <Separator className="mt-4" />
    </div>
  );
}

/** Visual color-scheme picker */
function ColorPicker({
  value,
  onChange,
}: {
  value: ColorScheme;
  onChange: (v: ColorScheme) => void;
}) {
  const schemes = Object.keys(COLOR_SCHEMES) as ColorScheme[];
  const dotColors: Record<ColorScheme, string> = {
    violet:  "bg-violet-500",
    emerald: "bg-emerald-500",
    orange:  "bg-orange-500",
    cyan:    "bg-cyan-500",
    rose:    "bg-rose-500",
    blue:    "bg-blue-500",
    amber:   "bg-amber-500",
  };
  return (
    <div className="flex gap-2 flex-wrap">
      {schemes.map((s) => (
        <button
          key={s}
          type="button"
          title={s}
          onClick={() => onChange(s)}
          className={cn(
            "w-7 h-7 rounded-full border-2 transition-all",
            dotColors[s],
            value === s ? "border-foreground scale-110" : "border-transparent opacity-60 hover:opacity-90"
          )}
        />
      ))}
    </div>
  );
}

/** Select for icon names */
function IconSelect({
  value,
  onChange,
  registry,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  registry: Record<string, unknown>;
  id: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className="w-48">
        <SelectValue placeholder="Choose icon…" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(registry).map((name) => (
          <SelectItem key={name} value={name}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// ─── Identity section ─────────────────────────────────────────────────────────
function IdentitySection({
  draft,
  setDraft,
}: {
  draft: PortfolioContent;
  setDraft: React.Dispatch<React.SetStateAction<PortfolioContent>>;
}) {
  const id = draft.identity;
  const set = (patch: Partial<typeof id>) =>
    setDraft((d) => ({ ...d, identity: { ...d.identity, ...patch } }));

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full Name" id="name" hint="Used in footer and About section">
          <Input id="name" value={id.name} onChange={(e) => set({ name: e.target.value })} />
        </Field>
        <Field label="First Name" id="firstName" hint="Shown in the nav logo">
          <Input id="firstName" value={id.firstName} onChange={(e) => set({ firstName: e.target.value })} />
        </Field>
      </div>

      <Field label="Title / Role" id="title">
        <Input id="title" value={id.title} onChange={(e) => set({ title: e.target.value })} />
      </Field>

      <Field label="Tagline" id="tagline" hint="Short one-liner shown under your name in the Hero">
        <Textarea id="tagline" rows={2} value={id.tagline} onChange={(e) => set({ tagline: e.target.value })} />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email" id="email">
          <Input id="email" type="email" value={id.email} onChange={(e) => set({ email: e.target.value })} />
        </Field>
        <Field label="Location" id="location">
          <Input id="location" value={id.location} onChange={(e) => set({ location: e.target.value })} />
        </Field>
      </div>

      <div className="flex flex-wrap gap-8 pt-2">
        <div className="flex items-center gap-3">
          <Switch
            id="availableForWork"
            checked={id.availableForWork}
            onCheckedChange={(v) => set({ availableForWork: v })}
          />
          <Label htmlFor="availableForWork">Available for Work</Label>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            id="availableRemote"
            checked={id.availableRemote}
            onCheckedChange={(v) => set({ availableRemote: v })}
          />
          <Label htmlFor="availableRemote">Available for Remote</Label>
        </div>
      </div>
    </div>
  );
}

// ─── About section ────────────────────────────────────────────────────────────
function AboutSection({
  draft,
  setDraft,
}: {
  draft: PortfolioContent;
  setDraft: React.Dispatch<React.SetStateAction<PortfolioContent>>;
}) {
  const updateBio = (i: number, val: string) =>
    setDraft((d) => {
      const bio = [...d.bio];
      bio[i] = val;
      return { ...d, bio };
    });
  const removeBio = (i: number) =>
    setDraft((d) => ({ ...d, bio: d.bio.filter((_, idx) => idx !== i) }));
  const addBio = () => setDraft((d) => ({ ...d, bio: [...d.bio, ""] }));

  const updateHighlight = (i: number, patch: Partial<AboutHighlight>) =>
    setDraft((d) => {
      const h = [...d.aboutHighlights];
      h[i] = { ...h[i], ...patch };
      return { ...d, aboutHighlights: h };
    });
  const removeHighlight = (i: number) =>
    setDraft((d) => ({ ...d, aboutHighlights: d.aboutHighlights.filter((_, idx) => idx !== i) }));
  const addHighlight = () =>
    setDraft((d) => ({
      ...d,
      aboutHighlights: [...d.aboutHighlights, { icon: "Star", title: "New Highlight", desc: "" }],
    }));

  return (
    <div className="space-y-8">
      {/* Bio paragraphs */}
      <div>
        <p className="text-sm font-semibold text-foreground mb-3">Bio Paragraphs</p>
        <div className="space-y-3">
          {draft.bio.map((para, i) => (
            <div key={i} className="flex gap-2 items-start">
              <GripVertical className="w-4 h-4 mt-3 text-muted-foreground/40 shrink-0" />
              <Textarea
                rows={3}
                value={para}
                onChange={(e) => updateBio(i, e.target.value)}
                className="flex-1 resize-none"
              />
              <Button
                variant="ghost"
                size="icon"
                className="mt-1 text-muted-foreground hover:text-destructive shrink-0"
                onClick={() => removeBio(i)}
                disabled={draft.bio.length <= 1}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" className="mt-3 gap-2" onClick={addBio}>
          <Plus className="w-3.5 h-3.5" /> Add Paragraph
        </Button>
      </div>

      <Separator />

      {/* About highlights */}
      <div>
        <p className="text-sm font-semibold text-foreground mb-3">About Highlights</p>
        <div className="space-y-4">
          {draft.aboutHighlights.map((h, i) => (
            <div key={i} className="p-4 rounded-xl border border-border/60 bg-card/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Highlight {i + 1}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  onClick={() => removeHighlight(i)}
                  disabled={draft.aboutHighlights.length <= 1}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-[auto_1fr] gap-4 items-start">
                <Field label="Icon" id={`h-icon-${i}`}>
                  <IconSelect
                    id={`h-icon-${i}`}
                    value={h.icon}
                    onChange={(v) => updateHighlight(i, { icon: v })}
                    registry={HIGHLIGHT_ICONS}
                  />
                </Field>
                <Field label="Title" id={`h-title-${i}`}>
                  <Input
                    id={`h-title-${i}`}
                    value={h.title}
                    onChange={(e) => updateHighlight(i, { title: e.target.value })}
                  />
                </Field>
              </div>
              <Field label="Description" id={`h-desc-${i}`}>
                <Textarea
                  id={`h-desc-${i}`}
                  rows={2}
                  value={h.desc}
                  onChange={(e) => updateHighlight(i, { desc: e.target.value })}
                  className="resize-none"
                />
              </Field>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" className="mt-3 gap-2" onClick={addHighlight}>
          <Plus className="w-3.5 h-3.5" /> Add Highlight
        </Button>
      </div>
    </div>
  );
}

// ─── Socials section ──────────────────────────────────────────────────────────
function SocialsSection({
  draft,
  setDraft,
}: {
  draft: PortfolioContent;
  setDraft: React.Dispatch<React.SetStateAction<PortfolioContent>>;
}) {
  const update = (platform: string, href: string) =>
    setDraft((d) => ({
      ...d,
      socials: d.socials.map((s) => (s.platform === platform ? { ...s, href } : s)),
    }));

  return (
    <div className="space-y-5 max-w-lg">
      {draft.socials.map((s) => (
        <Field key={s.platform} label={s.platform} id={`social-${s.platform}`}>
          <Input
            id={`social-${s.platform}`}
            type="url"
            placeholder={`https://${s.platform.toLowerCase()}.com/yourname`}
            value={s.href}
            onChange={(e) => update(s.platform, e.target.value)}
          />
        </Field>
      ))}
    </div>
  );
}

// ─── Projects section ─────────────────────────────────────────────────────────
function ProjectsSection({
  draft,
  setDraft,
}: {
  draft: PortfolioContent;
  setDraft: React.Dispatch<React.SetStateAction<PortfolioContent>>;
}) {
  const [open, setOpen] = useState<number | null>(0);

  const update = (i: number, patch: Partial<Project>) =>
    setDraft((d) => {
      const projects = [...d.projects];
      projects[i] = { ...projects[i], ...patch };
      return { ...d, projects };
    });

  const remove = (i: number) =>
    setDraft((d) => ({ ...d, projects: d.projects.filter((_, idx) => idx !== i) }));

  const add = () => {
    setDraft((d) => ({
      ...d,
      projects: [
        ...d.projects,
        { title: "New Project", description: "", stack: [], github: "#", link: "#", icon: "Rocket", colorScheme: "violet" },
      ],
    }));
    setOpen(draft.projects.length);
  };

  return (
    <div className="space-y-3">
      {draft.projects.map((p, i) => (
        <div key={i} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
          {/* Accordion header */}
          <button
            type="button"
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-medium text-foreground">{p.title || "Untitled Project"}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground capitalize">{p.colorScheme}</span>
              <span className="text-muted-foreground">{open === i ? "▲" : "▼"}</span>
            </div>
          </button>

          {open === i && (
            <div className="px-5 pb-5 space-y-4 border-t border-border/40">
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <Field label="Title" id={`p-title-${i}`}>
                  <Input
                    id={`p-title-${i}`}
                    value={p.title}
                    onChange={(e) => update(i, { title: e.target.value })}
                  />
                </Field>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-foreground">Color Scheme</Label>
                  <ColorPicker value={p.colorScheme} onChange={(v) => update(i, { colorScheme: v })} />
                </div>
              </div>

              <Field label="Description" id={`p-desc-${i}`}>
                <Textarea
                  id={`p-desc-${i}`}
                  rows={3}
                  value={p.description}
                  onChange={(e) => update(i, { description: e.target.value })}
                  className="resize-none"
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Icon" id={`p-icon-${i}`}>
                  <IconSelect
                    id={`p-icon-${i}`}
                    value={p.icon}
                    onChange={(v) => update(i, { icon: v })}
                    registry={PROJECT_ICONS}
                  />
                </Field>
                <Field label="Tech Stack" id={`p-stack-${i}`} hint="Comma-separated values">
                  <Input
                    id={`p-stack-${i}`}
                    value={p.stack.join(", ")}
                    onChange={(e) =>
                      update(i, { stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
                    }
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="GitHub URL" id={`p-github-${i}`}>
                  <Input
                    id={`p-github-${i}`}
                    type="url"
                    value={p.github}
                    onChange={(e) => update(i, { github: e.target.value })}
                  />
                </Field>
                <Field label="Live Link" id={`p-link-${i}`}>
                  <Input
                    id={`p-link-${i}`}
                    type="url"
                    value={p.link}
                    onChange={(e) => update(i, { link: e.target.value })}
                  />
                </Field>
              </div>

              <div className="pt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive gap-2"
                  onClick={() => remove(i)}
                  disabled={draft.projects.length <= 1}
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove Project
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}

      <Button variant="outline" size="sm" className="gap-2" onClick={add}>
        <Plus className="w-3.5 h-3.5" /> Add Project
      </Button>
    </div>
  );
}

// ─── Skills section ───────────────────────────────────────────────────────────
function SkillsSection({
  draft,
  setDraft,
}: {
  draft: PortfolioContent;
  setDraft: React.Dispatch<React.SetStateAction<PortfolioContent>>;
}) {
  const [open, setOpen] = useState<number | null>(0);

  const update = (i: number, patch: Partial<SkillGroup>) =>
    setDraft((d) => {
      const skills = [...d.skills];
      skills[i] = { ...skills[i], ...patch };
      return { ...d, skills };
    });

  const remove = (i: number) =>
    setDraft((d) => ({ ...d, skills: d.skills.filter((_, idx) => idx !== i) }));

  const add = () => {
    setDraft((d) => ({
      ...d,
      skills: [
        ...d.skills,
        { category: "New Category", icon: "Code", items: [], colorScheme: "cyan" },
      ],
    }));
    setOpen(draft.skills.length);
  };

  return (
    <div className="space-y-3">
      {draft.skills.map((sg, i) => (
        <div key={i} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
          <button
            type="button"
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-medium text-foreground">{sg.category || "Untitled Category"}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{sg.items.length} items</span>
              <span className="text-muted-foreground">{open === i ? "▲" : "▼"}</span>
            </div>
          </button>

          {open === i && (
            <div className="px-5 pb-5 space-y-4 border-t border-border/40">
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <Field label="Category Name" id={`sg-cat-${i}`}>
                  <Input
                    id={`sg-cat-${i}`}
                    value={sg.category}
                    onChange={(e) => update(i, { category: e.target.value })}
                  />
                </Field>
                <Field label="Icon" id={`sg-icon-${i}`}>
                  <IconSelect
                    id={`sg-icon-${i}`}
                    value={sg.icon}
                    onChange={(v) => update(i, { icon: v })}
                    registry={SKILL_ICONS}
                  />
                </Field>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-foreground">Color Scheme</Label>
                <ColorPicker value={sg.colorScheme} onChange={(v) => update(i, { colorScheme: v })} />
              </div>

              <Field label="Skills" id={`sg-items-${i}`} hint="Comma-separated list of skills">
                <Textarea
                  id={`sg-items-${i}`}
                  rows={3}
                  value={sg.items.join(", ")}
                  onChange={(e) =>
                    update(i, { items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
                  }
                  className="resize-none font-mono text-sm"
                />
              </Field>

              <div className="pt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive gap-2"
                  onClick={() => remove(i)}
                  disabled={draft.skills.length <= 1}
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove Category
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}

      <Button variant="outline" size="sm" className="gap-2" onClick={add}>
        <Plus className="w-3.5 h-3.5" /> Add Category
      </Button>
    </div>
  );
}

// ─── Admin page ───────────────────────────────────────────────────────────────
export default function AdminPage() {
  const { content, updateContent, resetContent } = useContent();
  const { logout } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Local draft — holds unsaved edits
  const [draft, setDraft] = useState<PortfolioContent>(() => structuredClone(content));

  const handleSave = () => {
    updateContent(draft);
    toast({ title: "Saved!", description: "Portfolio content has been updated." });
  };

  const handleReset = () => {
    if (!window.confirm("Reset all content to defaults? This cannot be undone.")) return;
    resetContent();
    setDraft(structuredClone(defaultContent));
    toast({ title: "Reset complete", description: "All content restored to defaults." });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-5xl">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2 text-muted-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
            <div className="h-5 w-px bg-border hidden sm:block" />
            <span className="hidden sm:block text-sm font-semibold text-foreground">Portfolio CMS</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset} className="gap-2 text-muted-foreground">
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset to Defaults</span>
            </Button>
            <Button size="sm" onClick={handleSave} className="gap-2">
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-muted-foreground hover:text-destructive" title="Sign out">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-10 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Content Manager</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Edit your portfolio content here. Changes are saved to your browser and take effect immediately.
          </p>
        </div>

        <Tabs defaultValue="identity">
          <TabsList className="mb-8 grid w-full grid-cols-5">
            <TabsTrigger value="identity">Identity</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="socials">Socials</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="identity">
            <SectionTitle
              title="Identity"
              desc="Your name, title, contact details, and availability status."
            />
            <IdentitySection draft={draft} setDraft={setDraft} />
          </TabsContent>

          <TabsContent value="about">
            <SectionTitle
              title="About"
              desc="Your bio paragraphs and the four highlight cards shown in the About section."
            />
            <AboutSection draft={draft} setDraft={setDraft} />
          </TabsContent>

          <TabsContent value="socials">
            <SectionTitle
              title="Social Links"
              desc="URLs for your GitHub, LinkedIn, and Twitter profiles."
            />
            <SocialsSection draft={draft} setDraft={setDraft} />
          </TabsContent>

          <TabsContent value="projects">
            <SectionTitle
              title="Projects"
              desc="Your featured work. Each project appears as a card in the Projects section."
            />
            <ProjectsSection draft={draft} setDraft={setDraft} />
          </TabsContent>

          <TabsContent value="skills">
            <SectionTitle
              title="Skills"
              desc="Your technical skills organized into categories."
            />
            <SkillsSection draft={draft} setDraft={setDraft} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Sticky bottom save bar */}
      <div className="sticky bottom-0 border-t border-border/50 bg-background/95 backdrop-blur-xl py-3">
        <div className="container mx-auto px-6 max-w-5xl flex justify-end">
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
