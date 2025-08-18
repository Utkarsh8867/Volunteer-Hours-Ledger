
// components/DashboardLayout.jsx
import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background glowing circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500 rounded-full opacity-30 blur-3xl animate-pulse"></div>

      {/* Page Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}
