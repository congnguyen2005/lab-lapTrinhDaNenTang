// Danh sách cầu thủ
const players = [
    { name: 'Messi', goals: 30 },
    undefined,
    { name: 'Ronaldo', goals: 28 },
    { name: 'Neymar', goals: 22 },
    { goals: 2 },
    { name: 'Mbappé', goals: 25 },
    { name: 'Pele', goals: null },
  ];
  
  // Hàm kiểm tra cầu thủ hợp lệ
  function isValidPlayer(player) {
    return player?.name && typeof player.goals === 'number';
  }
  
  // Biến lưu danh sách cầu thủ hợp lệ
  const validPlayers = players.filter(isValidPlayer);
  
  // Tìm cầu thủ ghi bàn nhiều nhất
  let topScorer = null;
  
  validPlayers.forEach(player => {
    if (!topScorer || player.goals > topScorer.goals) {
      topScorer = player;
    }
  });
  
  // Kết quả
  console.log("Danh sách cầu thủ hợp lệ:", validPlayers);
  console.log("Cầu thủ ghi bàn nhiều nhất:", topScorer);
  