-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2023-04-02 23:35:12
-- 服务器版本： 5.7.26
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `test`
--

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL COMMENT '标题',
  `content` longtext COMMENT '内容',
  `create_time` bigint(20) NOT NULL COMMENT '创建时间',
  `update_time` bigint(20) NOT NULL COMMENT '更新时间',
  `author` varchar(255) NOT NULL DEFAULT '平台' COMMENT '作者',
  `like` int(11) NOT NULL DEFAULT '0' COMMENT '收藏',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '状态1开启2禁用',
  `view` int(11) NOT NULL DEFAULT '0' COMMENT '浏览量'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `title`, `content`, `create_time`, `update_time`, `author`, `like`, `status`, `view`) VALUES
(1, 'ggg', '<p>关关雎鸠，在河之洲。窈窕淑女，君子好逑。<br/>参差荇菜，左右流之。窈窕淑女，寤寐求之。<br/>求之不得，寤寐思服。悠哉悠哉，辗转反侧。<br/>参差荇菜，左右采之。窈窕淑女，琴瑟友之。<br/>参差荇菜，左右芼之。窈窕淑女，钟鼓乐之。<br/></p>', 1644158677548, 1678611218463, '平台', 0, 2, 0),
(2, '五胡乱华', '<p>五胡乱华，指在西晋时期塞外众多<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E6%B8%B8%E7%89%A7%E6%B0%91%E6%97%8F/18871\">游牧民族</a>趁西晋八王之乱，国力衰弱之际，陆续建立数个非汉族政权，形成与南方政权对峙的时期。“五胡”主要指<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E5%8C%88%E5%A5%B4\">匈奴</a>、<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E9%B2%9C%E5%8D%91\">鲜卑</a>、<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E7%BE%AF/12062426\">羯</a>、<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E7%BE%8C/297491\">羌</a>、<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E6%B0%90/16693306\">氐</a>五个胡人大部落，但事实上五胡是西晋末各乱华胡人的代表，数目远非五个。</p><p>百余年间，北方各族及汉人在<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E5%8D%8E%E5%8C%97%E5%9C%B0%E5%8C%BA/7596383\">华北地区</a>建立的国家达数十个，强弱不等、大小各异，其中存在时间较长和具有重大影响力的有<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E4%BA%94%E8%83%A1%E5%8D%81%E5%85%AD%E5%9B%BD\">五胡十六国</a>。后北方被前秦统一，中国呈现出前南北朝特征。</p><p>五胡乱华的时间一般从<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E6%88%90%E6%B1%89/830181\">成汉</a>政权和刘氏政权建立（304年）开始算起<sup>&nbsp;[24]</sup><a>&nbsp;</a>&nbsp;，一直到鲜卑北魏统一北方（439年）。581年<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E9%9A%8B%E6%96%87%E5%B8%9D\">隋文帝</a>杨坚建立隋朝，589年灭陈朝，方使中国结束了300年的动乱和分治。</p><p>中国五胡十多个政权中，先有氐族的前秦，后有拓跋鲜卑的北魏统一了整个北方，虽屡经纷争与分裂，最后还是实现了内部整合，并融合了曾经代表正统的南朝，继承了秦汉中央集权超大规模国家形态，奠基了融合胡汉的隋唐大一统王朝。</p>', 1644159610703, 1678418626327, '平台', 0, 1, 0),
(3, '静夜诗1236', '<p>1亲爱的 你今夜在哪里</p><p>你可知道我在想着你</p><p>在这星光闪烁的夜空里</p><p>我在等着你的归期</p><p>亲爱的 你现在在哪里</p><p>你可知道我多么地爱你</p><p>眼前这冰冷孤单的墙壁</p><p>只能看到我一个人的身影</p><p>就让我孤独的歌声唱出想你的诗</p><p>寂寞的音符化作爱你的痴<sup>&nbsp;[2]</sup><a>&nbsp;</a>&nbsp;喊着你的名字我哭醒多少次</p><p>泪水将我昨夜的衣襟沾湿</p><p>（<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E7%8B%AC%E7%99%BD\">独白</a>）</p><p>床前明月光</p><p>疑是地上霜</p><p>举头望明月</p><p>你在我梦想</p><p>就让我孤独的歌声唱出想你的诗</p><p>寂寞的音符化作爱你的痴</p><p>抱着你的问候我甜蜜的奢侈</p><p>你是我的唯一就在今生今世1</p>', 1644398109188, 1678427356224, '平台', 0, 1, 0),
(4, '关雎', '<p>关关雎鸠，在河之洲。窈窕淑女，君子好逑。<br/>参差荇菜，左右流之。窈窕淑女，寤寐求之。<br/>求之不得，寤寐思服。悠哉悠哉，辗转反侧。<br/>参差荇菜，左右采之。窈窕淑女，琴瑟友之。<br/>参差荇菜，左右芼之。窈窕淑女，钟鼓乐之。<br/></p>', 1644398341035, 1680440709019, '平台', 0, 2, 0),
(5, '图片', '<img src=\"http://192.168.0.141:7000/upload/20220210/1644462013022.jpg\" style=\"max-width:100%;\" contenteditable=\"false\"/><img src=\"http://192.168.0.141:7000/upload/20220210/1644462021020.jpg\" style=\"max-width:100%;\" contenteditable=\"false\"/><img src=\"http://192.168.0.141:7000/upload/20220210/1644462028095.jpg\" style=\"max-width:100%;\" contenteditable=\"false\"/>', 1644398357772, 1644485358622, '平台', 0, 1, 0),
(6, '长歌行', '<p>青青园中葵，朝露待日晞。<br/>阳春布德泽，万物生光辉。<br/>常恐秋节至，焜黄华叶衰。<br/>百川东到海，何时复西归？<br/>少壮不努力，老大徒伤悲！</p><p><br/></p>', 1644398372766, 1644462071611, '平台', 0, 1, 0),
(7, '客从远方来', '<p>客从远方来，遗我一端绮。<br/>相去万余里，故人心尚尔。<br/>文采双鸳鸯，裁为合欢被。<br/>著以长相思，缘以结不解。<br/>以胶投漆中，谁能别离此？<br/></p>', 1644398383095, 1644475136441, '平台', 0, 1, 0),
(8, '菊花台', '<p>菊花台</p>', 1678420109298, 1678420109299, '平台', 0, 1, 0),
(9, '论语', '<p>关关雎鸠，在河之洲。窈窕淑女，君子好逑。<br/>参差荇菜，左右流之。窈窕淑女，寤寐求之。<br/>求之不得，寤寐思服。悠哉悠哉，辗转反侧。<br/>参差荇菜，左右采之。窈窕淑女，琴瑟友之。<br/>参差荇菜，左右芼之。窈窕淑女，钟鼓乐之。<br/></p>', 1678427528758, 1678427528758, '平台', 0, 2, 0),
(10, '重启', '<p>关关雎鸠，在河之洲。窈窕淑女，君子好逑。<br/>参差荇菜，左右流之。窈窕淑女，寤寐求之。<br/>求之不得，寤寐思服。悠哉悠哉，辗转反侧。<br/>参差荇菜，左右采之。窈窕淑女，琴瑟友之。<br/>参差荇菜，左右芼之。窈窕淑女，钟鼓乐之。<br/></p>', 1678611289483, 1678611289483, '平台', 0, 2, 0),
(11, '重启', '<p>关关雎鸠，在河之洲。窈窕淑女，君子好逑。<br/>参差荇菜，左右流之。窈窕淑女，寤寐求之。<br/>求之不得，寤寐思服。悠哉悠哉，辗转反侧。<br/>参差荇菜，左右采之。窈窕淑女，琴瑟友之。<br/>参差荇菜，左右芼之。窈窕淑女，钟鼓乐之。<br/></p>', 1678611289485, 1678611289485, '平台', 0, 2, 0);

