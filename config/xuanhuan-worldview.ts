// 修真学院 - 全球玄幻世界观配置
export interface CultivationRealm {
  id: string;
  name: string;
  englishName: string;
  description: string;
  culture: string;
  element: string;
  color: string;
  specialties: string[];
  legendaryFigures: string[];
  ancientTexts: string[];
  cultivationMethods: string[];
  artifacts: string[];
  geography: string;
  climate: string;
  currency: string;
  language: string;
}

export interface CultivationTier {
  id: string;
  name: string;
  englishName: string;
  level: number;
  description: string;
  requirements: {
    xp: number;
    challenges: number;
    artifacts?: string[];
  };
  abilities: string[];
  appearance: {
    aura: string;
    effects: string[];
  };
}

export interface CultivationPath {
  id: string;
  name: string;
  englishName: string;
  realm: string;
  element: string;
  description: string;
  baseStats: {
    strength: number;
    wisdom: number;
    agility: number;
    spirit: number;
  };
  signature: string;
  advantages: string[];
  weaknesses: string[];
  evolution: string[];
}

// 五大修真界域 - 对应全球文化
export const CULTIVATION_REALMS: CultivationRealm[] = [
  {
    id: 'taiyi',
    name: '太一仙界',
    englishName: 'Taiyi Immortal Realm',
    description: '东方修仙文明的发源地，追求天人合一，以内丹修炼为主',
    culture: '中华文明',
    element: '阴阳五行',
    color: 'from-red-600 via-orange-500 to-yellow-500',
    specialties: ['内丹修炼', '剑道', '符箓', '丹药', '阵法'],
    legendaryFigures: ['太上老君', '玉皇大帝', '观音菩萨', '孙悟空', '白娘子'],
    ancientTexts: ['道德经', '易经', '黄帝内经', '太平经', '抱朴子'],
    cultivationMethods: ['静坐冥想', '导引术', '内丹功', '剑修', '符修'],
    artifacts: ['太极图', '八卦镜', '仙剑', '炼丹炉', '储物袋'],
    geography: '仙山琼岛、云海缭绕、古典建筑',
    climate: '四季分明、灵气充沛',
    currency: 'coins',
    language: '古汉语'
  },
  {
    id: 'asgard',
    name: '阿斯加德神界',
    englishName: 'Asgard Divine Realm',
    description: '北欧神话的神域，以符文魔法和战士精神著称',
    culture: '北欧文明',
    element: '符文之力',
    color: 'from-blue-600 via-indigo-500 to-purple-600',
    specialties: ['符文魔法', '战士之道', '铸造', '狂战', '预言'],
    legendaryFigures: ['奥丁', '雷神托尔', '洛基', '芙蕾雅', '海姆达尔'],
    ancientTexts: ['埃达', '萨迦', '符文诗歌', '预言书', '英灵录'],
    cultivationMethods: ['符文刻画', '战场修行', '神器锻造', '灵视冥想', '狂暴训练'],
    artifacts: ['雷神锤', '奥丁之枪', '符文石', '彩虹桥', '世界树'],
    geography: '雄伟山脉、极地冰原、神殿宫阙',
    climate: '寒冷严酷、极光频现',
    currency: '神金',
    language: '古北欧语'
  },
  {
    id: 'olympus',
    name: '奥林匹斯神山',
    englishName: 'Mount Olympus',
    description: '古希腊众神的居所，崇尚智慧与美学的完美结合',
    culture: '希腊文明',
    element: '元素之源',
    color: 'from-white via-gold-400 to-blue-500',
    specialties: ['元素魔法', '哲学思辨', '艺术创造', '英雄史诗', '智慧传承'],
    legendaryFigures: ['宙斯', '雅典娜', '阿波罗', '阿尔忒弥斯', '波塞冬'],
    ancientTexts: ['荷马史诗', '柏拉图对话录', '亚里士多德著作', '神谱', '变形记'],
    cultivationMethods: ['哲学思辨', '艺术创作', '体育竞技', '辩论修行', '美学冥想'],
    artifacts: ['宙斯之盾', '智慧头盔', '阿波罗竖琴', '黄金苹果', '潘多拉魔盒'],
    geography: '白色大理石神殿、橄榄树林、地中海风光',
    climate: '温暖宜人、阳光充足',
    currency: '德拉克马',
    language: '古希腊语'
  },
  {
    id: 'kemet',
    name: '凯麦特神域',
    englishName: 'Kemet Divine Domain',
    description: '古埃及文明的神秘国度，掌握生死轮回的奥秘',
    culture: '埃及文明',
    element: '生死之力',
    color: 'from-amber-600 via-orange-500 to-red-600',
    specialties: ['死灵法术', '木乃伊制作', '天文占卜', '金字塔建造', '永生研究'],
    legendaryFigures: ['拉神', '奥西里斯', '伊西丝', '荷鲁斯', '阿努比斯'],
    ancientTexts: ['死者之书', '金字塔文', '拉美西斯史诗', '伊西丝赞美诗', '图特的智慧书'],
    cultivationMethods: ['木乃伊冥想', '天文观测', '象形文字修炼', '沙漠苦修', '金字塔能量'],
    artifacts: ['生命符', '法老权杖', '死者之书', '圣甲虫', '荷鲁斯之眼'],
    geography: '金字塔群、尼罗河畔、沙漠绿洲',
    climate: '炎热干燥、日夜温差大',
    currency: '黄金达本',
    language: '古埃及语'
  },
  {
    id: 'aztlan',
    name: '阿兹特兰神域',
    englishName: 'Aztlan Sacred Realm',
    description: '美洲原住民的神圣领域，与自然精灵共存',
    culture: '美洲文明',
    element: '自然之灵',
    color: 'from-green-600 via-emerald-500 to-teal-500',
    specialties: ['自然魔法', '动物变形', '植物操控', '天气控制', '精神沟通'],
    legendaryFigures: ['羽蛇神', '雨神', '玉米女神', '太阳鸟', '大地母亲'],
    ancientTexts: ['羽蛇神传说', '玛雅预言', '图腾经文', '萨满之歌', '创世神话'],
    cultivationMethods: ['萨满舞蹈', '图腾冥想', '植物致幻', '动物沟通', '自然融合'],
    artifacts: ['羽蛇神杖', '图腾柱', '药草袋', '雨之石', '风之羽毛'],
    geography: '热带雨林、古代金字塔、瀑布峡谷',
    climate: '湿热多雨、生机盎然',
    currency: '玉石珠',
    language: '纳瓦特尔语'
  }
];

