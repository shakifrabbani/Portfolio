/** Layered page background: solid base, slow aurora glows, faint grid and film grain. Purely decorative. */
export function SiteBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute -left-[20%] -top-[30%] h-[85vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgb(108_99_255/0.16),transparent)] animate-aurora" />
      <div className="absolute -right-[15%] top-[10%] h-[80vh] w-[55vw] rounded-full bg-[radial-gradient(closest-side,rgb(79_140_255/0.10),transparent)] animate-aurora [animation-delay:-9s]" />
      <div className="fade-mask absolute inset-0 bg-grid opacity-60" />
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  );
}
