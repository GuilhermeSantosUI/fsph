export const badgeAssets = {
  champion: require('../../assets/images/ranks/rank=champion, mode=light.png'),
  diamond: require('../../assets/images/ranks/rank=diamond, mode=light.png'),
  gold: require('../../assets/images/ranks/rank=gold, mode=light.png'),
  silver: require('../../assets/images/ranks/rank=silver, mode=light.png'),
  bronze: require('../../assets/images/ranks/rank=bronze, mode=light.png'),
  platinum: require('../../assets/images/ranks/rank=platinum, mode=light.png'),
};

export type BadgeLevel = keyof typeof badgeAssets;
