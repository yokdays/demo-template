import React from 'react'

export default function Navbar() {
  return (
    <nav className="w-full h-14 px-6 bg-white border-b shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded">
          D
        </div>
        <span className="text-lg font-semibold text-gray-800">
          Demo Dashboard
        </span>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-sm text-gray-600 hover:text-gray-900">
          Dashboard
        </button>
        <button className="text-sm text-gray-600 hover:text-gray-900">
          Recruit
        </button>
        <button className="text-sm text-gray-600 hover:text-gray-900">
          Progress
        </button>

        <div className="flex items-center gap-2 pl-4 border-l">
          <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-white bg-gray-400 rounded-full">
            NJ
          </div>
          <span className="text-sm text-gray-700">Nakin</span>
        </div>
      </div>
    </nav>
  )
}
