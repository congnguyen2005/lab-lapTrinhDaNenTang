const class1 = [
    { mssv: 'PS0001', name: 'Nguyen Van A', avgPoint: 8.9, avgTrainingPoint: 7, status: 'pass' },
    { mssv: 'PS0002', name: 'Tran Thi B', avgPoint: 7.5, avgTrainingPoint: 8, status: 'pass' },
    // ... thêm 8 sinh viên nữa
  ];
  
  const class2 = [
    { mssv: 'PS0011', name: 'Le Van C', avgPoint: 9.2, avgTrainingPoint: 6, status: 'pass' },
    { mssv: 'PS0012', name: 'Nguyen Thi D', avgPoint: 6.8, avgTrainingPoint: 9, status: 'pass' },
    // ... thêm 8 sinh viên nữa
  ];
  
  function findTopStudents(class1, class2) {
    // Kết hợp danh sách sinh viên
    const allStudents = class1.concat(class2);
  
    // Lọc sinh viên đạt
    const passedStudents = allStudents.filter(student => student.status === 'pass');
  
    // Sắp xếp sinh viên theo điểm trung bình giảm dần (sao chép mảng để không ảnh hưởng)
    const sortedByAvgPoint = [...passedStudents].sort((a, b) => b.avgPoint - a.avgPoint);
  
    // Lấy top 100 sinh viên có điểm số cao nhất
    const top100Students = sortedByAvgPoint.slice(0, Math.min(100, sortedByAvgPoint.length));
  
    // Tìm "Ông vàng" (sinh viên có điểm trung bình cao nhất)
    const ongVang = sortedByAvgPoint[0] || null;
  
    // Sắp xếp sinh viên theo điểm rèn luyện giảm dần (sao chép mảng để không ảnh hưởng)
    const sortedByAvgTrainingPoint = [...passedStudents].sort((a, b) => b.avgTrainingPoint - a.avgTrainingPoint);
  
    // Lấy top 10 sinh viên có điểm rèn luyện cao nhất
    const top10TrainingStudents = sortedByAvgTrainingPoint.slice(0, Math.min(10, sortedByAvgTrainingPoint.length));
  
    return {
      top100Students,
      top10TrainingStudents,
      ongVang,
    };
  }
  
  // Gọi hàm và gán kết quả vào biến result
  const result = findTopStudents(class1, class2);
  
  console.log("Top 100 sinh viên theo điểm số:");
  console.log(JSON.stringify(result.top100Students, null, 2)); // 2 là số khoảng trắng để định dạng dễ đọc
  
  console.log("Top 10 sinh viên theo điểm rèn luyện:");
  console.log(JSON.stringify(result.top10TrainingStudents, null, 2));
  
  console.log("Ông vàng:");
  console.log(result.ongVang);