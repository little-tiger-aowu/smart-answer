<template>
  <div>
    <div class="bgMusic">
      <!-- 音乐暂停和播放 -->
      <div class="img" :class="{ playing: isPlay }" @click="playMusic">
        <img src="../assets/image/musicBtn.png" class="musicBtn" />
      </div>
      <!-- 背景音乐 -->
      <audio ref="audio" class="audio" preload="auto" autoplay loop src="../assets/music/backgroundMusic.mp3"></audio>
    </div>
  </div>
</template>
<script>
export default {
   data() {
      return {
        isPlay:true, // 音乐播放/暂停
      }
   },
   methods: {
    // 音乐播放/暂停
    playMusic() {
      this.isPlay = !this.isPlay // 图片开始/停止旋转
      if (this.isPlay) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    // 解决苹果自动播放问题
    audioAutoPlay() {
      let audio = document.querySelector(".audio");
      // this.isPlay = true;
      audio.play();
      document.removeEventListener("touchstart", this.audioAutoPlay, false);
     },

    },
    mounted() {
      // 自动播放音乐效果，解决微信自动播放问题
      document.addEventListener("touchstart", this.audioAutoPlay, false);
      document.addEventListener("WeixinJSBridgeReady", this.audioAutoPlay, false);
    } 
}
</script>

<style lang="scss" scoped>
.bgMusic {
  // position: relative;
  .musicBtn {
    width: 30px;
    position: absolute;
    left: 20px;
    top: 20px;
    animation-name: move;
    animation-iteration-count: infinite;
    animation-play-state: paused;
    animation-timing-function: linear;
    animation-duration: 3s;
    z-index: 2;
  }
  .img.playing .musicBtn {
    animation-play-state: running;
    -webkit-animation-play-state: running;
  }
@keyframes move {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
@-webkit-keyframes move {
  0% {
    -webkit-transform: rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateZ(360deg);
  }
}
}
</style>