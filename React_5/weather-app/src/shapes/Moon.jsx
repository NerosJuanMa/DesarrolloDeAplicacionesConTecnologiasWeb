export default function Moon() {
  return (
    <div className="relative w-30 h-30">
      {/* Aura (halo) */}
      <div className="absolute w-30 h-30 rounded-full bg-yellow-200/40 blur-xl shadow-[0_0_30px_20px_rgba(255,255,255,0.8)]"></div>

      {/* Círculo amarillo (luna) con máscara */}
      <div
        className="relative w-30 h-30 rounded-full bg-yellow-200"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at 75% 35%, transparent 40%, black 41%)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "cover",
          maskImage:
            "radial-gradient(circle at 75% 35%, transparent 40%, black 41%)",
          maskRepeat: "no-repeat",
          maskSize: "cover",
        }}
      ></div>
    </div>
  );
}
