export default function Snow() {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* Fila 1 */}
      <div className="flex gap-6 translate-x-0">
        <Snowflake size="w-4 h-4" />
        <Snowflake size="w-3 h-3" />
        <Snowflake size="w-4 h-4" />
		
      </div>

      {/* Fila 2 (un poco más a la derecha) */}
      <div className="flex gap-6 translate-x-2">
        <Snowflake size="w-4 h-4" />
        <Snowflake size="w-5 h-5" />
        <Snowflake size="w-4 h-4" />
      </div>

      {/* Fila 3 (más inclinada aún a la derecha) */}
      <div className="flex gap-6 translate-x-4">
        <Snowflake size="w-5 h-5" />
        <Snowflake size="w-4 h-4" />
        <Snowflake size="w-5 h-5" />
      </div>
    </div>
  );
}

// Copo ❄️ minimalista
function Snowflake({ size }) {
  return (
    <div className={`relative ${size}`}>
      {/* Línea vertical */}
      <div className="absolute inset-0 w-0.5 h-full bg-white mx-auto"></div>
      {/* Línea horizontal */}
      <div className="absolute inset-0 h-0.5 w-full bg-white my-auto"></div>
      {/* Diagonal 1 */}
      <div className="absolute inset-0 w-0.5 h-full bg-white mx-auto transform rotate-45"></div>
      {/* Diagonal 2 */}
      <div className="absolute inset-0 w-0.5 h-full bg-white mx-auto transform -rotate-45"></div>
    </div>
  );
}
