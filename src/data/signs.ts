// 36张签卡数据（观音灵签）
export interface SignCard {
  id: number;
  number: number;
  type: '上签' | '中签' | '下签';
  title: string;
  poem: string;
  interpretation: string;
  career?: string;
  love?: string;
  health?: string;
  wealth?: string;
}

export const signs: SignCard[] = [
  {
    id: 1,
    number: 1,
    type: '上签',
    title: '钟离成道',
    poem: '开天辟地作良缘，吉日良时万物全，若得此签非小可，人行忠正帝王宣。',
    interpretation: '此签大吉，诸事皆宜。天地开辟，万物生辉。时机已到，事业可成。',
    career: '事业有成，贵人相助，晋升有望。',
    love: '姻缘天定，良缘可期，婚姻美满。',
    health: '身体健康，精力充沛。',
    wealth: '财运亨通，正财为主。'
  },
  {
    id: 2,
    number: 2,
    type: '下签',
    title: '苏武牧羊',
    poem: '鸟语花香景艳阳，心田未静强商量，如今且把归程计，莫待风雨惹祸殃。',
    interpretation: '此签不利，宜静不宜动。心绪不宁，切勿躁进。暂且等待，时机未到。',
    career: '事业阻滞，不宜变动，守成为上。',
    love: '感情不顺，缘分未到，耐心等待。',
    health: '注意调养，不宜操劳。',
    wealth: '财运平平，不宜投资。'
  },
  {
    id: 3,
    number: 3,
    type: '下签',
    title: '董永卖身',
    poem: '临风冒雨过前山，正是干戈战未还，若得此签求用意，须当时刻待云开。',
    interpretation: '此签艰难，前路多阻。风雨飘摇，宜静待时机。云开见日，方有转机。',
    career: '事业困难，阻力重重，耐心等待。',
    love: '感情波折，误会难解，时间化解。',
    health: '注意风寒，小心感冒。',
    wealth: '财运不佳，量入为出。'
  },
  {
    id: 4,
    number: 4,
    type: '上签',
    title: '玄德请诸葛',
    poem: '千里迢迢往西求，前途美景自悠悠，问君但看前头路，万事俱成乐无忧。',
    interpretation: '此签大吉，前途光明。千里求谋，终有所成。贵人相助，诸事顺遂。',
    career: '事业亨通，贵人提携，前程似锦。',
    love: '良缘天成，感情顺利。',
    health: '身体康健，精神愉悦。',
    wealth: '财源广进，正财偏财皆有。'
  },
  {
    id: 5,
    number: 5,
    type: '中签',
    title: '吕蒙正破窑',
    poem: '一箭射红心，人人说好音，高低且随分，荣华自有时。',
    interpretation: '此签平稳，渐进渐成。射中红心，自有好音。不急不躁，荣华终至。',
    career: '事业稳步发展，循序渐进。',
    love: '感情平顺，需要时间培养。',
    health: '健康无碍，注意休息。',
    wealth: '财运平稳，积少成多。'
  },
  {
    id: 6,
    number: 6,
    type: '中签',
    title: '仁贵投军',
    poem: '投身岩下铜鸟居，须是还他大丈夫，早晚功名终有望，前程万里自荣华。',
    interpretation: '此签先苦后甜，大器晚成。暂时屈就，终成大业。坚持不懈，功名可期。',
    career: '事业起步艰难，坚持必有成就。',
    love: '感情需要耐心，真诚终能打动。',
    health: '注意劳逸结合。',
    wealth: '财运渐佳，后期更旺。'
  },
  {
    id: 7,
    number: 7,
    type: '下签',
    title: '苏秦刺股',
    poem: '奔波役役重重险，若要还时莫要贪，心下正疑疑未决，若逢虎兔始艰难。',
    interpretation: '此签多阻，前路艰险。奔波劳碌，切勿贪心。犹豫不决，更添困难。',
    career: '事业多阻，不宜冒进。',
    love: '感情迷茫，需要冷静。',
    health: '注意休息，避免过劳。',
    wealth: '财运不佳，守成为上。'
  },
  {
    id: 8,
    number: 8,
    type: '上签',
    title: '姜公渭水钓鱼',
    poem: '岁寒松柏古栽培，雨雪风霜总不摧，异日大开凤凰翅，愈加苍翠作良材。',
    interpretation: '此签大吉，苦尽甘来。松柏耐寒，终成大器。时机一到，鹏程万里。',
    career: '事业根基稳固，前途无量。',
    love: '感情坚贞，白头偕老。',
    health: '身体强健，抵抗力强。',
    wealth: '财运亨通，厚积薄发。'
  },
  {
    id: 9,
    number: 9,
    type: '中签',
    title: '孔明入川',
    poem: '昔因路险要迷踪，今日前途尽许通，步步经营皆有利，前程大道任君冲。',
    interpretation: '此签渐顺，前途开通。往日迷途，今已明朗。步步为营，终达目标。',
    career: '事业转机，前途光明。',
    love: '感情顺利，沟通顺畅。',
    health: '健康状况良好。',
    wealth: '财运渐旺，可以进取。'
  },
  {
    id: 10,
    number: 10,
    type: '中签',
    title: '庞涓观阵',
    poem: '石小皆因块大难，前途莫把望高攀，若是有心勤作事，暂时忍耐自有还。',
    interpretation: '此签平稳，循序渐进。切勿好高骛远，脚踏实地，终有所成。',
    career: '事业需要耐心，从小做起。',
    love: '感情需要培养，不要急躁。',
    health: '注意小病小痛。',
    wealth: '财运平稳，细水长流。'
  },
  {
    id: 11,
    number: 11,
    type: '上签',
    title: '韩信功劳',
    poem: '春风得意马蹄疾，一举成名天下知，若得此签非小可，前程万里任奔驰。',
    interpretation: '此签大吉，功成名就。春风得意，一举成名。事业腾飞，前途无量。',
    career: '事业大成，名利双收。',
    love: '感情美满，郎才女貌。',
    health: '精力充沛，神采奕奕。',
    wealth: '财运极佳，财源广进。'
  },
  {
    id: 12,
    number: 12,
    type: '中签',
    title: '武则天登基',
    poem: '威风凛凛万人钦，莫道英雄非女身，若逢此签多吉庆，婚姻子孙尽光荣。',
    interpretation: '此签吉利，女性尤佳。威风凛凛，众人敬仰。婚姻美满，子孙荣耀。',
    career: '事业有成，受人尊敬。',
    love: '感情顺遂，婚姻幸福。',
    health: '身体健康，容光焕发。',
    wealth: '财运不错，衣食无忧。'
  },
  {
    id: 13,
    number: 13,
    type: '中签',
    title: '罗通拜帅',
    poem: '不必心高不必忙，也须事事要商量，但愿一心皆稳静，家门安乐自荣昌。',
    interpretation: '此签平稳，不宜急躁。凡事商量，心平气和。家庭和睦，自有荣昌。',
    career: '事业平稳，不宜冒进。',
    love: '感情稳定，家庭和谐。',
    health: '心态平和，身体安康。',
    wealth: '财运平稳，知足常乐。'
  },
  {
    id: 14,
    number: 14,
    type: '下签',
    title: '子牙弃官',
    poem: '宛如仙鹤出樊笼，脱得樊笼路路通，南北东西无阻隔，任君直上九霄中。',
    interpretation: '此签宜变，脱离困境。仙鹤出笼，海阔天空。放手一搏，前途光明。',
    career: '事业宜变，转换跑道。',
    love: '感情宜放，不必执着。',
    health: '精神压力可解除。',
    wealth: '财运待变，转机将至。'
  },
  {
    id: 15,
    number: 15,
    type: '上签',
    title: '苏秦背剑',
    poem: '东风解冻雪消时，万物逢春发旧枝，这朵梅花当面发，家家户户喜孜孜。',
    interpretation: '此签大吉，春回大地。万物复苏，生机勃勃。喜事临门，欢天喜地。',
    career: '事业转机，机遇来临。',
    love: '感情开花结果，喜事将近。',
    health: '身体康复，精神焕发。',
    wealth: '财运亨通，喜事连连。'
  },
  {
    id: 16,
    number: 16,
    type: '中签',
    title: '叶梦雄朝帝',
    poem: '天开地阔志能伸，万事皆成贵在勤，且向名人施所学，必然富贵作良因。',
    interpretation: '此签吉利，勤奋有成。天地广阔，志向可伸。勤学苦练，富贵可期。',
    career: '事业有成，贵在坚持。',
    love: '感情需要付出，真诚为本。',
    health: '身体强健，注意锻炼。',
    wealth: '财运不错，勤劳致富。'
  },
  {
    id: 17,
    number: 17,
    type: '下签',
    title: '话梅止渴',
    poem: '枯木逢春欲放花，虽然得暖又生芽，可惜枝头无结果，依然叶落作尘沙。',
    interpretation: '此签不美，徒劳无功。枯木逢春，虽有一线生机，终究无果。不宜妄动。',
    career: '事业无成，徒劳无功。',
    love: '感情空欢喜，不宜强求。',
    health: '注意养生，防止复发。',
    wealth: '财运不佳，不宜投资。'
  },
  {
    id: 18,
    number: 18,
    type: '中签',
    title: '曹操献刀',
    poem: '心中有事暗相猜，行事多疑且徘徊，若得贵人来接引，前途平坦笑颜开。',
    interpretation: '此签多疑，需要贵人。心中疑虑，行事谨慎。贵人相助，前途平坦。',
    career: '事业需要贵人提携。',
    love: '感情需要坦诚相待。',
    health: '心理压力较大，需要调节。',
    wealth: '财运平平，需要助力。'
  },
  {
    id: 19,
    number: 19,
    type: '下签',
    title: '子仪封王',
    poem: '急水滩头放船归，风波波浪又惊疑，若得贵人来接引，前途方可有荣期。',
    interpretation: '此签多阻，风波不断。急流险滩，危机四伏。需要贵人，方能脱险。',
    career: '事业多阻，危机重重。',
    love: '感情波折，需要帮助。',
    health: '注意安全，小心意外。',
    wealth: '财运不佳，不宜冒险。'
  },
  {
    id: 20,
    number: 20,
    type: '中签',
    title: '姜维接印',
    poem: '秋来菊花正芬芳，事业功名渐有方，遇得贵人来接引，荣华富贵在门旁。',
    interpretation: '此签渐顺，秋收冬藏。事业有成，功名可期。贵人相助，荣华在望。',
    career: '事业有成，贵人提携。',
    love: '感情顺遂，佳偶天成。',
    health: '身体健康，精神愉快。',
    wealth: '财运不错，正财为主。'
  },
  {
    id: 21,
    number: 21,
    type: '上签',
    title: '李渊登基',
    poem: '阴阳道合总由天，女嫁男婚岂偶然，但看龙蛇相会后，一朝富贵万千年。',
    interpretation: '此签大吉，天作之合。阴阳调和，婚姻美满。龙蛇相遇，富贵千年。',
    career: '事业大成，地位显赫。',
    love: '姻缘天定，婚姻美满。',
    health: '身体康健，精力旺盛。',
    wealth: '财运极佳，富贵可期。'
  },
  {
    id: 22,
    number: 22,
    type: '中签',
    title: '六郎招亲',
    poem: '月光明照耀乾坤，事事营谋渐渐成，若得贵人来接引，荣华富贵自天生。',
    interpretation: '此签渐佳，月光普照。事业渐成，贵人相助。荣华富贵，指日可待。',
    career: '事业顺利，贵人帮助。',
    love: '感情美满，良缘天成。',
    health: '健康状况良好。',
    wealth: '财运渐旺，富贵可期。'
  },
  {
    id: 23,
    number: 23,
    type: '下签',
    title: '怀德求官',
    poem: '名利场中事多磨，前途跋涉路蹉跎，若得贵人来相助，方可脱险出网罗。',
    interpretation: '此签多阻，名利难求。前路崎岖，跋涉艰难。贵人相助，方能脱困。',
    career: '事业艰难，阻力重重。',
    love: '感情不顺，缘分未到。',
    health: '注意休息，避免过劳。',
    wealth: '财运不佳，守成为上。'
  },
  {
    id: 24,
    number: 24,
    type: '中签',
    title: '殷郊遇师',
    poem: '学海无涯苦作舟，勤能补拙莫忧愁，若得名师来指点，功名富贵可营求。',
    interpretation: '此签勤学，终有所成。学海无涯，勤奋为舟。名师指路，功名可求。',
    career: '事业需要学习，提升能力。',
    love: '感情需要经营，多加沟通。',
    health: '注意劳逸结合。',
    wealth: '财运平稳，需要努力。'
  },
  {
    id: 25,
    number: 25,
    type: '中签',
    title: '伯牙访友',
    poem: '知音难觅古今同，若遇良朋事事通，但愿真心常相待，前程万里任君冲。',
    interpretation: '此签交友，贵在真诚。知音难觅，真心相待。良朋相助，前途光明。',
    career: '事业需要朋友帮助。',
    love: '感情需要真心相待。',
    health: '心情舒畅，身体安康。',
    wealth: '财运不错，合作有利。'
  },
  {
    id: 26,
    number: 26,
    type: '上签',
    title: '钟馗捉鬼',
    poem: '正气凛然鬼神钦，驱邪扶正显威名，若得此签多吉庆，家门安乐福禄增。',
    interpretation: '此签大吉，正气护身。驱邪扶正，鬼神敬服。家门安康，福禄双增。',
    career: '事业顺遂，小人退避。',
    love: '感情顺利，家庭和睦。',
    health: '身体健康，百病不侵。',
    wealth: '财运亨通，正财为主。'
  },
  {
    id: 27,
    number: 27,
    type: '中签',
    title: '刘秀走国',
    poem: '风云际会遇明君，文武双全立大勋，若得贵人来接引，荣华富贵自天申。',
    interpretation: '此签际遇，风云际会。遇明主，立大功。贵人相助，富贵天成。',
    career: '事业有机遇，贵人提携。',
    love: '感情顺利，佳偶天成。',
    health: '身体健康，精力充沛。',
    wealth: '财运不错，机遇来临。'
  },
  {
    id: 28,
    number: 28,
    type: '下签',
    title: '李郭同舟',
    poem: '风波浩渺浪滔天，轻舟已过万重山，若得贵人来接引，前途平坦任君前。',
    interpretation: '此签先险后安，风浪虽大，终能度过。贵人相助，前途平坦。',
    career: '事业有惊无险，需要帮助。',
    love: '感情波折，需要坚持。',
    health: '注意安全，小心意外。',
    wealth: '财运平平，谨慎行事。'
  },
  {
    id: 29,
    number: 29,
    type: '上签',
    title: '子仪入赘',
    poem: '宝镜尘埋久未磨，一朝拂拭见山河，光明正大前程远，万事皆成乐几何。',
    interpretation: '此签大吉，宝镜重光。尘封已去，光明重现。前程远大，万事皆成。',
    career: '事业有成，前途光明。',
    love: '感情美满，婚姻幸福。',
    health: '身体康复，精神焕发。',
    wealth: '财运亨通，收入增加。'
  },
  {
    id: 30,
    number: 30,
    type: '中签',
    title: '棋盘大会',
    poem: '劝君切莫向他求，似鹤飞鸿只自游，且守己身安本分，荣华富贵自天修。',
    interpretation: '此签守成，不宜外求。安守本分，自有天佑。知足常乐，富贵自来。',
    career: '事业宜守，不宜变动。',
    love: '感情稳定，知足常乐。',
    health: '身体安康，心态平和。',
    wealth: '财运平稳，知足是福。'
  },
  {
    id: 31,
    number: 31,
    type: '下签',
    title: '狄青削发',
    poem: '不如意事常八九，可与言人无二三，且待时来风送暖，枯木逢春发新颜。',
    interpretation: '此签逆境，不如意多。知音难觅，时运不济。等待时机，枯木逢春。',
    career: '事业低谷，等待转机。',
    love: '感情不顺，缘分未到。',
    health: '注意调养，保持乐观。',
    wealth: '财运不佳，量入为出。'
  },
  {
    id: 32,
    number: 32,
    type: '中签',
    title: '刘备招亲',
    poem: '婚姻前定不由人，有缘千里来相会，若是无缘对面难，且待良缘自天成。',
    interpretation: '此签姻缘，缘分天定。有缘千里相会，无缘对面难逢。顺其自然，良缘自至。',
    career: '事业平稳，需要人脉。',
    love: '姻缘天定，不可强求。',
    health: '健康状况良好。',
    wealth: '财运平稳，顺其自然。'
  },
  {
    id: 33,
    number: 33,
    type: '上签',
    title: '周郎赤壁',
    poem: '火烧赤壁显英雄，文韬武略世无双，若得此签多吉庆，功名富贵任君享。',
    interpretation: '此签大吉，英雄有用武之地。文武双全，功成名就。富贵荣华，指日可待。',
    career: '事业有成，大展宏图。',
    love: '感情美满，郎才女貌。',
    health: '身体健康，精力充沛。',
    wealth: '财运极佳，财源广进。'
  },
  {
    id: 34,
    number: 34,
    type: '中签',
    title: '桃园结义',
    poem: '义气相投结金兰，同心协力创江山，若得此签多吉庆，兄弟情深福寿全。',
    interpretation: '此签结义，情义千金。同心协力，共创大业。兄弟情深，福寿双全。',
    career: '事业需要合作，团队力量。',
    love: '感情需要真诚，义字当先。',
    health: '身体安康，朋友有益。',
    wealth: '财运不错，合作生财。'
  },
  {
    id: 35,
    number: 35,
    type: '下签',
    title: '湘子遇宾',
    poem: '人生如梦几度秋，功名利禄总难留，若得此签须醒悟，回头是岸任君游。',
    interpretation: '此签看破，人生如梦。功名利禄，过眼云烟。醒悟回头，自在逍遥。',
    career: '事业看淡，不必执着。',
    love: '感情随缘，不必强求。',
    health: '心理调适，放下执念。',
    wealth: '财运平平，知足常乐。'
  },
  {
    id: 36,
    number: 36,
    type: '上签',
    title: '湘子得道',
    poem: '功成名就归故里，修得真道入仙班，若得此签多吉庆，荣华富贵享天年。',
    interpretation: '此签大吉，功成圆满。修得正果，位列仙班。荣华富贵，享尽天年。',
    career: '事业大成，功成名就。',
    love: '感情圆满，家庭幸福。',
    health: '身体康健，长寿之相。',
    wealth: '财运极佳，富贵双全。'
  }
];

// 根据编号获取签卡
export function getSignByNumber(num: number): SignCard | undefined {
  return signs.find(s => s.number === num);
}

// 随机抽取一签
export function getRandomSign(): SignCard {
  const index = Math.floor(Math.random() * signs.length);
  return signs[index];
}

// 按类型筛选
export function getSignsByType(type: '上签' | '中签' | '下签'): SignCard[] {
  return signs.filter(s => s.type === type);
}
