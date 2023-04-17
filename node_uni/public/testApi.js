export default {
	//登录
	"user/login": {
		"code": 200,
		"msg": "登录成功",
		"data": {
			"user_id": 10001,
			"name": "admin",
			"password": "123456",
			"nickname": "管理员",
			"birthday": "2023-01-18",
			"sex": 2,
			"face": "https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/48be0378-a264-4492-90e7-0d8f743d555d.jpg",
			"level": 1,
			"create_time": 1642404443745,
			"status": 1,
			"money": 9999,
			"login_time": 1674029473293,
			"is_admin": 1
		}
	},
	//注册
	"user/add": {
		"code": 200,
		"msg": "ok",
		"data": {
			"user_id": 10021,
			"name": "mingzhen",
			"nickname": "mingzhen",
			"birthday": "Invalid date",
			"sex": 0,
			"face": "https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/48be0378-a264-4492-90e7-0d8f743d555d.jpg",
			"level": 1,
			"create_time": 1674030203510,
			"status": 1,
			"money": 0,
			"login_time": 1674030203510,
			"is_admin": 0
		}
	},
	//用户详情
	"user/person": {
		"code": 200,
		"msg": "ok",
		"data": {
			"user_id": 10022,
			"name": "yaxin",
			"nickname": "yaxin",
			"birthday": "Invalid date",
			"sex": 0,
			"face": "https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/48be0378-a264-4492-90e7-0d8f743d555d.jpg",
			"level": 1,
			"create_time": 1674030666994,
			"status": 1,
			"money": 0,
			"login_time": 1674030666995,
			"is_admin": 0
		}
	},
	//用户列表
	"user/list": {
		"code": 200,
		"msg": "ok",
		"data": [{
			"user_id": 10001,
			"name": "admin",
			"nickname": "管理员",
			"birthday": "2023-01-18",
			"sex": 2,
			"face": "https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/48be0378-a264-4492-90e7-0d8f743d555d.jpg",
			"level": 1,
			"create_time": "2022-01-17",
			"status": 1,
			"money": 9999,
			"login_time": "2023-01-18 16:57:08",
			"is_admin": 1
		}, {
			"user_id": 10002,
			"name": "赵云",
			"nickname": "赵子龙",
			"birthday": "2023-01-18",
			"sex": 1,
			"face": null,
			"level": 1,
			"create_time": "2022-01-18",
			"status": 2,
			"money": 988,
			"login_time": "2022-01-18 17:07:14",
			"is_admin": 0
		}],
		"page": 1,
		"row": 2,
		"records": 16,
		"total": 8
	},
	//用户编辑
	"user/edit": {
		"code": 200,
		"msg": "修改成功",
		"data": {
			"user_id": 10001,
			"name": "admin",
			"nickname": "管理员",
			"birthday": "2023-01-18",
			"sex": 2,
			"face": "https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/48be0378-a264-4492-90e7-0d8f743d555d.jpg",
			"level": 1,
			"create_time": "2022-01-17",
			"status": 1,
			"money": 9999,
			"login_time": "2023-01-18 16:57:08",
			"is_admin": 1
		}
	},
	//首页
	"diy/detail": {
		"code": 200,
		"msg": "ok",
		"data": {
			"id": 1,
			"sorts": [{
				"id": 4,
				"sorts": "diy-notice",
				"name": "公告",
				"img_url": "../src/assets/img/left_notice.png",
				"show": true,
				"theme": "warning",
				"notice_direction": "column",
				"notice_icon": true,
				"notice_more": true,
				"marginTop": 0,
				"marginBottom": 0,
				"unique": 1644078688
			}],
			"name": "首页",
			"page_name": "我的世界",
			"path": "/index/index",
			"create_time": 1643782726721,
			"update_time": 1644297777858,
			"background_color": "#FFFFFF"
		}
	},
	//装修保存
	"diy/edit": {
		"code": 200,
		"msg": "ok"
	},
	//商品上架下架
	"good/status": {
		"code": 200,
		"msg": "修改成功",
		"data": {
			"product_id": 1,
			"product_name": "倚天剑0",
			"origin_price": 23,
			"sale_price": 12,
			"product_image": "https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/ddf73800-6f11-4b1e-9ea4-bdfcc399fde9.jpg",
			"product_imgs": "https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/f7ffce35-7358-44cc-a9dd-87f2098602db.jpg",
			"create_time": 1642648475607,
			"update_time": 1674034616717,
			"status": 2,
			"product_desc": "很好的枕头",
			"product_detail": "<p><img src=\"https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/f32295cd-ccc9-479e-a40d-aee11d75e9a7.jpg\" style=\"max-width:100%;\" contenteditable=\"false\"/></p>",
			"store_id": 10001,
			"like": 0
		}
	},
	//商品修改信息
	"good/status": {
		"code": 200,
		"msg": "修改成功",
		"data": {
			"product_id": 1,
			"product_name": "倚天剑0",
			"origin_price": 23,
			"sale_price": 12,
			"product_image": "https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/ddf73800-6f11-4b1e-9ea4-bdfcc399fde9.jpg",
			"product_imgs": "https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/f7ffce35-7358-44cc-a9dd-87f2098602db.jpg",
			"create_time": 1642648475607,
			"update_time": 1674034616717,
			"status": 2,
			"product_desc": "很好的枕头",
			"product_detail": "<p><img src=\"https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/f32295cd-ccc9-479e-a40d-aee11d75e9a7.jpg\" style=\"max-width:100%;\" contenteditable=\"false\"/></p>",
			"store_id": 10001,
			"like": 0
		}
	},
	//我的商品
	"good/my": {
		"code": 200,
		"msg": "ok",
		"data": [{
			"product_id": 1,
			"product_name": "倚天剑0",
			"origin_price": 23,
			"sale_price": 12,
			"product_image": "https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/ddf73800-6f11-4b1e-9ea4-bdfcc399fde9.jpg",
			"product_imgs": "https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/f7ffce35-7358-44cc-a9dd-87f2098602db.jpg",
			"create_time": 1642648475607,
			"update_time": 1674034616717,
			"status": 2,
			"product_desc": "很好的枕头",
			"product_detail": "<p><img src=\"https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/f32295cd-ccc9-479e-a40d-aee11d75e9a7.jpg\" style=\"max-width:100%;\" contenteditable=\"false\"/></p>",
			"store_id": 10001,
			"like": 0
		}],
		"page": 1,
		"row": 1,
		"records": 6,
		"total": 6
	},
	//商品列表
	"good/list": {
		"code": 200,
		"msg": "ok",
		"data": [{
			"product_id": 1,
			"product_name": "倚天剑0",
			"origin_price": 23,
			"sale_price": 12,
			"product_image": "https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/ddf73800-6f11-4b1e-9ea4-bdfcc399fde9.jpg",
			"product_imgs": "https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/f7ffce35-7358-44cc-a9dd-87f2098602db.jpg",
			"create_time": 1642648475607,
			"update_time": 1674034616717,
			"status": 2,
			"product_desc": "很好的枕头",
			"product_detail": "<p><img src=\"https://mp-2503170c-6f74-4217-ac1a-43133fb6d1b4.cdn.bspapp.com/VKCEYUGU-2503170c-6f74-4217-ac1a-43133fb6d1b4/f32295cd-ccc9-479e-a40d-aee11d75e9a7.jpg\" style=\"max-width:100%;\" contenteditable=\"false\"/></p>",
			"store_id": 10001,
			"like": 0
		}],
		"page": 1,
		"row": 1,
		"records": 6,
		"total": 6
	},
	//商品状态
	"good/status": {
		"code": 200,
		"msg": "ok",
		"data": {
			"status": 3
		}
	},
	"diy/test": {
		"code": 200,
		"msg": "ok",
		"data": [{ "covers": { "s": "https:\/\/alcdn.img.xiaoka.tv\/20230112\/fa5\/ac2\/1320511700\/fa5ac2ff6e0bdabfa568d83550911a09.jpg@1e_1c_0o_0l_166h_166w.webp", "m": "https:\/\/alcdn.img.xiaoka.tv\/20230112\/fa5\/ac2\/1320511700\/fa5ac2ff6e0bdabfa568d83550911a09.jpg@1e_1c_0o_0l_332h_332w.webp", "b": "https:\/\/alcdn.img.xiaoka.tv\/20230112\/fa5\/ac2\/1320511700\/fa5ac2ff6e0bdabfa568d83550911a09.jpg@1e_1c_0o_0l_640h_640w.webp" }, "score": 176400, "nickname": "\u6c5f\u57ce.", "imgurl": "https:\/\/alcdn.img.xiaoka.tv\/20221013\/c47\/508\/1320511700\/c47508c66c3d0feaff1b68f23c495b1e.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "avatar": "https:\/\/alcdn.img.xiaoka.tv\/20221013\/c47\/508\/1320511700\/c47508c66c3d0feaff1b68f23c495b1e.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "ytypename": "\u7537\u795e", "ytypevt": 1, "liveurl": "\/l\/BB6KUIYrUKjEJENL.html?p_from=pHome.AnchorSquare", "isliving": 1 },
{ "covers": { "s": "https:\/\/alcdn.img.xiaoka.tv\/20221207\/abe\/6fd\/365749320\/abe6fd22993ffad0263b98d3572870d9.jpg@1e_1c_0o_0l_166h_166w.webp", "m": "https:\/\/alcdn.img.xiaoka.tv\/20221207\/abe\/6fd\/365749320\/abe6fd22993ffad0263b98d3572870d9.jpg@1e_1c_0o_0l_332h_332w.webp", "b": "https:\/\/alcdn.img.xiaoka.tv\/20221207\/abe\/6fd\/365749320\/abe6fd22993ffad0263b98d3572870d9.jpg@1e_1c_0o_0l_640h_640w.webp" }, "score": 3334334, "nickname": "\u5e03\u6717\u5148\u751f~", "imgurl": "https:\/\/alcdn.img.xiaoka.tv\/20220808\/ecc\/6c3\/365749320\/ecc6c3ac7cf516006c44461dae481df6.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "avatar": "https:\/\/alcdn.img.xiaoka.tv\/20220808\/ecc\/6c3\/365749320\/ecc6c3ac7cf516006c44461dae481df6.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "ytypename": "\u5973\u795e", "ytypevt": 1, "liveurl": "\/l\/N7m9Xb6KqtwCIRYM.html?p_from=pHome.AnchorSquare", "isliving": 0 },
{ "covers": { "s": "https:\/\/alcdn.img.xiaoka.tv\/20230302\/661\/a60\/73285194\/661a605587ff2f2e4a1955db7ad4b579.jpg@1e_1c_0o_0l_166h_166w.webp", "m": "https:\/\/alcdn.img.xiaoka.tv\/20230302\/661\/a60\/73285194\/661a605587ff2f2e4a1955db7ad4b579.jpg@1e_1c_0o_0l_332h_332w.webp", "b": "https:\/\/alcdn.img.xiaoka.tv\/20230302\/661\/a60\/73285194\/661a605587ff2f2e4a1955db7ad4b579.jpg@1e_1c_0o_0l_640h_640w.webp" }, "score": 1043034, "nickname": "\ud83d\udc33.\u767d\u5341\u4e00", "imgurl": "https:\/\/alcdn.img.xiaoka.tv\/20201101\/b4e\/4c0\/73285194\/b4e4c0b16064a1b4385b4b3657eda21d.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "avatar": "https:\/\/alcdn.img.xiaoka.tv\/20201101\/b4e\/4c0\/73285194\/b4e4c0b16064a1b4385b4b3657eda21d.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "ytypename": "\u666e\u901a", "ytypevt": 0, "liveurl": "\/l\/hXsjSa4-rm39T9Tj.html?p_from=pHome.AnchorSquare", "isliving": 0 },
{ "covers": { "s": "https:\/\/alcdn.img.xiaoka.tv\/20230204\/70e\/5fe\/354599140\/70e5fe032b77fd7bc662255b520a6c11.jpg@1e_1c_0o_0l_166h_166w.webp", "m": "https:\/\/alcdn.img.xiaoka.tv\/20230204\/70e\/5fe\/354599140\/70e5fe032b77fd7bc662255b520a6c11.jpg@1e_1c_0o_0l_332h_332w.webp", "b": "https:\/\/alcdn.img.xiaoka.tv\/20230204\/70e\/5fe\/354599140\/70e5fe032b77fd7bc662255b520a6c11.jpg@1e_1c_0o_0l_640h_640w.webp" }, "score": 1026700, "nickname": "\u2800\u51af\u5927\u4eba", "imgurl": "https:\/\/alcdn.img.xiaoka.tv\/20220726\/f72\/c58\/354599140\/f72c58fc7270aeffb98bdc9d1bca0a4b.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "avatar": "https:\/\/alcdn.img.xiaoka.tv\/20220726\/f72\/c58\/354599140\/f72c58fc7270aeffb98bdc9d1bca0a4b.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "ytypename": "\u7537\u795e", "ytypevt": 1, "liveurl": "\/l\/0sB_VQOA_VMwfqrx.html?p_from=pHome.AnchorSquare", "isliving": 0 },
{ "covers": { "s": "https:\/\/alcdn.img.xiaoka.tv\/20220930\/219\/a7c\/1410097153\/219a7c47dfede12369630082b150e487.jpg@1e_1c_0o_0l_166h_166w.webp", "m": "https:\/\/alcdn.img.xiaoka.tv\/20220930\/219\/a7c\/1410097153\/219a7c47dfede12369630082b150e487.jpg@1e_1c_0o_0l_332h_332w.webp", "b": "https:\/\/alcdn.img.xiaoka.tv\/20220930\/219\/a7c\/1410097153\/219a7c47dfede12369630082b150e487.jpg@1e_1c_0o_0l_640h_640w.webp" }, "score": 1005334, "nickname": "\u662f\u601d\u601d\u5416\uff5e", "imgurl": "https:\/\/alcdn.img.xiaoka.tv\/20220930\/219\/a7c\/1410097153\/219a7c47dfede12369630082b150e487.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "avatar": "https:\/\/alcdn.img.xiaoka.tv\/20220930\/219\/a7c\/1410097153\/219a7c47dfede12369630082b150e487.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "ytypename": "\u666e\u901a", "ytypevt": 0, "liveurl": "\/l\/fTE758mxvL33UX69.html?p_from=pHome.AnchorSquare", "isliving": 0 },
{ "covers": { "s": "https:\/\/alcdn.img.xiaoka.tv\/20230213\/0fe\/8d3\/1409926538\/0fe8d32ff8111f09a0091b42d7a495ea.jpg@1e_1c_0o_0l_166h_166w.webp", "m": "https:\/\/alcdn.img.xiaoka.tv\/20230213\/0fe\/8d3\/1409926538\/0fe8d32ff8111f09a0091b42d7a495ea.jpg@1e_1c_0o_0l_332h_332w.webp", "b": "https:\/\/alcdn.img.xiaoka.tv\/20230213\/0fe\/8d3\/1409926538\/0fe8d32ff8111f09a0091b42d7a495ea.jpg@1e_1c_0o_0l_640h_640w.webp" }, "score": 1003267, "nickname": "\u4e00\u53ea\u5c0f\u9633\u9633", "imgurl": "https:\/\/alcdn.img.xiaoka.tv\/20221225\/3b8\/7c3\/1409926538\/3b87c3acc8c2479531636f75bec37b9b.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "avatar": "https:\/\/alcdn.img.xiaoka.tv\/20221225\/3b8\/7c3\/1409926538\/3b87c3acc8c2479531636f75bec37b9b.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "ytypename": "\u666e\u901a", "ytypevt": 0, "liveurl": "\/l\/rO0UBkh5B9oWyeHc.html?p_from=pHome.AnchorSquare", "isliving": 0 },
{ "covers": { "s": "https:\/\/alcdn.img.xiaoka.tv\/20230215\/821\/2c4\/1410341929\/8212c46dc3ba9874e882cc0ff73cccf5.jpg@1e_1c_0o_0l_166h_166w.webp", "m": "https:\/\/alcdn.img.xiaoka.tv\/20230215\/821\/2c4\/1410341929\/8212c46dc3ba9874e882cc0ff73cccf5.jpg@1e_1c_0o_0l_332h_332w.webp", "b": "https:\/\/alcdn.img.xiaoka.tv\/20230215\/821\/2c4\/1410341929\/8212c46dc3ba9874e882cc0ff73cccf5.jpg@1e_1c_0o_0l_640h_640w.webp" }, "score": 1001000, "nickname": "\u5355\u8eab\u5c0f\u751c\u751c", "imgurl": "https:\/\/alcdn.img.xiaoka.tv\/20230211\/b42\/b06\/1410341929\/b42b06ffcf2f83b3d5056c758463fc33.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "avatar": "https:\/\/alcdn.img.xiaoka.tv\/20230211\/b42\/b06\/1410341929\/b42b06ffcf2f83b3d5056c758463fc33.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "ytypename": "\u666e\u901a", "ytypevt": 0, "liveurl": "\/l\/EE_i6WKq9rkA89Fz.html?p_from=pHome.AnchorSquare", "isliving": 0 },
{ "covers": { "s": "https:\/\/alcdn.img.xiaoka.tv\/20230204\/70e\/5fe\/354599140\/70e5fe032b77fd7bc662255b520a6c11.jpg@1e_1c_0o_0l_166h_166w.webp", "m": "https:\/\/alcdn.img.xiaoka.tv\/20230204\/70e\/5fe\/354599140\/70e5fe032b77fd7bc662255b520a6c11.jpg@1e_1c_0o_0l_332h_332w.webp", "b": "https:\/\/alcdn.img.xiaoka.tv\/20230204\/70e\/5fe\/354599140\/70e5fe032b77fd7bc662255b520a6c11.jpg@1e_1c_0o_0l_640h_640w.webp" }, "score": 797067, "nickname": "\u2800\u51af\u5927\u4eba", "imgurl": "https:\/\/alcdn.img.xiaoka.tv\/20220726\/f72\/c58\/354599140\/f72c58fc7270aeffb98bdc9d1bca0a4b.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "avatar": "https:\/\/alcdn.img.xiaoka.tv\/20220726\/f72\/c58\/354599140\/f72c58fc7270aeffb98bdc9d1bca0a4b.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "ytypename": "\u7537\u795e", "ytypevt": 1, "liveurl": "\/l\/puZstkOHZg3zOQgV.html?p_from=pHome.AnchorSquare", "isliving": 0 },
{ "covers": { "s": "https:\/\/alcdn.img.xiaoka.tv\/20230308\/ef3\/7b1\/73285194\/ef37b16ca1827c840f09a7a0bbfc0874.jpg@1e_1c_0o_0l_166h_166w.webp", "m": "https:\/\/alcdn.img.xiaoka.tv\/20230308\/ef3\/7b1\/73285194\/ef37b16ca1827c840f09a7a0bbfc0874.jpg@1e_1c_0o_0l_332h_332w.webp", "b": "https:\/\/alcdn.img.xiaoka.tv\/20230308\/ef3\/7b1\/73285194\/ef37b16ca1827c840f09a7a0bbfc0874.jpg@1e_1c_0o_0l_640h_640w.webp" }, "score": 689534, "nickname": "\ud83d\udc33.\u767d\u5341\u4e00", "imgurl": "https:\/\/alcdn.img.xiaoka.tv\/20201101\/b4e\/4c0\/73285194\/b4e4c0b16064a1b4385b4b3657eda21d.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "avatar": "https:\/\/alcdn.img.xiaoka.tv\/20201101\/b4e\/4c0\/73285194\/b4e4c0b16064a1b4385b4b3657eda21d.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "ytypename": "\u666e\u901a", "ytypevt": 0, "liveurl": "\/l\/TRYWqL1vUpAAf0OU.html?p_from=pHome.AnchorSquare", "isliving": 0 },
{ "covers": { "s": "https:\/\/alcdn.img.xiaoka.tv\/20230401\/701\/b7f\/1410344451\/701b7f4146a31e2c9eabc099976175e0.jpg@1e_1c_0o_0l_166h_166w.webp", "m": "https:\/\/alcdn.img.xiaoka.tv\/20230401\/701\/b7f\/1410344451\/701b7f4146a31e2c9eabc099976175e0.jpg@1e_1c_0o_0l_332h_332w.webp", "b": "https:\/\/alcdn.img.xiaoka.tv\/20230401\/701\/b7f\/1410344451\/701b7f4146a31e2c9eabc099976175e0.jpg@1e_1c_0o_0l_640h_640w.webp" }, "score": 532434, "nickname": "\u72af\u56f0\u6ef4\u6d75\u6d75", "imgurl": "https:\/\/alcdn.img.xiaoka.tv\/20230407\/48b\/a18\/1410344451\/48ba182499b3578d28930d6d516c3a04.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "avatar": "https:\/\/alcdn.img.xiaoka.tv\/20230407\/48b\/a18\/1410344451\/48ba182499b3578d28930d6d516c3a04.jpg@1e_1c_0o_0l_72h_72w_100q_1pr.jpg", "ytypename": "\u666e\u901a", "ytypevt": 0, "liveurl": "\/l\/yzzO37jhKQ367x8S.html?p_from=pHome.AnchorSquare", "isliving": 0 }]
	}
}