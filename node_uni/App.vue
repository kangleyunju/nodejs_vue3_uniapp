<script>
  export default {
    methods: {
      checkIsMobile() {
        setTimeout(() => {
          let isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) ? true : false
          let element = document.querySelector("html")
          if (isMobile) {
            element.classList.remove("pc")
          } else {
            element.classList.add("pc")
          }
        }, 0)
      }
    },
    onLaunch: function() {
      this.onLaunch()
      // #ifdef H5
      if (self == top) {
        this.checkIsMobile()
        window.onresize = () => {
          this.checkIsMobile()
        }
      }
      // #endif
    },
    onShow: function() {},
    onHide: function() {},
    onPageNotFound() {
      this.jump('/index/error', 2)
    }
  }
</script>
<style lang="scss">
  body {
    background-color: $grayColor;
    color: #333333;
  }
  html.pc {
    width: 375px;
    background-color: #ddd;
    margin: 0 auto;
    overflow-y: auto;
    uni-app {
      position: relative;
      height: 100%;
    }
    .uni-page-head {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
    }
    .uni-tabbar-bottom {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
    }
    * {
      max-width: 375px;
    }
  }
  body::-webkit-scrollbar,
  .uni-scroll-view::-webkit-scrollbar {
    display: none;
  }
  .xzw_word1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .xzw_word2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .xzw_center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .xzwBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-sizing: border-box;
  }
  .xzwBtn_light {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $mainColor;
    background-color: #fff;
    border: 1px solid $mainColor;
    box-sizing: border-box;
  }
  .xzwBtn_dark {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: $mainColor;
    border: 1px solid $mainColor;
    box-sizing: border-box;
  }
  .bottomContainer {
    box-shadow: 0 -4upx 14upx 0 rgba(229, 229, 229, 0.5);
    padding-bottom: env(safe-area-inset-bottom);
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 0;
    width: 750upx;
    background-color: #FFFFFF;
  }
</style>