// 修真境界体系 - 融合各文化特色
export const CULTIVATION_TIERS: CultivationTier[] = [
  {
    id: 'mortal',
    name: '凡人境',
    englishName: 'Mortal Stage',
    level: 1,
    description: '刚踏入修真之路的普通人',
    requirements: { xp: 0, challenges: 0 },
    abilities: ['基础感知', '初级学习'],
    appearance: { aura: 'transparent', effects: [] }
  },
  {
    id: 'apprentice',
    name: '学徒境',
    englishName: 'Apprentice Stage',
    level: 2,
    description: '开始掌握基础修真技能',
    requirements: { xp: 1000, challenges: 5 },
    abilities: ['元素感应', '基础冥想', '初级法术'],
    appearance: { aura: 'faint-white', effects: ['subtle-glow'] }
  },
  {
    id: 'practitioner',
    name: '修行者',
    englishName: 'Practitioner',
    level: 3,
    description: '掌握一定修真技能的修行者',
    requirements: { xp: 5000, challenges: 15 },
    abilities: ['中级法术', '灵识外放', '法器使用'],
    appearance: { aura: 'blue', effects: ['energy-flow', 'occasional-sparkle'] }
  },
  {
    id: 'adept',
    name: '筑基期',
    englishName: 'Foundation Building',
    level: 4,
    description: '打下坚实修真基础的修行者',
    requirements: { xp: 15000, challenges: 30 },
    abilities: ['高级法术', '炼器入门', '符箓制作'],
    appearance: { aura: 'golden', effects: ['stable-aura', 'power-waves'] }
  },
  {
    id: 'master',
    name: '金丹期',
    englishName: 'Golden Core',
    level: 5,
    description: '修成金丹的高深修士',
    requirements: { xp: 50000, challenges: 60, artifacts: ['golden-core'] },
    abilities: ['领域展开', '空间传送', '高阶炼丹'],
    appearance: { aura: 'brilliant-gold', effects: ['core-radiance', 'space-distortion'] }
  },
  {
    id: 'grandmaster',
    name: '元婴期',
    englishName: 'Nascent Soul',
    level: 6,
    description: '修出元婴的顶级强者',
    requirements: { xp: 150000, challenges: 100, artifacts: ['nascent-soul'] },
    abilities: ['分身术', '时间感知', '创造小世界'],
    appearance: { aura: 'rainbow', effects: ['soul-projection', 'reality-bend'] }
  },
  {
    id: 'sage',
    name: '化神期',
    englishName: 'Soul Formation',
    level: 7,
    description: '接近仙人的传说存在',
    requirements: { xp: 500000, challenges: 200, artifacts: ['divine-soul'] },
    abilities: ['法则掌控', '创造生命', '跨界传送'],
    appearance: { aura: 'divine-light', effects: ['law-manifestation', 'creation-power'] }
  },
  {
    id: 'immortal',
    name: '仙人境',
    englishName: 'Immortal Realm',
    level: 8,
    description: '超脱生死的不朽存在',
    requirements: { xp: 1000000, challenges: 365, artifacts: ['immortal-essence'] },
    abilities: ['不死不灭', '时空操控', '宇宙创造'],
    appearance: { aura: 'cosmic', effects: ['immortal-radiance', 'universal-power'] }
  }
];

