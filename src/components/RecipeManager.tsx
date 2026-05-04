"use client";

import React, { useState } from "react";
import { recipes as initialRecipes } from "@/data/data";
import { calculateIngredientCost } from "@/utils/costCalculator";

// Dùng cloneDeep đơn giản để không sửa trực tiếp vào data.ts gốc (ngay lập tức trên UI)
const cloneDeep = <T,>(obj: T): T => JSON.parse(JSON.stringify(obj));

type SizeType = 'sizeM' | 'sizeS';

export default function RecipeManager() {
  const [localRecipes, setLocalRecipes] = useState(cloneDeep(initialRecipes));
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeSize, setActiveSize] = useState<Record<number, SizeType>>({});
  const [savingIngId, setSavingIngId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const toggleExpand = (recipeId: number) => {
    if (expandedId === recipeId) {
      setExpandedId(null);
    } else {
      setExpandedId(recipeId);
      if (!activeSize[recipeId]) {
        const r = localRecipes.find(rec => rec.recipe_id === recipeId);
        if (r) {
          setActiveSize(prev => ({
            ...prev,
            [recipeId]: r.sizeM ? 'sizeM' : 'sizeS'
          }));
        }
      }
    }
  };

  const handleQuantityChange = (recipeId: number, size: SizeType, ingredientId: number, newQuantity: number) => {
    setLocalRecipes(prevRecipes => 
      prevRecipes.map(r => {
        if (r.recipe_id === recipeId && r[size]) {
          return {
            ...r,
            [size]: {
              ...r[size],
              ingredients: r[size].ingredients.map((ing: any) => 
                ing.ingredient_id === ingredientId 
                  ? { ...ing, quantity: newQuantity >= 0 ? newQuantity : 0 }
                  : ing
              )
            }
          };
        }
        return r;
      })
    );
  };

  const handleSave = async (recipeId: number, size: SizeType, ingredientId: number, newQuantity: number, ingName: string) => {
    setSavingIngId(`${recipeId}-${size}-${ingredientId}`);
    setMessage(null);

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId, size, ingredientId, newQuantity }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: `Đã lưu định lượng mới cho "${ingName}" (${size === 'sizeM' ? 'Size M' : 'Size S'})!`, type: "success" });
      } else {
        setMessage({ text: data.error || 'Lỗi khi lưu.', type: "error" });
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Lỗi mạng.', type: "error" });
    } finally {
      setSavingIngId(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 font-sans relative">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Quản Lý Công Thức & Giá Vốn</h1>
        <p className="text-gray-500">
          Nhấn vào từng công thức để xem chi tiết và thay đổi định lượng nguyên liệu. Bạn có thể <strong>Lưu</strong> lại định lượng mới để cập nhật vĩnh viễn vào hệ thống.
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
        {/* Table Header */}
        <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
          <div className="col-span-1 text-center">ID</div>
          <div className="col-span-6">Tên Công Thức</div>
          <div className="col-span-4 text-right">Tổng Giá Vốn</div>
          <div className="col-span-1"></div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {localRecipes.map((r: any) => {
            // Tính tổng giá vốn cho công thức
            const calcCost = (sizeBlock: any) => {
              if (!sizeBlock) return null;
              return sizeBlock.ingredients.reduce((sum: number, ing: any) => {
                return sum + calculateIngredientCost(ing.ingredient_id, ing.quantity, ing.unit);
              }, 0);
            };

            const totalCostM = calcCost(r.sizeM);
            const totalCostS = calcCost(r.sizeS);

            const isExpanded = expandedId === r.recipe_id;
            const currentSize = activeSize[r.recipe_id] || (r.sizeM ? 'sizeM' : 'sizeS');
            const currentSizeBlock = r[currentSize];

            return (
              <div key={r.recipe_id} className="transition-colors hover:bg-gray-50/50">
                {/* Master Row */}
                <div 
                  className={`grid grid-cols-12 items-center px-6 py-4 cursor-pointer transition-colors ${isExpanded ? 'bg-indigo-50/30' : ''}`}
                  onClick={() => toggleExpand(r.recipe_id)}
                >
                  <div className="col-span-1 text-center font-medium text-gray-500">#{r.recipe_id}</div>
                  <div className="col-span-6 font-semibold text-gray-900 text-lg">{r.recipe_name}</div>
                  <div className="col-span-4 text-right font-bold flex flex-col items-end justify-center">
                    {totalCostM !== null && (
                      <div className="text-indigo-600 text-base leading-tight">
                        <span className="text-xs text-gray-400 font-normal mr-1">Size M:</span>
                        {Math.round(totalCostM).toLocaleString('vi-VN')} đ
                      </div>
                    )}
                    {totalCostS !== null && (
                      <div className="text-indigo-500 text-sm leading-tight mt-1">
                        <span className="text-xs text-gray-400 font-normal mr-1">Size S:</span>
                        {Math.round(totalCostS).toLocaleString('vi-VN')} đ
                      </div>
                    )}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="bg-gray-50 px-6 py-6 border-t border-gray-100 shadow-inner">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b border-indigo-100 pb-4 gap-4">
                      <h4 className="text-sm font-semibold text-indigo-700 uppercase tracking-wider">
                        Chi tiết định lượng
                      </h4>
                      
                      {/* Size Selector */}
                      <div className="flex bg-gray-200 p-1 rounded-lg">
                        {r.sizeM && (
                          <button
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${currentSize === 'sizeM' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveSize(prev => ({ ...prev, [r.recipe_id]: 'sizeM' }));
                            }}
                          >
                            Size M (500ml)
                          </button>
                        )}
                        {r.sizeS && (
                          <button
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${currentSize === 'sizeS' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveSize(prev => ({ ...prev, [r.recipe_id]: 'sizeS' }));
                            }}
                          >
                            Size S (360ml)
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {currentSizeBlock ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-sm overflow-hidden">
                          <thead className="text-xs text-gray-500 uppercase bg-gray-100">
                            <tr>
                              <th className="px-4 py-3">Tên Nguyên Liệu</th>
                              <th className="px-4 py-3 w-48 text-center">Định lượng (Sửa được)</th>
                              <th className="px-4 py-3 w-24">Đơn vị</th>
                              <th className="px-4 py-3 text-right w-32">Thành tiền</th>
                              <th className="px-4 py-3 w-28 text-center">Hành động</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {currentSizeBlock.ingredients.map((ing: any) => {
                              const cost = calculateIngredientCost(ing.ingredient_id, ing.quantity, ing.unit);
                              
                              const origR = initialRecipes.find((orig: any) => orig.recipe_id === r.recipe_id);
                              const origSizeBlock = origR?.[currentSize] as any;
                              const origIng = origSizeBlock?.ingredients?.find((i: any) => i.ingredient_id === ing.ingredient_id);
                              
                              const isOriginal = origIng?.quantity === ing.quantity;
                              const isSaving = savingIngId === `${r.recipe_id}-${currentSize}-${ing.ingredient_id}`;

                              return (
                                <tr key={ing.ingredient_id} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-4 py-3 font-medium text-gray-800">
                                    {ing.ingredient_name}
                                  </td>
                                  <td className="px-4 py-3 text-center">
                                    <input 
                                      type="number"
                                      className="w-24 text-center border border-gray-300 rounded-md py-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                                      value={ing.quantity}
                                      min="0"
                                      step="0.5"
                                      onChange={(e) => handleQuantityChange(r.recipe_id, currentSize, ing.ingredient_id, parseFloat(e.target.value) || 0)}
                                    />
                                  </td>
                                  <td className="px-4 py-3 text-gray-500">
                                    {ing.unit}
                                  </td>
                                  <td className="px-4 py-3 text-right font-medium text-gray-900">
                                    {Math.round(cost).toLocaleString('vi-VN')} đ
                                  </td>
                                  <td className="px-4 py-3 text-center">
                                    <button
                                      onClick={() => handleSave(r.recipe_id, currentSize, ing.ingredient_id, ing.quantity, ing.ingredient_name)}
                                      disabled={isOriginal || isSaving}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shadow-sm flex items-center justify-center gap-1 w-full ${
                                        isOriginal 
                                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-transparent' 
                                          : 'bg-indigo-600 text-white hover:bg-indigo-700 active:transform active:scale-95'
                                      }`}
                                    >
                                      {isSaving ? "Đang lưu..." : isOriginal ? "Lưu" : "Lưu Lại"}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                            
                            {/* Others (No Cost) */}
                            {currentSizeBlock.others && currentSizeBlock.others.length > 0 && (
                              <>
                                <tr>
                                  <td colSpan={5} className="px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-500 italic">
                                    Thành phần phụ (Không tính cost)
                                  </td>
                                </tr>
                                {currentSizeBlock.others.map((other: any, idx: number) => (
                                  <tr key={`other-${idx}`} className="bg-gray-50/50">
                                    <td className="px-4 py-2 text-gray-500">{other.name}</td>
                                    <td className="px-4 py-2 text-center text-gray-500">{other.quantity}</td>
                                    <td className="px-4 py-2 text-gray-500">{other.unit}</td>
                                    <td className="px-4 py-2 text-right text-gray-400">-</td>
                                    <td className="px-4 py-2"></td>
                                  </tr>
                                ))}
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        Không có dữ liệu cho size này.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
