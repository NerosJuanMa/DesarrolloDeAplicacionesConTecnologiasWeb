export default function Rain() {
  return (
    <div className="relative w-40 h-30 flex flex-col justify-center items-center">
      {/* Nube */}
      <div className="relative w-50 h-24">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-blue-100 shadow-lg"></div>
        <div className="absolute bottom-0 left-4 w-20 h-20 rounded-full bg-blue-100 shadow-lg"></div>
        <div className="absolute bottom-0 right-4 w-21 h-21 rounded-full bg-blue-100 shadow-lg"></div>
        {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-12 rounded-full bg-white shadow-lg"></div> */}
      </div>

      {/* Gotas */}
      <div className="flex gap-3 mt-2">
        <div className="w-1 h-5 bg-blue-100 rounded-full transform rotate-170"></div>
        <div className="w-1 h-5 bg-blue-100 rounded-full transform rotate-170"></div>
        <div className="w-1 h-5 bg-blue-100 rounded-full transform rotate-170"></div>
        <div className="w-1 h-5 bg-blue-100 rounded-full transform rotate-170"></div>
        <div className="w-1 h-5 bg-blue-100 rounded-full transform rotate-170"></div>
        <div className="w-1 h-5 bg-blue-100 rounded-full transform rotate-170"></div>
      </div>
    </div>
  );
}
