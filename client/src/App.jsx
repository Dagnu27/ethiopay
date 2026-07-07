// client/src/App.jsx
import './index.css'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full shadow-lg">
        <h1 className="text-2xl font-bold text-[#6128ff] mb-2">
          ✅ EthioPay
        </h1>
        <p className="text-gray-600 mb-6">
          TailwindCSS is working!
        </p>
        <button className="btn-primary w-full">
          Get Started
        </button>
        <div className="mt-4 flex gap-2">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            Ready
          </span>
        </div>
      </div>
    </div>
  )
}

export default App