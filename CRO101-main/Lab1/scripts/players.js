const players = [
    { name: 'Messi', goals: 30 },
    undefined,
    { name: 'Ronaldo', goals: 28 },
    { name: 'Neymar', goals: 22 },
    { goals: 2 },
    { name: 'Mbappé', goals: 25 },
    { name: 'Pele', goals: null },
  ];
  
  // Hàm kiểm tra tính hợp lệ của một cầu thủ
  function isValidPlayer(player) {
    return player && typeof player.name === 'string' && typeof player.goals === 'number';
  }
  
  // Lọc ra các cầu thủ hợp lệ và tính tổng số bàn thắng
  const validPlayers = players.filter(isValidPlayer);
  const totalGoalsByPlayer = validPlayers.reduce((acc, player) => {
    acc[player.name] = player.goals;
    return acc;
  }, {});
  
  // Tìm cầu thủ ghi được nhiều bàn thắng nhất
  const topScorer = Object.keys(totalGoalsByPlayer).reduce((a, b) => totalGoalsByPlayer[a] > totalGoalsByPlayer[b] ? a : b);
  
  console.log('Danh sách cầu thủ hợp lệ và số bàn thắng:');
  console.log(totalGoalsByPlayer);
  console.log('Cầu thủ ghi được nhiều bàn thắng nhất:', topScorer);