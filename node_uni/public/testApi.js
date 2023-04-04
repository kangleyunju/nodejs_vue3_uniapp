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
      "page_name": "我的世界哈哈哈",
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
  }
}
