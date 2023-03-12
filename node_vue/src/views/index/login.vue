<template>
  <div class="container">
    <el-form ref="login" :model="ruleForm" :rules="rules" class="loginBox">
      <div class="name">后台{{state==1?'登录':'注册'}}</div>
      <el-form-item label="账号" prop="account">
        <el-input placeholder="请输入账号" maxlength="20" type="text" clearable v-model="ruleForm.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" maxlength="20" type="password" clearable v-model="ruleForm.password" />
      </el-form-item>
      <div class="bottom">
        <el-button :type="state==2?'default':'primary'" @click="submitForm(login,1)">登录</el-button>
        <el-button :type="state==1?'default':'primary'" @click="submitForm(login,2)">注册</el-button>
      </div>
    </el-form>
    <canvas id="space"></canvas>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, getCurrentInstance } from "vue";
  import { useRouter } from "vue-router";
  import { ElMessage, ElForm } from "element-plus";
  import { useStore } from "vuex";
  export default defineComponent({
    setup() {
      const that = getCurrentInstance().appContext.config.globalProperties
      const router = useRouter();
      const store = useStore();
      const state = ref(1)
      const ruleForm = reactive({
        account: "admin",
        password: "123456",
      })
      const rules = reactive({
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }, { min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur' }]
      })
      const login = ref < InstanceType < typeof ElForm >> ()
      const submitForm = (formEl: InstanceType < typeof ElForm > | undefined, e) => {
        if (state.value != e) {
          state.value = e
        } else {
          if (!formEl) {
            return
          } else {
            formEl.validate((valid) => {
              if (valid) {
                that.$post(state.value == 1 ? 'user/login' : 'user/add', {
                  name: ruleForm.account,
                  password: ruleForm.password
                }).then((res) => {
                  if (res.code == 200) {
                    store.commit("login", res.data);
                    ElMessage.success(state.value == 1 ? '登录成功' : '注册成功')
                    router.push('/')
                  } else {
                    ElMessage.error(res.msg);
                  }
                })
              }
            })
          }
        }
      }
      return {
        state,
        ruleForm,
        rules,
        login,
        submitForm
      }
    },
    methods: {
      // 设置背景
      setBackGroundImg() {
        window.requestAnimFrame = (function() {
          return window.requestAnimationFrame
        })();
        var canvas = document.getElementById("space");
        var c = canvas.getContext("2d");
        var numStars = 6900;
        var radius = '0.' + Math.floor(Math.random() * 9) + 1;
        var focalLength = canvas.width * 2;
        var warp = 0;
        var centerX, centerY;
        var stars = [],
          star;
        var i;
        var animate = true;
        initializeStars();

        function executeFrame() {
          if (animate) window.requestAnimFrame(executeFrame);
          moveStars();
          drawStars();
        }

        function initializeStars() {
          centerX = canvas.width / 2;
          centerY = canvas.height / 2;
          stars = [];
          for (i = 0; i < numStars; i++) {
            star = {
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              z: Math.random() * canvas.width,
              o: '0.' + Math.floor(Math.random() * 99) + 1
            };
            stars.push(star);
          }
        }

        function moveStars() {
          for (i = 0; i < numStars; i++) {
            star = stars[i];
            star.z--;
            if (star.z <= 0) {
              star.z = canvas.width;
            }
          }
        }

        function drawStars() {
          var pixelX, pixelY, pixelRadius;
          if (canvas.width !== window.innerWidth || canvas.width !== window.innerWidth) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initializeStars();
          }
          if (warp === 0) {
            var grd = c.createRadialGradient(canvas.width, canvas.height, canvas.width, canvas.width, canvas.height, 1000);
            grd.addColorStop(0, "rgba(1, 9, 41, 0.6)");
            grd.addColorStop(1, "rgba(2, 8, 36, 0.6)");
            c.fillStyle = grd;
            c.fillRect(0, 0, canvas.width, canvas.height);
          }
          c.fillStyle = "rgba(209, 255, 255, " + radius + ")";
          for (i = 0; i < numStars; i++) {
            star = stars[i];
            pixelX = (star.x - centerX) * (focalLength / star.z);
            pixelX += centerX;
            pixelY = (star.y - centerY) * (focalLength / star.z);
            pixelY += centerY;
            pixelRadius = 1 * (focalLength / star.z);
            c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
            c.fillStyle = "rgba(209, 255, 255, " + star.o + ")";
          }
        }
        executeFrame();
      }
    },
    mounted() {
      this.setBackGroundImg()
    }
  })
</script>
<style lang="scss">
  body {
    background-color: #f8f8f8;
    overflow: hidden;
  }
  .container {
    .loginBox {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      border-radius: 10px;
      box-shadow: rgba(0, 170, 255, 0.2) 0px 0px 6px 6px;
      padding: 25px 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .name {
        font-size: 24px;
        margin-bottom: 16px;
        width: 100%;
        font-weight: bold;
        text-align: center;
      }
      .el-form-item {
        margin: 0 0 34px;
        .el-input {
          width: 250px;
        }
        .el-form-item__error {
          line-height: 26px;
        }
      }
      .bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0 0;
        .el-button {
          padding: 8px 22px;
          font-size: 16px;
        }
      }
    }
  }
</style>