// 全球修真职业路径 - 360种职业的核心分类
export const GLOBAL_CULTIVATION_PATHS: CultivationPath[] = [
  // 东方系列 - 太一仙界
  {
    id: 'sword-immortal',
    name: '剑仙',
    englishName: 'Sword Immortal',
    realm: 'taiyi',
    element: '金',
    description: '以剑入道，追求剑与人合一的至高境界',
    baseStats: { strength: 8, wisdom: 6, agility: 9, spirit: 7 },
    signature: '万剑归宗',
    advantages: ['攻击力极强', '速度极快', '帅气拉风'],
    weaknesses: ['防御较弱', '消耗较大'],
    evolution: ['练剑士', '剑修', '剑仙', '剑尊', '剑神']
  },
  {
    id: 'dan-master',
    name: '丹师',
    englishName: 'Pill Master',
    realm: 'taiyi',
    element: '火',
    description: '专精炼丹之术，能够炼制各种神奇丹药',
    baseStats: { strength: 4, wisdom: 10, agility: 5, spirit: 8 },
    signature: '九转金丹',
    advantages: ['辅助能力强', '财富积累快', '生存能力强'],
    weaknesses: ['战斗力较弱', '需要大量资源'],
    evolution: ['药童', '炼丹师', '丹师', '丹王', '丹仙']
  },
  
  // 北欧系列 - 阿斯加德神界
  {
    id: 'runic-warrior',
    name: '符文战士',
    englishName: 'Runic Warrior',
    realm: 'asgard',
    element: '符文',
    description: '掌握古老符文力量的强大战士',
    baseStats: { strength: 9, wisdom: 7, agility: 6, spirit: 8 },
    signature: '诸神黄昏',
    advantages: ['攻防兼备', '符文多样', '战斗狂热'],
    weaknesses: ['需要准备时间', '符文消耗大'],
    evolution: ['符文学徒', '符文勇士', '符文战士', '符文之王', '符文之神']
  },
  
  // 希腊系列 - 奥林匹斯神山  
  {
    id: 'elemental-sage',
    name: '元素贤者',
    englishName: 'Elemental Sage',
    realm: 'olympus',
    element: '四元素',
    description: '掌控风火水土四大元素的智者',
    baseStats: { strength: 6, wisdom: 10, agility: 7, spirit: 9 },
    signature: '元素风暴',
    advantages: ['元素多样', '范围攻击', '智慧超群'],
    weaknesses: ['体质较弱', '需要法力'],
    evolution: ['元素学徒', '元素法师', '元素贤者', '元素领主', '元素之神']
  },
  
  // 埃及系列 - 凯麦特神域
  {
    id: 'pharaoh-priest',
    name: '法老祭司',
    englishName: 'Pharaoh Priest',
    realm: 'kemet',
    element: '生死',
    description: '掌握生死奥秘的神秘祭司',
    baseStats: { strength: 5, wisdom: 9, agility: 6, spirit: 10 },
    signature: '死者复生',
    advantages: ['治疗能力强', '诅咒厉害', '不死能力'],
    weaknesses: ['物理攻击弱', '需要仪式'],
    evolution: ['见习祭司', '神庙祭司', '法老祭司', '死神使者', '永生之主']
  },
  
  // 美洲系列 - 阿兹特兰神域
  {
    id: 'nature-shaman',
    name: '自然萨满',
    englishName: 'Nature Shaman',
    realm: 'aztlan',
    element: '自然',
    description: '与自然万物沟通的神秘萨满',
    baseStats: { strength: 6, wisdom: 8, agility: 8, spirit: 10 },
    signature: '自然之怒',
    advantages: ['治疗恢复', '动物伙伴', '环境适应'],
    weaknesses: ['依赖环境', '攻击力一般'],
    evolution: ['部落萨满', '自然行者', '自然萨满', '大地之子', '自然之神']
  }
];

