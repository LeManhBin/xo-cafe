export const ingredient = [
  {
    "id": 1,
    "ingredient_name": "Cafe Robusta S18",
    "product_name": "Cafe Robusta S18",
    "unit": "kg",
    "unit_price": 200000,
  },
  {
    "id": 2,
    "ingredient_name": "Matcha",
    "product_name": "Matcha Cozy",
    "unit": "kg",
    "unit_price": 815000,
  },
  {
    "id": 3,
    "ingredient_name": "Cacao",
    "product_name": "Bột Ca Cao Dans Favorich",
    "unit": "kg",
    "unit_price": 294000,
  },
  {
    "id": 4,
    "ingredient_name": "Sữa đặc",
    "product_name": "Sữa Đặc Ngôi Sao Phương Nam Xanh Lá",
    "unit": "kg",
    "unit_price": 66000,
  },
  {
    "id": 5,
    "ingredient_name": "Sữa Oatside",
    "product_name": "Sữa Oatside",
    "unit": "lít",
    "unit_price": 50000,
  },
  {
    "id": 6,
    "ingredient_name": "Sữa tươi",
    "product_name": "Sữa Tươi Nguyên Chất Tiệt Trùng MLEKOVITA 3,5% Béo Ba Lan",
    "unit": "lít",
    "unit_price": 30000,
  },
  {
    "id": 7,
    "ingredient_name": "Syrup đường",
    "product_name": "Syrup đường",
    "unit": "lit",
    "unit_price": 44000,
  },
  {
    "id": 8,
    "ingredient_name": "Bột cốt dừa",
    "product_name": "Bột cốt dừa",
    "unit": "kg",
    "unit_price": 274000,
  },
  {
    "id": 9,
    "ingredient_name": "Bột kem muối",
    "product_name": "Bột kem muối",
    "unit": "kg",
    "unit_price": 194000,
  },
  {
    "id": 10,
    "ingredient_name": "Đá viên",
    "product_name": "Đá viên (bao 20kg)",
    "unit": "kg",
    "unit_price": 1000,
  },
  {
    "id": 11,
    "ingredient_name": "Bộ Ly + Ống hút + Thìa",
    "product_name": "Bộ Ly + Ống hút + Thìa",
    "unit": "bộ",
    "unit_price": 1500,
  },
  {
    "id": 12,
    "ingredient_name": "Túi nilon",
    "product_name": "Túi nilon (túi đơn/chữ T)",
    "unit": "kg",
    "unit_price": 60000,
  }
]

