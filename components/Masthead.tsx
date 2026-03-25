export default function Masthead() {
  return (
    <header className="w-full divider-editorial">
      {/* Top rubric */}
      <div className="flex justify-between items-center w-full uppercase text-[10px] sm:text-xs font-bold tracking-widest border-b border-ink pb-2 mb-3 mt-1 font-playfair text-ink-muted">
        <span>Edição Especial</span>
        <span>Preço: Amor</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-7xl text-center my-4 leading-[0.9] tracking-widest font-cloister text-ink">
        Save the<br />Date
      </h1>

      {/* Bottom rubric */}
      <div className="font-bold flex justify-between items-center w-full uppercase text-[10px] sm:text-xs tracking-widest border-t border-ink pt-2 mt-3 mb-1 font-playfair text-ink-muted">
        <span>Lagoa Santa, MG</span>
        <span>Sábado, 21 Nov 2026 às 11 horas</span>
      </div>
    </header>
  );
}
