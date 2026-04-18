import { ingredient } from "@/data/data";

export const getIngredientById = (id: number) => {
  return ingredient.find(ing => ing.id === id);
}

/**
 * Tính giá cost cho một nguyên liệu trong công thức
 * @param ingredientId ID của nguyên liệu trong kho
 * @param recipeQuantity Số lượng sử dụng trong công thức
 * @param recipeUnit Đơn vị đo trong công thức (ml, g, phần, môi, bộ)
 */
export const calculateIngredientCost = (ingredientId: number, recipeQuantity: number, recipeUnit: string): number => {
  const ing = getIngredientById(ingredientId);
  if (!ing) return 0;

  const basePrice = ing.unit_price;
  const baseUnit = ing.unit.toLowerCase();
  const targetUnit = recipeUnit.toLowerCase();

  // Đưa về giá của 1 đơn vị cơ bản (1g, 1ml, hoặc 1 bộ)
  let pricePerBaseUnit = basePrice;
  if (baseUnit === 'kg' || baseUnit === 'lít' || baseUnit === 'lit') {
    pricePerBaseUnit = basePrice / 1000; // Giá cho 1g hoặc 1ml
  } else if (baseUnit === 'bộ') {
    pricePerBaseUnit = basePrice; // Giá cho 1 bộ
  }

  // Xử lý đặc biệt cho Cafe (id = 1) khi quy đổi từ hạt (g) sang nước cafe (ml)
  // Công thức: 18g hạt cafe = 50ml nước cafe
  if (ingredientId === 1 && targetUnit === 'ml') {
    // pricePerBaseUnit đang là giá của 1g hạt cafe
    // Chi phí cho 1ml nước cafe = (giá 18g hạt) / 50
    const pricePerMlCoffee = (pricePerBaseUnit * 18) / 50;
    return pricePerMlCoffee * recipeQuantity;
  }

  // Xử lý đặc biệt cho Bột kem muối (id = 9)
  // Công thức: 1 phần bột kem muối + 2 phần sữa tươi không đường
  // Sữa tươi không đường giá: 9000đ / 220ml
  if (ingredientId === 9) {
    const milkPricePerMl = 9000 / 220;
    // Tổng chi phí cho 1g bột kem muối (bao gồm cả giá của 2ml sữa tươi)
    const totalCostPerGramPowder = pricePerBaseUnit + (2 * milkPricePerMl);
    
    if (targetUnit === 'g' || targetUnit === 'ml') {
      return totalCostPerGramPowder * recipeQuantity;
    } else if (targetUnit === 'môi') {
      // 1 môi = 40g kem muối thành phẩm (gồm bột + sữa)
      // Tỷ lệ 1 bột : 2 sữa => bột chiếm 1/3 khối lượng
      // Số gam bột trong 1 môi = 40 / 3
      return totalCostPerGramPowder * (40 / 3) * recipeQuantity; 
    }
  }

  // Tính tiền dựa trên đơn vị của công thức cho các nguyên liệu khác
  if (targetUnit === 'g' || targetUnit === 'ml') {
    return pricePerBaseUnit * recipeQuantity;
  } else if (targetUnit === 'môi') {
    // Ước tính 1 môi = 10g
    return pricePerBaseUnit * 10 * recipeQuantity;
  } else if (targetUnit === 'phần') {
    // Ước tính 1 phần = 200g
    return pricePerBaseUnit * 200 * recipeQuantity;
  } else if (targetUnit === 'bộ') {
    return pricePerBaseUnit * recipeQuantity;
  }

  // Mặc định
  return pricePerBaseUnit * recipeQuantity;
}
