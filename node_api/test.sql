/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 10/02/2022 18:09:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '内容',
  `create_time` bigint(0) NOT NULL COMMENT '创建时间',
  `update_time` bigint(0) NOT NULL COMMENT '更新时间',
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '平台' COMMENT '作者',
  `like` int(0) NOT NULL DEFAULT 0 COMMENT '收藏',
  `status` int(0) NOT NULL DEFAULT 1 COMMENT '状态1开启2禁用',
  `view` int(0) NOT NULL DEFAULT 0 COMMENT '浏览量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, '登高', '<p><font style=\"background-color: rgb(70, 172, 200);\" color=\"#eeece0\">风急天高猿啸哀，渚清沙白鸟飞回。<br/>无边落木萧萧下，不尽长江滚滚来。<br/>万里悲秋常作客，百年多病独登台。<br/>艰难苦恨繁霜鬓，潦倒新停浊酒杯。</font></p>', 1644158677548, 1644485297393, '平台', 0, 2, 0);
INSERT INTO `article` VALUES (2, '五胡乱华', '<p>五胡乱华，指在西晋时期塞外众多<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E6%B8%B8%E7%89%A7%E6%B0%91%E6%97%8F/18871\">游牧民族</a>趁西晋八王之乱，国力衰弱之际，陆续建立数个非汉族政权，形成与南方政权对峙的时期。“五胡”主要指<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E5%8C%88%E5%A5%B4\">匈奴</a>、<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E9%B2%9C%E5%8D%91\">鲜卑</a>、<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E7%BE%AF/12062426\">羯</a>、<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E7%BE%8C/297491\">羌</a>、<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E6%B0%90/16693306\">氐</a>五个胡人大部落，但事实上五胡是西晋末各乱华胡人的代表，数目远非五个。</p><p>百余年间，北方各族及汉人在<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E5%8D%8E%E5%8C%97%E5%9C%B0%E5%8C%BA/7596383\">华北地区</a>建立的国家达数十个，强弱不等、大小各异，其中存在时间较长和具有重大影响力的有<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E4%BA%94%E8%83%A1%E5%8D%81%E5%85%AD%E5%9B%BD\">五胡十六国</a>。后北方被前秦统一，中国呈现出前南北朝特征。</p><p>五胡乱华的时间一般从<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E6%88%90%E6%B1%89/830181\">成汉</a>政权和刘氏政权建立（304年）开始算起<sup>&nbsp;[24]</sup><a>&nbsp;</a>&nbsp;，一直到鲜卑北魏统一北方（439年）。581年<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E9%9A%8B%E6%96%87%E5%B8%9D\">隋文帝</a>杨坚建立隋朝，589年灭陈朝，方使中国结束了300年的动乱和分治。</p><p>中国五胡十多个政权中，先有氐族的前秦，后有拓跋鲜卑的北魏统一了整个北方，虽屡经纷争与分裂，最后还是实现了内部整合，并融合了曾经代表正统的南朝，继承了秦汉中央集权超大规模国家形态，奠基了融合胡汉的隋唐大一统王朝。</p>', 1644159610703, 1644475324841, '平台', 0, 1, 0);
INSERT INTO `article` VALUES (3, '静夜诗', '<p>亲爱的 你今夜在哪里</p><p>你可知道我在想着你</p><p>在这星光闪烁的夜空里</p><p>我在等着你的归期</p><p>亲爱的 你现在在哪里</p><p>你可知道我多么地爱你</p><p>眼前这冰冷孤单的墙壁</p><p>只能看到我一个人的身影</p><p>就让我孤独的歌声唱出想你的诗</p><p>寂寞的音符化作爱你的痴<sup>&nbsp;[2]</sup><a>&nbsp;</a>&nbsp;喊着你的名字我哭醒多少次</p><p>泪水将我昨夜的衣襟沾湿</p><p>（<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E7%8B%AC%E7%99%BD\">独白</a>）</p><p>床前明月光</p><p>疑是地上霜</p><p>举头望明月</p><p>你在我梦想</p><p>就让我孤独的歌声唱出想你的诗</p><p>寂寞的音符化作爱你的痴</p><p>抱着你的问候我甜蜜的奢侈</p><p>你是我的唯一就在今生今世</p>', 1644398109188, 1644475273598, '平台', 0, 1, 0);
INSERT INTO `article` VALUES (4, '关雎', '<p>关关雎鸠，在河之洲。窈窕淑女，君子好逑。<br/>参差荇菜，左右流之。窈窕淑女，寤寐求之。<br/>求之不得，寤寐思服。悠哉悠哉，辗转反侧。<br/>参差荇菜，左右采之。窈窕淑女，琴瑟友之。<br/>参差荇菜，左右芼之。窈窕淑女，钟鼓乐之。<br/></p>', 1644398341035, 1644461923859, '平台', 0, 1, 0);
INSERT INTO `article` VALUES (5, '图片', '<img src=\"http://192.168.0.141:7000/upload/20220210/1644462013022.jpg\" style=\"max-width:100%;\" contenteditable=\"false\"/><img src=\"http://192.168.0.141:7000/upload/20220210/1644462021020.jpg\" style=\"max-width:100%;\" contenteditable=\"false\"/><img src=\"http://192.168.0.141:7000/upload/20220210/1644462028095.jpg\" style=\"max-width:100%;\" contenteditable=\"false\"/>', 1644398357772, 1644485358622, '平台', 0, 1, 0);
INSERT INTO `article` VALUES (6, '长歌行', '<p>青青园中葵，朝露待日晞。<br/>阳春布德泽，万物生光辉。<br/>常恐秋节至，焜黄华叶衰。<br/>百川东到海，何时复西归？<br/>少壮不努力，老大徒伤悲！</p><p><br/></p>', 1644398372766, 1644462071611, '平台', 0, 1, 0);
INSERT INTO `article` VALUES (7, '客从远方来', '<p>客从远方来，遗我一端绮。<br/>相去万余里，故人心尚尔。<br/>文采双鸳鸯，裁为合欢被。<br/>著以长相思，缘以结不解。<br/>以胶投漆中，谁能别离此？<br/></p>', 1644398383095, 1644475136441, '平台', 0, 1, 0);

