interface CloudsSeparatorProps {
  fillColor?: string
  accentColor?: string
  flip?: boolean
}

export default function CloudsSeparator({
  fillColor = "#141428", // Color de la sección inferior
  accentColor = "rgba(139, 92, 246, 0.18)", // Brillo lila detrás de las nubes
  flip = false,
}: CloudsSeparatorProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden leading-none pointer-events-none z-20 ${
        flip ? "rotate-180" : ""
      }`}
    >
      <svg
        viewBox="0 0 1440 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-16 sm:h-24 md:h-32 block preserve-3d"
        preserveAspectRatio="none"
      >
        {/* Capa trasera de nubes difuminadas (brillo amatista/lila) */}
        <path
          d="M0 80C120 40 240 120 360 110C480 100 600 30 720 40C840 50 960 140 1080 130C1200 120 1320 60 1440 80V160H0V80Z"
          fill={accentColor}
        />
        {/* Capa intermedia de nubes con volumen */}
        <path
          d="M0 100C150 130 300 50 450 70C600 90 750 150 900 130C1050 110 1200 60 1350 90L1440 100V160H0V100Z"
          fill="rgba(168, 85, 247, 0.12)"
        />
        {/* Capa frontal sólida que se funde perfectamente con la sección siguiente */}
        <path
          d="M0 120C180 80 360 150 540 135C720 120 900 60 1080 95C1260 130 1350 110 1440 115V160H0V120Z"
          fill={fillColor}
        />
      </svg>
    </div>
  )
}
