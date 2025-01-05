export const getTitle = rating => {
  var title = 'Narni GOD';
  if (rating < 2000) {
    title = 'Grand Master';
  }
  if (rating < 1500) {
    title = 'Narni Master';
  }
  if (rating < 1250) {
    title = 'Narni Lord';
  }
  if (rating < 1100) {
    title = 'Narni Novice';
  }
  if (rating < 1000) {
    title = 'lima loser';
  }
  if (rating < 750) {
    title = 'Sorry Soul';
  }
  if (rating < 500) {
    title = 'Small Child';
  }
  if (rating < 250) {
    title = 'Banana Sole';
  }
  return title;
};

export const getWinPercentTitle = winRate => {
  var title = 'Ur too good bro';
  if (winRate < 5) {
    title = 'We Need to fix this 😭';
  }
  return title;
};
