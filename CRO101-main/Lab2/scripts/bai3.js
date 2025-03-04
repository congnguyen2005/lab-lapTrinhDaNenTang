// Khởi tạo 3 Promise
const firstPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('foo');
    }, 2000);
  });
  
  const secondPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Error: Some bug');
    }, 3000);
  });
  
  const getList = async () => {
    try {
      const response = await fetch('https://63d84b5e5a330a6ae1609c2b.mockapi.io/api/v1/moviesNow');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  };
  
  // Đồng bộ hóa các Promise
  const runPromises = async () => {
    console.log('Bắt đầu chạy các Promise...');
    
    // Đảm bảo tất cả các Promise chạy đồng thời
    const promises = [firstPromise, secondPromise, getList()];
  
    try {
      // Sử dụng Promise.all để chờ tất cả Promise hoàn thành hoặc lỗi xảy ra
      const results = await Promise.all(promises);
      console.log('Tất cả các Promise đã hoàn thành:', results);
    } catch (error) {
      console.error('Một Promise bị lỗi:', error);
    }
  
    // Sử dụng Promise.allSettled để nhận kết quả của từng Promise (hoàn thành hoặc lỗi)
    const allResults = await Promise.allSettled(promises);
    console.log('Kết quả từng Promise (allSettled):', allResults);
  
    allResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Promise ${index + 1} hoàn thành:`, result.value);
      } else {
        console.error(`Promise ${index + 1} thất bại:`, result.reason);
      }
    });
  
    console.log('Hoàn thành xử lý các Promise.');
  };
  
  // Chạy chương trình
  runPromises();