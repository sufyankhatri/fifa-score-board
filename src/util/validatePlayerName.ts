export const validatePlayerName = (name: string): boolean => {
  const playerNames = name.split(" ");
  const playerFirstName = playerNames[0];
  const playerLastName = playerNames[1];
  if (!playerFirstName || !playerLastName) {
    return false;
  }
  if (playerFirstName.length === 0 || playerLastName.length === 0) {
    return false;
  }
  return true;
};