-- ----------------------------
-- Table structure for diy
-- ----------------------------
DROP TABLE IF EXISTS `diy`;
CREATE TABLE `diy`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `sorts` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '楼层',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '后台页面名称',
  `page_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机顶部标题',
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '页面路径',
  `create_time` bigint(0) NOT NULL COMMENT '创建时间',
  `update_time` bigint(0) NOT NULL COMMENT '更新时间',
  `background_color` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '#F8F8F8' COMMENT '页面背景色',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of diy
-- ----------------------------
INSERT INTO `diy` VALUES (1, '[{\"id\":4,\"sorts\":\"diy-notice\",\"name\":\"公告\",\"img_url\":\"../src/assets/img/left_notice.png\",\"show\":true,\"theme\":\"warning\",\"notice_direction\":\"column\",\"notice_icon\":true,\"notice_more\":true,\"marginTop\":0,\"marginBottom\":0,\"unique\":1644078688}]', '首页', '我的世界哈哈哈', '/index/index', 1643782726721, 1644297777858, '#FFFFFF');
INSERT INTO `diy` VALUES (2, NULL, NULL, NULL, '', 1644151012398, 1644151012399, '#F8F8F8');
INSERT INTO `diy` VALUES (3, NULL, NULL, NULL, '', 1644151971100, 1644151971100, '#F8F8F8');
INSERT INTO `diy` VALUES (4, NULL, '页面名称', '页面标题', '/index/index', 1644304863473, 1644304863474, '#F8F8F8');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `product_id` int(0) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `product_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `origin_price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '原价',
  `sale_price` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '销售价',
  `product_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品主图',
  `product_imgs` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '商品图片数组',
  `create_time` bigint(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint(0) NULL DEFAULT NULL COMMENT '更新时间',
  `status` int(0) NULL DEFAULT 0 COMMENT '商品状态0审核中1审核失败2销售中3下架4删除',
  `product_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品描述',
  `product_detail` varchar(4444) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品详情',
  `store_id` int(0) NOT NULL COMMENT '店铺id',
  `like` int(0) NOT NULL DEFAULT 0 COMMENT '收藏数',
  PRIMARY KEY (`product_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (1, '倚天剑', 23.00, 12.00, 'http://192.168.0.141:7000/upload/20220210/1644484488127.jpg', 'http://192.168.0.141:7000/upload/20220210/1644484488127.jpg,http://192.168.0.141:7000/upload/20220210/1644484486004.png', 1642648475607, 1644485437896, 0, '很好的枕头', '<p><img src=\"http://192.168.0.141:7000/upload/20220210/1644485374775.png\" style=\"max-width:100%;\" contenteditable=\"false\"/></p>', 10001, 0);
INSERT INTO `goods` VALUES (2, '哈哈哈哈', 80.00, 50.00, '', NULL, 1642650844626, 1644484788070, 2, '', 'http://192.168.0.141:3000/upload/20220120/1642650843201.png', 10001, 0);
INSERT INTO `goods` VALUES (3, '水杯', 100.00, 90.00, '', NULL, 1642650974959, 1644484795024, 2, '哈哈哈哈哈', '', 10001, 0);
INSERT INTO `goods` VALUES (4, '东方文明', 23.00, 12.00, 'http://192.168.0.141:7000/upload/20220210/1644483229741.jpg', 'http://192.168.0.141:7000/upload/20220210/1644483229741.jpg', 1642662110107, 1644484825912, 2, '', '<p><img src=\"http://192.168.0.141:7000/upload/20220210/1644482602027.png\" style=\"max-width:100%;\" contenteditable=\"false\"/></p>', 10001, 0);
INSERT INTO `goods` VALUES (5, '屠龙刀', 23.00, 12.00, 'http://192.168.0.141:7000/upload/20220210/1644484366971.jpg', 'http://192.168.0.141:7000/upload/20220210/1644484366971.jpg,http://192.168.0.141:7000/upload/20220210/1644484365167.png', 1642662136154, 1644486603729, 0, '', '<p><img src=\"http://192.168.0.141:7000/upload/20220210/1644485409266.png\" style=\"max-width:100%;\" contenteditable=\"false\"/><br/><img src=\"http://192.168.0.141:7000/upload/20220210/1644485414759.png\" style=\"max-width:100%;\" contenteditable=\"false\"/></p>', 10019, 0);
INSERT INTO `goods` VALUES (6, '中级武器', 89.00, 27.50, 'http://192.168.0.141:7000/upload/20220210/1644484851100.jpg', 'http://192.168.0.141:7000/upload/20220210/1644484851100.jpg', 1642671060944, 1644484852598, 0, '这个是描述', '', 10001, 0);
INSERT INTO `goods` VALUES (7, '绝世好贱', 13.00, 3232.00, 'http://192.168.0.141:7000/upload/20220210/1644484896128.jpg', 'http://192.168.0.141:7000/upload/20220210/1644484896128.jpg,http://192.168.0.141:7000/upload/20220210/1644484890257.png,http://192.168.0.141:7000/upload/20220210/1644484892145.jpg,http://192.168.0.141:7000/upload/20220210/1644484894367.jpg', 1644485146778, 1644486487634, 2, '这是上皮你描述', '<p><br/></p><img src=\"http://192.168.0.141:7000/upload/20220210/1644485134369.jpg\" style=\"max-width:100%;\" contenteditable=\"false\"/>', 10001, 0);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `order_id` int(0) NOT NULL COMMENT '订单id',
  `order_no` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '订单编号',
  `product_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品名称',
  `user_id` int(0) NULL DEFAULT NULL COMMENT '用户id',
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名称',
  `product_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品名称',
  `pay_money` decimal(10, 2) NULL DEFAULT NULL COMMENT '付款金额',
  `create_time` bigint(0) NULL DEFAULT NULL COMMENT '下单时间',
  `pay_time` bigint(0) NULL DEFAULT NULL COMMENT '付款时间',
  `send_time` bigint(0) NULL DEFAULT NULL COMMENT '发货时间',
  `receive_time` bigint(0) NULL DEFAULT NULL COMMENT '收货时间',
  `order_status` int(0) NULL DEFAULT 1 COMMENT '订单状态',
  `store_id` int(0) NULL DEFAULT NULL COMMENT '店铺id'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for sys
-- ----------------------------
DROP TABLE IF EXISTS `sys`;
CREATE TABLE `sys`  (
  `isReview` int(0) NOT NULL DEFAULT 0 COMMENT '商品是否需要审核0不需要1需要',
  `isWxLogin` int(0) NOT NULL DEFAULT 0 COMMENT '是否开启维系互联登录0关闭1打开',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户默认头像'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of sys
-- ----------------------------
INSERT INTO `sys` VALUES (1, 0, 'http://192.168.0.141:7000/upload/20220210/1644462426127.jpg');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(0) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `name` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '账号',
  `password` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '昵称,默认同账号名',
  `birthday` date NULL DEFAULT NULL COMMENT '生日',
  `sex` int(0) NOT NULL DEFAULT 0 COMMENT '性别0未知1男2女',
  `face` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `level` int(0) NOT NULL DEFAULT 1 COMMENT '用户等级',
  `create_time` bigint(0) NULL DEFAULT 0 COMMENT '注册时间',
  `status` int(0) NOT NULL DEFAULT 1 COMMENT '用户状态1正常2封号',
  `money` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '余额',
  `login_time` bigint(0) NULL DEFAULT NULL COMMENT '登录时间',
  `is_admin` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否管理员0不是1是',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10019 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (10001, 'admin', '123456', '管理员', '1995-03-24', 2, 'http://192.168.0.141:7000/upload/20220210/1644467133947.jpg', 1, 1642404443745, 1, 9999.00, 1644487589559, 1);
INSERT INTO `user` VALUES (10002, '赵云', '123456', '赵子龙', '1995-03-01', 1, NULL, 1, 1642496834856, 2, 988.00, 1642496834856, 0);
INSERT INTO `user` VALUES (10004, '孙权', '123456', '孙权', '1974-01-19', 1, 'http://192.168.0.141:7000/upload/20220119/1642584704802.png', 1, 1642404443745, 2, 0.00, 1642564195390, 0);
INSERT INTO `user` VALUES (10005, '曹操', '123456', '曹老板', '2022-01-18', 0, NULL, 1, 1642408001673, 1, 0.00, 1642496761550, 0);
INSERT INTO `user` VALUES (10006, '刘备', '123456', '于和伟', '2022-01-18', 0, NULL, 1, 1642408341760, 1, 0.00, NULL, 0);
INSERT INTO `user` VALUES (10007, '张飞', '123456', '透明骷髅', '2022-01-18', 0, NULL, 1, 1642408389702, 1, 0.00, NULL, 0);
INSERT INTO `user` VALUES (10008, '关羽', '123456', '大刀', '2022-01-18', 0, 'http://192.168.0.141:7000/upload/20220119/1642584704802.png', 1, 1642412301593, 2, 0.00, NULL, 0);
INSERT INTO `user` VALUES (10009, 'Lib豆', '123456', '小吴', '2022-01-18', 2, 'http://192.168.0.141:7000/upload/20220119/1642584704802.png', 1, 1642412551044, 1, 4.00, NULL, 0);
INSERT INTO `user` VALUES (10010, '小红帽', '123456', '灰太狼', '2022-01-18', 0, NULL, 1, 1642412564266, 1, 0.00, 1642499465631, 0);
INSERT INTO `user` VALUES (10012, '周瑜', '123456', '小乔的丈夫', '2006-01-18', 2, 'http://192.168.0.141:7000/upload/20220119/1642584704802.png', 1, 1642473582938, 1, 0.00, 1642669275189, 0);
INSERT INTO `user` VALUES (10015, '黄盖', '123456', '黄盖', '1995-03-01', 1, NULL, 1, 1642496834856, 2, 0.00, 1642496834856, 0);
INSERT INTO `user` VALUES (10016, '程普', '12345', '程普', NULL, 0, NULL, 1, 1643526922568, 1, 0.00, 1643526922568, 0);
INSERT INTO `user` VALUES (10019, '孙悟空', '123456', '孙悟空1', '2010-10-07', 0, 'http://192.168.0.141:7000/upload/20220210/1644462426127.jpg', 1, 1644486578785, 1, 0.00, 1644486578785, 0);

SET FOREIGN_KEY_CHECKS = 1;
