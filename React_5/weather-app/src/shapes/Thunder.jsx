// components/RainWithLightning.jsx
export default function RainWithLightning() {
  return (
    <div className="relative w-50 h-30 flex flex-col items-center">
      {/* Nube (misma idea, medidas ajustadas a clases Tailwind estándares) */}
      <div className="relative w-50 h-24 mb-2">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-blue-100 shadow-lg"></div>
        <div className="absolute bottom-0 left-3 w-20 h-20 rounded-full bg-blue-100 shadow-lg"></div>
        <div className="absolute bottom-0 right-3 w-20 h-20 rounded-full bg-blue-100 shadow-lg"></div>
      </div>

      {/* Rayos: tres SVGs con ligeras rotaciones y offsets */}
      <div className="-mt-6 flex gap-4 items-end">
        <LightningBolt className="w-5 h-10 text-yellow-300 -rotate-6 -translate-y-1 drop-shadow-sm" />
        <LightningBolt className="w-5 h-12 text-yellow-300 rotate-6 -translate-y-2 drop-shadow-sm" />
        {/* <LightningBolt className="w-5 h-10 text-yellow-300 -rotate-3 -translate-y-1 drop-shadow-sm" /> */}
      </div>
    </div>
  );
}

/* LightningBolt: SVG simple, relleno con currentColor para poder controlarlo con clases Tailwind (text-yellow-300, etc.) */
function LightningBolt() {
  return (
<div className="relative w-10 h-16">
      {/* Triángulo izquierdo */}
      <div
        className="absolute w-4 h-10 top-8 left-3 bg-yellow-300"
        style={{
          clipPath: "polygon(0 0, 100% 0, 0 100%)", // triángulo con punta abajo
        }}
      ></div>
      {/* Triángulo derecho */}
      <div
        className="absolute w-4 h-10 bg-yellow-300"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)", // triángulo con punta arriba
        }}
      ></div>
    </div>
  );
}
