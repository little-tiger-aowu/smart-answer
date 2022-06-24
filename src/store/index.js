import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    duration:0, // 所用时长
    timer:null,  // 计时器
    score:0, // 得分
    id:0, // 用户ID
    prizeCount:0 //抽奖次数
  },
  mutations: {
    startWork:function (state) {
      let s = 0
      let ms = 0
      state.timer = setInterval(()=>{
        ms ++
        if(ms > 60){
          s ++
          ms = 0
        }
        if(s<10){
          if(ms < 10){
            state.duration = '0'+s+'.'+'0'+ms;
          }else{
            state.duration = '0'+s+'.'+ms;
          }
        }else{
          if(ms < 10){
            state.duration = s+'.'+'0'+ms;
          }else{
            state.duration = s+'.'+ms;
          }
        }
      },100)
    },
    stopTime: function (state) {
      clearInterval(state.timer)
    }
  },
  actions: {

  },
  modules: {

  }
})
