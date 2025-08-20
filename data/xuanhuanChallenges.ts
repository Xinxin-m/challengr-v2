// Cultivation challenge data - global fantasy fusion
export const XUANHUAN_CHALLENGES = [
  // Eastern Cultivation - Taiyi Realm
  {
    id: 'taiyi-sword-dao-1',
    title: 'Skyblade Trial',
    description: 'At the Taiyi Sword Peak, resonate with the spirit of the blade and learn the basics of swordcraft. Test your talent and grasp of sword intent.',
    realm: 'taiyi' as const,
    element: 'Metal Sword Qi',
    difficulty: 'apprentice' as const,
    reward: 500,
    participants: 1247,
    timeLimit: '7 days',
    location: 'Taiyi Realm · Sword Peak',
    tags: ['Sword', 'Beginner', 'Talent Test'],
    xpReward: 1500,
    spiritStones: 800,
    rarity: 'uncommon' as const,
    challengeType: 'solo' as const,
    cultivationMethod: 'Swordsmanship Basics',
    ancientText: 'A noble wields the sword: body as sheath, heart as edge. With a clear heart, nothing can harm you.',
    artifacts: ['Azure Blade', 'Sword Notes', 'Sword Qi Talisman']
  },
  
  {
    id: 'taiyi-alchemy-master-1',
    title: 'Ninefold Alchemy Cup',
    description: 'Join the annual alchemy tournament and craft three potions with different effects. Show your talent among master alchemists.',
    realm: 'taiyi' as const,
    element: 'Alchemical Flame',
    difficulty: 'adept' as const,
    reward: 2000,
    participants: 856,
    timeLimit: '3 days',
    location: 'Taiyi Realm · Alchemy Valley',
    tags: ['Alchemy', 'Tournament', 'Craft'],
    xpReward: 5000,
    spiritStones: 3000,
    rarity: 'rare' as const,
    challengeType: 'tournament' as const,
    cultivationMethod: 'Alchemy',
    ancientText: 'Alchemy captures heaven and earth’s essence; with one furnace, all may be refined.',
    artifacts: ['Zijin Furnace', 'Heavenfire Talisman', 'Alchemy Notes', 'Ninefold Elixir']
  },

  // Norse Myth - Asgard
  {
    id: 'asgard-rune-trial-1',
    title: 'Odin’s Rune Trial',
    description: 'Under the World Tree, face Odin’s runic trial and learn ancient rune magic. Only true understanding wins the gods’ favor.',
    realm: 'asgard' as const,
    element: 'Runic Power',
    difficulty: 'practitioner' as const,
    reward: 1200,
    participants: 689,
    timeLimit: '9 days',
    location: 'Asgard · World Tree Roots',
    tags: ['Runes', 'Odin', 'Magic'],
    xpReward: 3000,
    spiritStones: 2000,
    rarity: 'rare' as const,
    challengeType: 'solo' as const,
    cultivationMethod: 'Runic Magic',
    ancientText: 'Runes carry the world’s secrets. Those who master them can bend fate.',
    artifacts: ['Odin Rune Stone', 'Yggdrasil Twig', 'Runic Staff']
  },

  // Greek Myth - Mount Olympus
  {
    id: 'olympus-element-mastery-1',
    title: 'Trial of the Four Elements',
    description: 'On Mount Olympus, master balance and control of wind, fire, water, and earth.',
    realm: 'olympus' as const,
    element: 'Four Elements',
    difficulty: 'adept' as const,
    reward: 1800,
    participants: 1456,
    timeLimit: '4 days',
    location: 'Olympus · Elemental Temple',
    tags: ['Elements', 'Balance', 'Wisdom'],
    xpReward: 4000,
    spiritStones: 2500,
    rarity: 'rare' as const,
    challengeType: 'solo' as const,
    cultivationMethod: 'Elemental Magic',
    ancientText: 'The wise wield the elements; the rash are ruled by them. Balance is power.',
    artifacts: ['Heart of Elements', 'Elemental Orbs', 'Goddess’s Blessing']
  },

  // Ancient Egypt - Kemet
  {
    id: 'kemet-pyramid-mystery-1',
    title: 'Pyramid Rite',
    description: 'Enter the ancient pyramid and partake in a pharaoh’s coronation rite. Learn the mysteries of death and rebirth.',
    realm: 'kemet' as const,
    element: 'Life and Death',
    difficulty: 'master' as const,
    reward: 3500,
    participants: 423,
    timeLimit: '5 days',
    location: 'Kemet · Great Pyramid',
    tags: ['Mystery', 'Pharaoh', 'Rebirth'],
    xpReward: 7000,
    spiritStones: 4500,
    rarity: 'epic' as const,
    challengeType: 'solo' as const,
    cultivationMethod: 'Necromancy',
    ancientText: 'Death is not the end, but a gate to eternity.',
    artifacts: ['Pharaoh’s Scepter', 'Ankh', 'Book of the Dead']
  },

  // Indigenous Americas - Aztlan
  {
    id: 'aztlan-nature-harmony-1',
    title: 'Dance of Harmony',
    description: 'Dance with Aztlan’s nature spirits and learn ancient harmony with the wild. Master shamanic power.',
    realm: 'aztlan' as const,
    element: 'Nature Spirit',
    difficulty: 'practitioner' as const,
    reward: 1000,
    participants: 892,
    timeLimit: '6 days',
    location: 'Aztlan · Sacred Grove',
    tags: ['Shaman', 'Nature', 'Harmony'],
    xpReward: 2800,
    spiritStones: 1800,
    rarity: 'uncommon' as const,
    challengeType: 'team' as const,
    cultivationMethod: 'Shamanic Dance',
    ancientText: 'Earth is our mother, sky our father—we walk with all things.',
    artifacts: ['Quetzalcoatl Staff', 'Heart of Nature', 'Totem Mask']
  }
];

export const REALM_THEMES = {
  taiyi: {
    name: 'Taiyi Immortal Realm',
    culture: 'Eastern Fantasy',
    colors: 'from-red-600 via-orange-500 to-yellow-500',
    emoji: '🏮'
  },
  asgard: {
    name: 'Asgard', 
    culture: 'Norse Mythology',
    colors: 'from-blue-600 via-indigo-500 to-purple-600',
    emoji: '⚡'
  },
  olympus: {
    name: 'Mount Olympus',
    culture: 'Greek Mythology',
    colors: 'from-white via-gold-400 to-blue-500',
    emoji: '🏛️'
  },
  kemet: {
    name: 'Kemet',
    culture: 'Ancient Egypt',
    colors: 'from-amber-600 via-orange-500 to-red-600',
    emoji: '🔱'
  },
  aztlan: {
    name: 'Aztlan',
    culture: 'Indigenous Americas',
    colors: 'from-green-600 via-emerald-500 to-teal-500',
    emoji: '🌿'
  }
};

export const CULTIVATION_TIERS = {
  mortal: { name: 'Mortal', color: 'text-gray-400' },
  apprentice: { name: 'Apprentice', color: 'text-green-400' },
  practitioner: { name: 'Practitioner', color: 'text-blue-400' },
  adept: { name: 'Foundation', color: 'text-purple-400' },
  master: { name: 'Golden Core', color: 'text-yellow-400' },
  grandmaster: { name: 'Nascent Soul', color: 'text-orange-400' },
  sage: { name: 'Soul Formation', color: 'text-red-400' },
  immortal: { name: 'Immortal', color: 'text-cyan-400' }
};