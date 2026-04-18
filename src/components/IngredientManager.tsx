"use client";

import React, { useState } from "react";
import { ingredient as initialIngredients } from "@/data/data";

// Clone data để tránh mutate trực tiếp
const cloneDeep = <T,>(obj: T): T => JSON.parse(JSON.stringify(obj));

export default function IngredientManager() {
  const [ingredients, setIngredients] = useState(cloneDeep(initialIngredients));
  const [savingId, setSavingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handlePriceChange = (id: number, newPrice: number) => {
    setIngredients(prev => 
      prev.map(ing => ing.id === id ? { ...ing, unit_price: newPrice >= 0 ? newPrice : 0 } : ing)
    );
  };

  const handleSave = async (id: number) => {
    const ing = ingredients.find(i => i.id === id);
    if (!ing) return;

    setSavingId(id);
    setMessage(null);

    try {
      const response = await fetch('/api/ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: ing.id, newPrice: ing.unit_price }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: `Đã cập nhật giá cho "${ing.ingredient_name}" thành công!`, type: "success" });
      } else {
        setMessage({ text: data.error || 'Lỗi khi lưu dữ liệu.', type: "error" });
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Lỗi kết nối mạng.', type: "error" });
    } finally {
      setSavingId(null);
      
      // Ẩn thông báo sau 3 giây
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 font-sans relative">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Quản Lý Nguyên Liệu</h1>
        <p className="text-gray-500">
          Cập nhật giá mua vào (unit_price) của các nguyên liệu. Thay đổi tại đây sẽ được <strong>lưu vĩnh viễn</strong> vào file hệ thống (data.ts) và tự động áp dụng cho tính toán Cost của Công Thức.
        </p>
      </div>

      {/* Thông báo Alert */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg border transition-all ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
          <div className="flex items-center gap-2">
            {message.type === 'success' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-center w-16">ID</th>
                <th className="px-6 py-4 w-64">Tên Nguyên Liệu</th>
                <th className="px-6 py-4 w-64">Sản Phẩm (Product Name)</th>
                <th className="px-6 py-4 w-24 text-center">Đơn vị</th>
                <th className="px-6 py-4 w-48 text-right">Giá Tiền (VND)</th>
                <th className="px-6 py-4 w-32 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ingredients.map(ing => {
                const isOriginal = ing.unit_price === initialIngredients.find(i => i.id === ing.id)?.unit_price;
                const isSaving = savingId === ing.id;

                return (
                  <tr key={ing.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-center font-medium text-gray-500">#{ing.id}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{ing.ingredient_name}</td>
                    <td className="px-6 py-4 text-gray-500">{ing.product_name}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                        {ing.unit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative flex items-center justify-end">
                        <input
                          type="number"
                          className="w-full max-w-[140px] text-right font-bold text-indigo-700 bg-white border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                          value={ing.unit_price || ""}
                          min="0"
                          step="1000"
                          onChange={(e) => handlePriceChange(ing.id, parseInt(e.target.value) || 0)}
                        />
                        <span className="absolute right-3 text-gray-400 pointer-events-none text-xs">đ</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleSave(ing.id)}
                        disabled={isOriginal || isSaving}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-1.5 w-full ${
                          isOriginal 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-transparent' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 active:transform active:scale-95'
                        }`}
                      >
                        {isSaving ? (
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : isOriginal ? (
                          <>Lưu</>
                        ) : (
                          <>Lưu Lại</>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