// 修真资源系统
export const CULTIVATION_RESOURCES = {
  // 基础货币
  currencies: {
    'spirit-stone': {
      name: 'coins',
      englishName: 'Coins',
      description: 'Platform currency for challenges and rewards',
      rarity: 'common',
      dailyLimit: 10000
    },
    'divine-crystal': {
      name: '神晶',
      englishName: 'Divine Crystal', 
      description: '高级修真资源，用于突破境界',
      rarity: 'rare',
      dailyLimit: 100
    },
    'dao-coin': {
      name: '道币',
      englishName: 'Dao Coin',
      description: '永久修真代币，记录修真历程',
      rarity: 'legendary',
      dailyLimit: 0
    }
  },
  
  // 修真材料
  materials: {
    'millennium-ginseng': {
      name: '千年人参',
      englishName: 'Millennium Ginseng',
      description: '珍贵药材，增加XP',
      effect: '+1000 XP',
      rarity: 'rare'
    },
    'phoenix-feather': {
      name: '凤凰羽毛',
      englishName: 'Phoenix Feather',
      description: '神鸟羽毛，炼制高级丹药必需',
      effect: 'Crafting Material',
      rarity: 'epic'
    }
  }
};

// 修真学院声望系统
export const SECT_REPUTATION = {
  'taiyi-sect': { name: '太一仙宗', reputation: 0 },
  'asgard-hall': { name: '阿斯加德神殿', reputation: 0 },
  'olympus-academy': { name: '奥林匹斯学院', reputation: 0 },
  'kemet-temple': { name: '凯麦特神庙', reputation: 0 },
  'aztlan-circle': { name: '阿兹特兰圣环', reputation: 0 }
};

// 全球修真节日系统
export const CULTIVATION_FESTIVALS = [
  {
    name: '春分修真节',
    englishName: 'Spring Equinox Cultivation Festival',
    date: '3-20',
    description: '天地阴阳平衡之日，修真效果翻倍',
    bonus: { xp: 2.0, rewards: 1.5 }
  },
  {
    id: 'summer-solstice',
    name: '夏至阳极节',
    englishName: 'Summer Solstice Yang Festival', 
    date: '6-21',
    description: '阳气最盛之日，火系修真者获得额外加成',
    bonus: { fire_element: 2.0 }
  }
];