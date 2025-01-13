// Dữ liệu
const class1 = [
    { mssv: 'PS0000', name: 'Nguyen Van A', avgPoint: 8.9, avgTraningPoint: 7, status: 'pass' },
    { mssv: 'PS0001', name: 'Nguyen Van B', avgPoint: 4.9, avgTraningPoint: 10, status: 'pass' },
  ];
  
  const class2 = [
    { mssv: 'PS0002', name: 'Nguyen Van C', avgPoint: 4.9, avgTraningPoint: 10, status: 'failed' },
    { mssv: 'PS0003', name: 'Nguyen Van D', avgPoint: 10, avgTraningPoint: 10, status: 'pass' },
    { mssv: 'PS0004', name: 'Nguyen Van E', avgPoint: 10, avgTraningPoint: 2, status: 'pass' },
  ];
  
  // Gộp danh sách và loại bỏ sinh viên có trạng thái "failed"
  const allStudents = [...class1, ...class2];
  const validStudents = allStudents.filter(student => student.status === 'pass');
  
  // Sắp xếp danh sách theo điểm số giảm dần
  const sortedByAvgPoint = [...validStudents].sort((a, b) => b.avgPoint - a.avgPoint);
  const sortedByTrainingPoint = [...validStudents].sort((a, b) => b.avgTraningPoint - a.avgTraningPoint);
  
  // Tìm "Ong vàng" (sinh viên có điểm cao nhất)
  const topStudent = sortedByAvgPoint[0];
  
  // Kết quả
  console.log("Danh sách sinh viên theo điểm trung bình giảm dần:", sortedByAvgPoint);
  console.log("Danh sách sinh viên theo điểm rèn luyện giảm dần:", sortedByTrainingPoint);
  console.log("Ong vàng:", topStudent);
  