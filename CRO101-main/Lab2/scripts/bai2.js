
const oldData = [
    { code: 'ab', name: 'Son môi' },
    { code: 'ac', name: 'Sữa rửa mặt' },
    { code: null, name: null },
    { code: null, name: '' },
  ];
  
  // Hàm chuyển đổi từ mảng sang object
  const parseArrayToObject = (array, keyId) =>
    Object.fromEntries(
      array.map(item => (item[keyId] ? [item[keyId], item] : null)).filter(Boolean)
    );

  // Chuyển đổi dữ liệu từ mảng sang object
  const newData = parseArrayToObject(oldData, 'code');
  console.log('Dữ liệu sau khi chuyển đổi:', newData);
  
  // Hàm lọc các phần tử không hợp lệ khỏi object
  const filterObject = obj => {
    Object.keys(obj).forEach(key => {
      const item = obj[key];
      // Kiểm tra điều kiện: Loại bỏ nếu không có code hoặc name hợp lệ
      if (!item.code || !item.name || item.name === null || item.name === '') {
        delete obj[key];
      }
    });
    return obj;
  };
  
  // Thực hiện lọc dữ liệu
  const filteredData = filterObject(newData);
  console.log('Dữ liệu sau khi lọc:', filteredData);
  
  // Tìm kiếm sản phẩm theo mã
  const searchProduct = (data, code) => data[code] || 'Sản phẩm không tồn tại';
  const result = searchProduct(filteredData, 'ab');
  console.log('Kết quả tìm kiếm:', result);