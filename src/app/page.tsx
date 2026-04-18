"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RecipeManager from "@/components/RecipeManager";
import IngredientManager from "@/components/IngredientManager";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"recipe" | "ingredient">("recipe");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <main className="min-h-screen py-8 relative">
      {/* Header Area with Logout Button */}
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 mb-4 flex justify-end">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          {isLoggingOut ? (
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          )}
          Đăng xuất
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 mb-6 flex justify-center gap-4">
        <button
          onClick={() => setActiveTab("recipe")}
          className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${
            activeTab === "recipe"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 transform scale-[1.02]"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          Quản Lý Công Thức
        </button>
        
        <button
          onClick={() => setActiveTab("ingredient")}
          className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 ${
            activeTab === "ingredient"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 transform scale-[1.02]"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
          Quản Lý Nguyên Liệu
        </button>
      </div>

      {/* Render Active Component */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === "recipe" ? <RecipeManager /> : <IngredientManager />}
      </div>
    </main>
  );
}