-- --------------------------------------------------------

--
-- 表的结构 `diy`
--

CREATE TABLE `diy` (
  `id` int(11) NOT NULL,
  `sorts` longtext COMMENT '楼层',
  `name` varchar(255) DEFAULT NULL COMMENT '后台页面名称',
  `page_name` varchar(255) DEFAULT NULL COMMENT '手机顶部标题',
  `path` varchar(255) NOT NULL COMMENT '页面路径',
  `create_time` bigint(20) NOT NULL COMMENT '创建时间',
  `update_time` bigint(20) NOT NULL COMMENT '更新时间',
  `background_color` varchar(255) NOT NULL DEFAULT '#F8F8F8' COMMENT '页面背景色'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `diy`
--

INSERT INTO `diy` (`id`, `sorts`, `name`, `page_name`, `path`, `create_time`, `update_time`, `background_color`) VALUES
(1, '[{\"id\":4,\"sorts\":\"diy-notice\",\"name\":\"公告\",\"img_url\":\"../src/assets/img/left_notice.png\",\"show\":true,\"theme\":\"warning\",\"notice_direction\":\"column\",\"notice_icon\":true,\"notice_more\":true,\"marginTop\":0,\"marginBottom\":0,\"unique\":1644078688}]', '首页', '我的世界哈哈哈', '/index/index', 1643782726721, 1644297777858, '#FFFFFF'),
(4, NULL, '页面名称', '页面标题', '/index/index', 1644304863473, 1644304863474, '#F8F8F8'),
(5, NULL, '页面名称', '页面标题', '/index/index', 1678432347105, 1678432347106, '#F8F8F8'),
(6, NULL, '页面名称', '页面标题', '/index/index', 1678443275083, 1678443275083, '#F8F8F8'),
(7, NULL, '页面名称', '页面标题', '/index/index', 1678443295681, 1678443295681, '#F8F8F8'),
(8, NULL, '页面名称', '页面标题', '/index/index', 1678624607620, 1678624607620, '#F8F8F8');

-- --------------------------------------------------------

--
-- 表的结构 `good`
--

CREATE TABLE `good` (
  `product_id` int(11) NOT NULL COMMENT '商品id',
  `product_name` varchar(255) NOT NULL COMMENT '商品名称',
  `origin_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '原价',
  `sale_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '销售价',
  `product_image` varchar(255) NOT NULL COMMENT '商品主图',
  `product_imgs` longtext COMMENT '商品图片数组',
  `create_time` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint(20) DEFAULT NULL COMMENT '更新时间',
  `status` int(11) DEFAULT '0' COMMENT '商品状态0审核中1审核失败2销售中3下架4删除',
  `product_desc` varchar(255) DEFAULT NULL COMMENT '商品描述',
  `product_detail` varchar(4444) DEFAULT NULL COMMENT '商品详情',
  `store_id` int(11) NOT NULL COMMENT '店铺id',
  `like` int(11) NOT NULL DEFAULT '0' COMMENT '收藏数'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `good`
--

INSERT INTO `good` (`product_id`, `product_name`, `origin_price`, `sale_price`, `product_image`, `product_imgs`, `create_time`, `update_time`, `status`, `product_desc`, `product_detail`, `store_id`, `like`) VALUES
(1, '倚天剑0', '23.00', '12.00', 'http://localhost:7000/upload/20221012/1665557582799.png', 'http://localhost:7000/upload/20221012/1665557582799.png', 1642648475607, 1678612935216, 0, '很好的枕头', '<p><img src=\"http://192.168.0.141:7000/upload/20220210/1644485374775.png\" style=\"max-width:100%;\" contenteditable=\"false\"/></p>', 10001, 0),
(2, '哈哈哈哈', '80.00', '50.00', 'http://localhost:7000/upload/20221012/1665557582799.png', 'http://localhost:7000/upload/20221012/1665557582799.png', 1642650844626, 1678612331251, 0, '', '<p>http://192.168.0.141:3000/upload/20220120/1642650843201.png</p>', 10001, 0),
(3, '水杯', '100.00', '90.00', 'http://localhost:7000/upload/20221012/1665557582799.png', 'http://localhost:7000/upload/20221012/1665557582799.png', 1642650974959, 1644484795024, 2, '哈哈哈哈哈', '', 10001, 0),
(4, '东方文明', '23.00', '12.00', 'http://localhost:7000/upload/20221012/1665557582799.png', 'http://localhost:7000/upload/20221012/1665557582799.png', 1642662110107, 1678435948723, 3, '', '<p><img src=\"http://192.168.0.141:7000/upload/20220210/1644482602027.png\" style=\"max-width:100%;\" contenteditable=\"false\"/></p>', 10001, 0),
(5, '屠龙刀', '23.00', '12.00', 'http://localhost:7000/upload/20221012/1665557582799.png', 'http://localhost:7000/upload/20221012/1665557582799.png', 1642662136154, 1680440726488, 3, '', '<p><img src=\"http://192.168.0.141:7000/upload/20220210/1644485409266.png\" style=\"max-width:100%;\" contenteditable=\"false\"/><br/><img src=\"http://192.168.0.141:7000/upload/20220210/1644485414759.png\" style=\"max-width:100%;\" contenteditable=\"false\"/></p>', 10001, 0),
(6, '中级武器', '89.00', '27.50', 'http://localhost:7000/upload/20221012/1665557582799.png', 'http://localhost:7000/upload/20221012/1665557582799.png', 1642671060944, 1678436639711, 4, '这个是描述', '', 10001, 0),
(7, '绝世好贱', '13.00', '3232.00', 'http://localhost:7000/upload/20221012/1665557582799.png', 'http://localhost:7000/upload/20230310/1678435947670.pnghttp://localhost:7000/upload/20221012/1665557582799.png', 1644485146778, 1680430114367, 0, '这是上皮你描述', '<p><br/></p><img src=\"http://192.168.0.141:7000/upload/20220210/1644485134369.jpg\" style=\"max-width:100%;\" contenteditable=\"false\"/>', 10001, 0),
(8, '126', '4.00', '6.00', 'http://localhost:7000/upload/20221012/1665557582799.png', 'http://localhost:7000/upload/20221012/1665557582799.png', 1678435616686, 1678436047288, 3, '哈哈哈', '<p>7777</p>', 10001, 0);

-- --------------------------------------------------------

--
-- 表的结构 `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL COMMENT '订单id',
  `order_no` varchar(255) DEFAULT NULL COMMENT '订单编号',
  `product_name` varchar(255) DEFAULT NULL COMMENT '商品名称',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `user_name` varchar(255) DEFAULT NULL COMMENT '用户名称',
  `product_image` varchar(255) DEFAULT NULL COMMENT '商品名称',
  `pay_money` decimal(10,2) DEFAULT NULL COMMENT '付款金额',
  `create_time` bigint(20) DEFAULT NULL COMMENT '下单时间',
  `pay_time` bigint(20) DEFAULT NULL COMMENT '付款时间',
  `send_time` bigint(20) DEFAULT NULL COMMENT '发货时间',
  `receive_time` bigint(20) DEFAULT NULL COMMENT '收货时间',
  `order_status` int(11) DEFAULT '1' COMMENT '订单状态1待付款2待发货3待收货4待评价5完成6退款中7退款完成',
  `store_id` int(11) DEFAULT NULL COMMENT '店铺id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `orders`
--

INSERT INTO `orders` (`order_id`, `order_no`, `product_name`, `user_id`, `user_name`, `product_image`, `pay_money`, `create_time`, `pay_time`, `send_time`, `receive_time`, `order_status`, `store_id`) VALUES
(1, '123456', '苹果', 10001, '张飞', 'http://localhost:7000/upload/20221012/1665557582799.png', '23.00', 1665557582799, 1665557582799, 1665557582799, 1665557582799, 1, 10001);

-- --------------------------------------------------------

--
-- 表的结构 `sys`
--

CREATE TABLE `sys` (
  `isReview` tinyint(1) NOT NULL DEFAULT '0' COMMENT '商品是否需要审核0不需要1需要',
  `id` int(1) NOT NULL DEFAULT '1',
  `isWxLogin` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否启用微信登录0不启用1启用',
  `avatar` varchar(255) DEFAULT NULL COMMENT '用户默认头像'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `sys`
--

INSERT INTO `sys` (`isReview`, `id`, `isWxLogin`, `avatar`) VALUES
(1, 1, 1, 'http://localhost:7000/upload/20221012/1665557582799.png');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `name` varchar(11) NOT NULL COMMENT '账号',
  `password` varchar(18) NOT NULL COMMENT '密码',
  `nickname` varchar(255) DEFAULT NULL COMMENT '昵称,默认同账号名',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `sex` int(11) NOT NULL DEFAULT '0' COMMENT '性别0未知1男2女',
  `face` varchar(255) DEFAULT NULL COMMENT '头像',
  `level` int(11) NOT NULL DEFAULT '1' COMMENT '用户等级',
  `create_time` bigint(20) DEFAULT '0' COMMENT '注册时间',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '用户状态1正常2封号',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '余额',
  `login_time` bigint(20) DEFAULT NULL COMMENT '登录时间',
  `is_admin` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否管理员0不是1是'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`user_id`, `name`, `password`, `nickname`, `birthday`, `sex`, `face`, `level`, `create_time`, `status`, `money`, `login_time`, `is_admin`) VALUES
(10001, 'admin', '123456', '管理员', '2001-09-09', 2, 'http://localhost:7000/upload/20221012/1665557582799.png', 1, 1642404443745, 1, '9999.00', 1680433815693, 1),
(10002, '赵云', '123456', '赵子龙', '1995-03-01', 1, 'http://localhost:7000/upload/20221012/1665557582799.png', 1, 1642496834856, 2, '988.00', 1642496834856, 0),
(10004, '孙权', '123456', '孙十万', '1974-01-19', 1, 'http://localhost:7000/upload/20221012/1665557582799.png', 1, 1642404443745, 2, '0.00', 1642564195390, 0),
(10005, '曹操', '123456', '曹老板', '2022-01-18', 0, 'http://localhost:7000/upload/20221012/1665557582799.png', 1, 1642408001673, 1, '0.00', 1678610495638, 0),
(10006, '刘备', '123456', '于和伟', '2022-01-18', 0, 'http://localhost:7000/upload/20221012/1665557582799.png', 1, 1642408341760, 1, '0.00', NULL, 0),
(10007, '张飞', '123456', '透明骷髅', '2022-01-18', 0, 'http://localhost:7000/upload/20221012/1665557582799.png', 1, 1642408389702, 1, '99.00', NULL, 0),
(10008, '关羽', '123456', '关过江', '2022-01-18', 0, 'http://localhost:7000/upload/20221012/1665557582799.png', 1, 1642412301593, 2, '0.00', NULL, 0);

--
-- 转储表的索引
--

--
-- 表的索引 `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- 表的索引 `diy`
--
ALTER TABLE `diy`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- 表的索引 `good`
--
ALTER TABLE `good`
  ADD PRIMARY KEY (`product_id`) USING BTREE;

--
-- 表的索引 `sys`
--
ALTER TABLE `sys`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`) USING BTREE;

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `article`
--
ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 使用表AUTO_INCREMENT `diy`
--
ALTER TABLE `diy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- 使用表AUTO_INCREMENT `good`
--
ALTER TABLE `good`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id', AUTO_INCREMENT=9;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id', AUTO_INCREMENT=10009;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
