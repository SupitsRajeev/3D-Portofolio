import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { defaultContent, type PortfolioContent } from "@/content";

const STORAGE_KEY = "portfolio-cms-content";

function loadFromStorage(): PortfolioContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent;
    const parsed = JSON.parse(raw) as Partial<PortfolioContent>;
    // Deep-merge so new fields added to defaultContent are always present
    return {
      ...defaultContent,
      ...parsed,
      identity: { ...defaultContent.identity, ...(parsed.identity ?? {}) },
    };
  } catch {
    return defaultContent;
  }
}

interface ContentContextValue {
  content: PortfolioContent;
  updateContent: (updates: Partial<PortfolioContent>) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>(loadFromStorage);

  const updateContent = useCallback((updates: Partial<PortfolioContent>) => {
    setContent((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore quota / private-browsing errors
      }
      return next;
    });
  }, []);

  const resetContent = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setContent(defaultContent);
  }, []);

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
