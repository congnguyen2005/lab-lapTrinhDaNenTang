function countEvenOdd(a, b) {
    let evenCount = 0;
    let oddCount = 0;

    // Duyệt qua khoảng từ a đến b
    for (let num = a; num <= b; num++) {
        if (num % 2 === 0) {
            evenCount++;
        } else {
            oddCount++;
        }
    }

    // In kết quả
    console.log(`Số lượng số chẵn trong khoảng ${a} và ${b}: ${evenCount}`);
    console.log(`Số lượng số lẻ trong khoảng ${a} và ${b}: ${oddCount}`);
    
    // In số từ 2 đến 10
    for (let i = 2; i <= 10; i++) {
        console.log(i);
    }
}

// Gọi hàm với ví dụ a = 5, b = 15
countEvenOdd(5, 15);
