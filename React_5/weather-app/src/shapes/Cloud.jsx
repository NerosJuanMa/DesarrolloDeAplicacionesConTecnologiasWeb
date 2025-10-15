export default function Cloud() {
  return (
    <div className="relative w-50 h-24">
      {/* Parte central grande */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-white shadow-lg"></div>

      {/* Parte izquierda */}
      <div className="absolute bottom-0 left-4 w-20 h-20 rounded-full bg-white shadow-lg"></div>

      {/* Parte derecha */}
      <div className="absolute bottom-0 right-4 w-20 h-20 rounded-full bg-white shadow-lg"></div>
    </div>
  );
}
