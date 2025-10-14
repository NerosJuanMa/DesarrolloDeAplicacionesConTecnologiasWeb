import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 
                    flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🎉 ¡Tailwind funciona!
        </h1>
        <p className="text-gray-600 text-lg">
          Tu proyecto está listo para crear interfaces increíbles
        </p>
        <button className="mt-6 bg-blue-500 hover:bg-blue-600 
                           text-white font-semibold py-3 px-6 
                           rounded-lg transition-colors duration-200
                           transform hover:scale-105">
          ¡Empezar a crear!
        </button>
      </div>
    </div>
  );
}

export default App;

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
