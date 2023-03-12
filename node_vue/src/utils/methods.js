import axios from 'axios'
import store from '@/store'
const isDev = true
const baseName = '我的世界' //默认名称
const baseUrl = 'http://localhost:7000' //接口请求地址
const baseWs = 'ws://172.21.151.209:8000' //socket连接地址
const mainColor = '#F52B43' //主题色
// 请求超时时间
axios.defaults.timeout = 10000;
// 请求拦截器
axios.interceptors.request.use(config => {
  // 如果已登录,设置token,此处是用户id,实际开发需要后端返回加密字符串
  if (store.state.userInfo.user_id) {
    config.headers['token'] = store.state.userInfo.user_id
  }
  return config
}, error => {
  return Promise.error(error);
})

// 响应拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error => {
   console.log(error)
  console.log(error.response)
  let back = {
    code: error.response.status,
    msg: error.response.statusText
  }
  if (back.code == 400) {
    back.msg = '错误请求'
  } else if (back.code == 404) {
    back.msg = '接口不存在'
  } else if (back.code >= 500) {
    back.msg = '服务器错误'
  } else if (JSON.stringify(error).includes('timeout')) {
    back.code = 500
    back.msg = '服务器响应超时，请刷新当前页'
  }
  return back
})

function $get(url, params = {}) {
  var link = isDev ? `${baseUrl}/${url}` : `/api${url}`
  return new Promise((resolve, reject) => {
    axios.get(link, {
      params: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

function $post(url, params = {}) {
  var link = isDev ? `${baseUrl}/${url}` : `/api${url}`
  return new Promise((resolve, reject) => {
    axios.post(link, params).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

function $uploadImg(file) {
  let type = file.type;
  let size = file.size / 1024 / 1024;
  let link = isDev ? baseUrl + '/upload' : '/api/upload'
  let typelist = 'image/jpeg, image/png, image/jpg, image/gif'
  return new Promise((resolve, reject) => {
    if (typelist.indexOf(type) === -1) {
      resolve({
        code: 250,
        msg: '上传的图片格式不正确!'
      })
      return;
    }
    if (size > 0.5) {
      resolve({
        code: 250,
        msg: '图片不能大于500kb!'
      })
      return;
    }
    let form = new FormData();
    form.append('file', file);
    axios.post(link, form, {
      headers: {}
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

function md5(code) {
  code = encodeURI(code)
  var password = String.fromCharCode(code.charCodeAt(0) + code.length)
  for (var i = 1; i < code.length; i++) {
    password += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
  }
  return password
}
// 读取缓存
function getStorage(key, type = 1) {
  var res = JSON.parse(localStorage.getItem(md5(key)))
  if (type == 2) {
    if (new Date().getTime() >= res.endTime) {
      res = ''
    }
  }
  return res
}
//设置缓存
function setStorage(key, data) {
  localStorage.setItem(md5(key), JSON.stringify(data))
}
//清除缓存
function removeStorage(key) {
  localStorage.removeItem(md5(key))
}

function changeTime(t) {
  if (!t) {
    t = new Date().getTime()
  }
  let res = {}
  res.year = new Date(t).getFullYear()
  res.month = new Date(t).getMonth() + 1
  res.month = res.month > 9 ? res.month : '0' + res.month
  res.day = new Date(t).getDate()
  res.day = res.day > 9 ? res.day : '0' + res.day
  res.date = res.year + '-' + res.month + '-' + res.day
  return res.date
}
export default {
  baseUrl,
  $get,
  $post,
  $uploadImg,
  getStorage,
  setStorage,
  removeStorage,
  changeTime
}
