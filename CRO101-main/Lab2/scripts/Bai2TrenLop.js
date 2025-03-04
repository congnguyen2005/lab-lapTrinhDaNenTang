let soNhap = parseInt(101020000);
let dem = 0;

do {
    if (soNhap % 10 === 0) { 
        dem++;
    }
    soNhap = Math.floor(soNhap / 10); 
} while (soNhap > 0);

console.log(`Số lượng số 0 là: ${dem}`);
