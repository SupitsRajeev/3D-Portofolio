export function GridBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden dark:hidden"
      aria-hidden="true"
    >
      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "24px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 65% at 50% 0%, #000 55%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 80% 65% at 50% 0%, #000 55%, transparent 100%)",
        }}
      />
      {/* Soft blobs for depth */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-primary/8 blur-[120px]" />
      <div className="absolute top-1/2 -right-32 w-[380px] h-[380px] rounded-full bg-accent/8 blur-[130px]" />
    </div>
  );
}
