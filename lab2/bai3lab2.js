// Promise giả lập
const promise1 = new Promise((resolve, reject) => setTimeout(resolve, 1000, "Promise 1 hoàn thành"));
const promise2 = new Promise((resolve, reject) => setTimeout(resolve, 2000, "Promise 2 hoàn thành"));
const promise3 = new Promise((resolve, reject) => setTimeout(reject, 1500, "Promise 3 thất bại"));

// Yêu cầu 1: Dừng ngay khi có lỗi
Promise.all([promise1, promise2, promise3])
  .then(results => console.log("Thành công:", results))
  .catch(error => console.error("Lỗi:", error));

// Yêu cầu 2: Chạy bất kể có lỗi
Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    console.log("Kết quả từng promise:", results);
    console.log("Chương trình hoàn tất.");
  });
