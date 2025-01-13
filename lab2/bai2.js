function countSevens(number) {
    let numStr = number.toString(); // Chuyển số thành chuỗi
    let sevenCount = 0;
    let i = 0;

    // Sử dụng vòng lặp while để duyệt qua từng ký tự trong chuỗi
    while (i < numStr.length) {
        if (numStr[i] === '0') {
            sevenCount++;
        }
        i++;
    }

    // In ra số lượng số 7
    console.log(`Số lượng số 0 trong số ${number} là: ${sevenCount}`);
}

// Gọi hàm với ví dụ 100077700
countSevens(100077700);
