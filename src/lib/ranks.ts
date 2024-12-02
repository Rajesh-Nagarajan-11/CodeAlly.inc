export const ranks = [
  { name: 'Bronze', color: 'bg-amber-600', level: 1, requiredXP: 0 },
  { name: 'Silver', color: 'bg-gray-400', level: 2, requiredXP: 1000 },
  { name: 'Gold', color: 'bg-yellow-500', level: 3, requiredXP: 2500 },
  { name: 'Platinum', color: 'bg-cyan-500', level: 4, requiredXP: 5000 },
  { name: 'Diamond', color: 'bg-blue-500', level: 5, requiredXP: 10000 },
  { name: 'Master', color: 'bg-purple-500', level: 6, requiredXP: 20000 },
] as const;

export function calculateRank(experience: number) {
  const currentRank = [...ranks].reverse().find(rank => experience >= rank.requiredXP);
  const nextRank = ranks[currentRank ? ranks.indexOf(currentRank) + 1 : 0];
  
  return {
    current: currentRank || ranks[0],
    nextLevelExperience: nextRank ? nextRank.requiredXP : currentRank!.requiredXP,
  };
}