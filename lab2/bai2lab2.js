// Dữ liệu
const products = [
    { code: "P001", name: "Lipstick", price: 150 },
    { code: "P002", name: "Foundation", price: 200 },
    { code: null, name: "Mascara", price: 100 },
    { code: "P003", name: null, price: 120 },
    { code: "P004", name: "Eyeliner", price: 90 },
  ];
  
  // Chuyển từ mảng sang object
  const productObj = Object.fromEntries(
    products
      .filter(product => product.code && product.name) // Lọc sản phẩm hợp lệ
      .map(product => [product.code, product])
  );
  
  // Kết quả
  console.log("Object sản phẩm:", productObj);
  