export const recipes = [
  {
    "recipe_id": 101,
    "recipe_name": "Matcha Latte Oatside",
    "sizeM": {
      "ingredients": [
        { "ingredient_id": 2, "ingredient_name": "Matcha", "quantity": 4, "unit": "g" },
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 30, "unit": "ml" },
        { "ingredient_id": 5, "ingredient_name": "Sữa Oatside", "quantity": 100, "unit": "ml" },
        { "ingredient_id": 7, "ingredient_name": "Syrup đường", "quantity": 10, "unit": "ml" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ],
      "others": [{ "name": "Nước", "quantity": 50, "unit": "ml" }]
    },
    "sizeS": {
      "ingredients": [
        { "ingredient_id": 2, "ingredient_name": "Matcha", "quantity": 3, "unit": "g" },
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 20, "unit": "ml" },
        { "ingredient_id": 5, "ingredient_name": "Sữa Oatside", "quantity": 70, "unit": "ml" },
        { "ingredient_id": 7, "ingredient_name": "Syrup đường", "quantity": 5, "unit": "ml" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ],
      "others": [{ "name": "Nước", "quantity": 40, "unit": "ml" }]
    }
  },
  {
    "recipe_id": 102,
    "recipe_name": "Matcha Latte",
    "sizeM": {
      "ingredients": [
        { "ingredient_id": 2, "ingredient_name": "Matcha", "quantity": 4, "unit": "g" },
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 30, "unit": "ml" },
        { "ingredient_id": 6, "ingredient_name": "Sữa tươi", "quantity": 100, "unit": "ml" },
        { "ingredient_id": 7, "ingredient_name": "Syrup đường", "quantity": 10, "unit": "ml" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ],
      "others": [{ "name": "Nước", "quantity": 50, "unit": "ml" }]
    },
    "sizeS": {
      "ingredients": [
        { "ingredient_id": 2, "ingredient_name": "Matcha", "quantity": 3, "unit": "g" },
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 20, "unit": "ml" },
        { "ingredient_id": 6, "ingredient_name": "Sữa tươi", "quantity": 70, "unit": "ml" },
        { "ingredient_id": 7, "ingredient_name": "Syrup đường", "quantity": 5, "unit": "ml" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ],
      "others": [{ "name": "Nước", "quantity": 40, "unit": "ml" }]
    }
  },
  {
    "recipe_id": 103,
    "recipe_name": "Matcha Latte Kem Muối",
    "sizeM": {
      "ingredients": [
        { "ingredient_id": 2, "ingredient_name": "Matcha", "quantity": 4, "unit": "g" },
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 30, "unit": "ml" },
        { "ingredient_id": 6, "ingredient_name": "Sữa tươi", "quantity": 100, "unit": "ml" },
        { "ingredient_id": 7, "ingredient_name": "Syrup đường", "quantity": 10, "unit": "ml" },
        { "ingredient_id": 9, "ingredient_name": "Bột kem muối", "quantity": 1, "unit": "môi" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ],
      "others": [{ "name": "Nước", "quantity": 50, "unit": "ml" }]
    },
    "sizeS": {
      "ingredients": [
        { "ingredient_id": 2, "ingredient_name": "Matcha", "quantity": 3, "unit": "g" },
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 20, "unit": "ml" },
        { "ingredient_id": 6, "ingredient_name": "Sữa tươi", "quantity": 70, "unit": "ml" },
        { "ingredient_id": 7, "ingredient_name": "Syrup đường", "quantity": 5, "unit": "ml" },
        { "ingredient_id": 9, "ingredient_name": "Bột kem muối", "quantity": 0.8, "unit": "môi" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ],
      "others": [{ "name": "Nước", "quantity": 40, "unit": "ml" }]
    }
  },
  {
    "recipe_id": 104,
    "recipe_name": "Cafe đen",
    "sizeS": {
      "ingredients": [
        { "ingredient_id": 1, "ingredient_name": "Cafe Robusta S18", "quantity": 50, "unit": "ml" },
        { "ingredient_id": 7, "ingredient_name": "Syrup đường", "quantity": 10, "unit": "ml" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ]
    }
  },
  {
    "recipe_id": 105,
    "recipe_name": "Cafe Muối",
    "sizeM": {
      "ingredients": [
        { "ingredient_id": 1, "ingredient_name": "Cafe Robusta S18", "quantity": 40, "unit": "ml" },
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 25, "unit": "ml" },
        { "ingredient_id": 6, "ingredient_name": "Sữa tươi", "quantity": 20, "unit": "ml" },
        { "ingredient_id": 9, "ingredient_name": "Bột kem muối", "quantity": 1, "unit": "môi" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ]
    },
    "sizeS": {
      "ingredients": [
        { "ingredient_id": 1, "ingredient_name": "Cafe Robusta S18", "quantity": 35, "unit": "ml" },
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 20, "unit": "ml" },
        { "ingredient_id": 6, "ingredient_name": "Sữa tươi", "quantity": 15, "unit": "ml" },
        { "ingredient_id": 9, "ingredient_name": "Bột kem muối", "quantity": 0.8, "unit": "môi" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ]
    }
  },
  {
    "recipe_id": 106,
    "recipe_name": "Bạc xỉu",
    "sizeM": {
      "ingredients": [
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 25, "unit": "ml" },
        { "ingredient_id": 6, "ingredient_name": "Sữa tươi", "quantity": 40, "unit": "ml" },
        { "ingredient_id": 1, "ingredient_name": "Cafe Robusta S18", "quantity": 45, "unit": "ml" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ]
    },
    "sizeS": {
      "ingredients": [
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 20, "unit": "ml" },
        { "ingredient_id": 6, "ingredient_name": "Sữa tươi", "quantity": 30, "unit": "ml" },
        { "ingredient_id": 1, "ingredient_name": "Cafe Robusta S18", "quantity": 35, "unit": "ml" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ]
    }
  },
  {
    "recipe_id": 107,
    "recipe_name": "Cafe Sữa đá",
    "sizeM": {
      "ingredients": [
        { "ingredient_id": 1, "ingredient_name": "Cafe Robusta S18", "quantity": 55, "unit": "ml" },
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 25, "unit": "ml" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ]
    },
    "sizeS": {
      "ingredients": [
        { "ingredient_id": 1, "ingredient_name": "Cafe Robusta S18", "quantity": 45, "unit": "ml" },
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 20, "unit": "ml" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ]
    }
  },
  {
    "recipe_id": 108,
    "recipe_name": "Sữa tươi caffe",
    "sizeM": {
      "ingredients": [
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 25, "unit": "ml" },
        { "ingredient_id": 6, "ingredient_name": "Sữa tươi", "quantity": 50, "unit": "ml" },
        { "ingredient_id": 1, "ingredient_name": "Cafe Robusta S18", "quantity": 30, "unit": "ml" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ]
    },
    "sizeS": {
      "ingredients": [
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 20, "unit": "ml" },
        { "ingredient_id": 6, "ingredient_name": "Sữa tươi", "quantity": 40, "unit": "ml" },
        { "ingredient_id": 1, "ingredient_name": "Cafe Robusta S18", "quantity": 25, "unit": "ml" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ]
    }
  },
  {
    "recipe_id": 109,
    "recipe_name": "Cacao Latte Oatside",
    "sizeM": {
      "ingredients": [
        { "ingredient_id": 3, "ingredient_name": "Cacao", "quantity": 12, "unit": "g" },
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 30, "unit": "ml" },
        { "ingredient_id": 5, "ingredient_name": "Sữa Oatside", "quantity": 120, "unit": "ml" },
        { "ingredient_id": 7, "ingredient_name": "Syrup đường", "quantity": 10, "unit": "ml" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ],
      "others": [{ "name": "Nước nóng", "quantity": 40, "unit": "ml" }]
    },
    "sizeS": {
      "ingredients": [
        { "ingredient_id": 3, "ingredient_name": "Cacao", "quantity": 9, "unit": "g" },
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 20, "unit": "ml" },
        { "ingredient_id": 5, "ingredient_name": "Sữa Oatside", "quantity": 80, "unit": "ml" },
        { "ingredient_id": 7, "ingredient_name": "Syrup đường", "quantity": 5, "unit": "ml" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ],
      "others": [{ "name": "Nước nóng", "quantity": 30, "unit": "ml" }]
    }
  },
  {
    "recipe_id": 110,
    "recipe_name": "Cacao Sữa Lạnh",
    "sizeM": {
      "ingredients": [
        { "ingredient_id": 3, "ingredient_name": "Cacao", "quantity": 12, "unit": "g" },
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 35, "unit": "ml" },
        { "ingredient_id": 6, "ingredient_name": "Sữa tươi", "quantity": 150, "unit": "ml" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ],
      "others": [{ "name": "Nước nóng", "quantity": 40, "unit": "ml" }]
    },
    "sizeS": {
      "ingredients": [
        { "ingredient_id": 3, "ingredient_name": "Cacao", "quantity": 9, "unit": "g" },
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 25, "unit": "ml" },
        { "ingredient_id": 6, "ingredient_name": "Sữa tươi", "quantity": 100, "unit": "ml" },
        { "ingredient_id": 10, "ingredient_name": "Đá viên", "quantity": 1, "unit": "phần" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ],
      "others": [{ "name": "Nước nóng", "quantity": 30, "unit": "ml" }]
    }
  },
  {
    "recipe_id": 111,
    "recipe_name": "Cacao Sữa Nóng",
    "sizeS": {
      "ingredients": [
        { "ingredient_id": 3, "ingredient_name": "Cacao", "quantity": 9, "unit": "g" },
        { "ingredient_id": 4, "ingredient_name": "Sữa đặc", "quantity": 25, "unit": "ml" },
        { "ingredient_id": 6, "ingredient_name": "Sữa tươi (nóng)", "quantity": 150, "unit": "ml" },
        { "ingredient_id": 11, "ingredient_name": "Bộ Ly + Ống hút + Thìa", "quantity": 1, "unit": "bộ" }
      ],
      "others": [{ "name": "Nước sôi hòa tan", "quantity": 90, "unit": "ml" }]
    }
  }
];