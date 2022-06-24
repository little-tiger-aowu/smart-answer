<template>
    <div class="lottery-page" >
        <LuckyWheel
                class="luckyImg"
                ref="myLucky"
                width="380px"
                height="350px"
                :prizes="prizes"
                :blocks="blocks"
                :buttons="buttons"
                @start="startCallback"
                @end="endCallback"
        />
        <!-- 奖品展示弹出层 -->
        <van-popup v-model="show">
            <div class="prizeImg">
                <img v-if="index == 0" src="../assets/image/prize/NotWinning.png" alt="">
                <img v-if="index == 1" src="../assets/image/prize/getCleaner.png" alt="">
                <img v-if="index == 5" src="../assets/image/prize/getCable.png" alt="">
                <img v-if="index == 3" src="../assets/image/prize/getCup.png" alt="">
                <img v-if="index == 0" @click="again()" class="again" src="../assets/image/prize/again.png" alt="">
<!--                <img  class="btnPrize" src="../assets/image/prize/draw.png" alt="">-->
                <span v-else>我们的工作人员将与您电话确认收件信息， 为您尽快寄送礼品，敬请期待~</span>
            </div>
        </van-popup>
        <!-- 中奖音效 -->
        <audio ref="audio" class="audio" preload="auto" src="../assets/music/Winning.mp3"></audio>
        <!-- 参与人数 -->
        <div class="playNUm">{{ playerNumber }}</div>
    </div>
</template>

<script>
    import { getPrize,getMyPrize,getPrizeCount } from '../api/path'
    export default {
        name: "lottery",
        data () {
            return {
                blocks: [
                    {
                        padding: '25px',
                        imgs: [
                            {
                                src:require('../assets/image/lotter-border.png'),
                                width: "100%",
                                height: "100%",

                            }
                            ]
                    }
                        ], // 转盘配置
                prizes: [
                    {
                        fonts: [{ text: '谢谢参与', top: '10%',fontSize:'14px',fontColor:'#ef587d' }],
                        background: '#fdfdfd',
                        imgs: [{src: require('../assets/image/prize/face.png'),width:"23%",top:'35%'}]
                    },
                    {
                        fonts: [{ text: '猫咪桌面吸尘器', top: '10%',fontSize:'14px',fontColor:'#ffffff' }],
                        background: '#1431a7',
                        imgs:[{src:require('../assets/image/prize/cleaner.png'),width:"45%",top:'24%'}]
                    },
                    {
                        fonts: [{ text: '谢谢参与', top: '10%',fontSize:'14px',fontColor:'#ef587d' }],
                        background: '#fdfdfd',
                        imgs: [{src: require('../assets/image/prize/face.png'),width:"23%",top:'35%'}]
                    },
                    {
                        fonts: [{ text: '双饮随手玻璃杯', top: '10%',fontSize:'14px',fontColor:'#ef587d' }],
                        background: '#dcdcda',
                        imgs:[{src:require('../assets/image/prize/cup.png'),width:"15%",height:'50%',top:'27%'}]
                    },
                    {
                        fonts: [{ text: '谢谢参与', top: '10%',fontSize:'14px',fontColor:'#ef587d' }],
                        background: '#fdfdfd',
                        imgs: [{src: require('../assets/image/prize/face.png'),width:"23%",top:'35%'}]
                    },
                    {
                        fonts: [{ text: '三合一数据线', top: '10%' ,fontSize:'14px',fontColor:'#ef587d' }],
                        background: '#dcdcda',
                        imgs:[{src:require('../assets/image/prize/cable.png'),width:"45%",top:'32%'}]
                    },
                ], // 转盘配置
                buttons: [
                    {
                        radius: '30px',
                        imgs:
                            [
                                {
                                    src: require('../assets/image/pointer.png'),
                                    width: "120px",
                                    height: "120px",
                                    top:'-65px'
                                }
                            ]
                    },
                ], // 转盘配置
                index:0, // 抽中下标
                show:false,
                playerNumber:0
            }
        },
        mounted() {
            this.participation()
        },
        methods: {
            // 参与人数
            participation(){
                getPrizeCount().then((res)=>{
                    this.playerNumber = res.data
                })
            },
            // 点击抽奖按钮会触发star回调
            startCallback () {
                // 获取抽中的奖品
                let data = {
                    openId:this.$cookies.get('openId')
                }
                getPrize(data).then((result)=>{
                    if(result.data){
                        // 调用抽奖组件的play方法开始游戏
                        this.$refs.myLucky.play()
                        if(result.data.thePrize){
                            this.$refs.audio.play()
                            if(result.data.thePrize.id == 1){
                                this.index = 1
                            }else if(result.data.thePrize.id == 2){
                                this.index = 3
                            }else if(result.data.thePrize.id == 3){
                                this.index = 5
                            }
                        }else{
                            this.index = 0
                        }
                    }else {
                        this.$toast({
                            message:'已经没有抽奖次数了，快去答题获取吧！！！',
                            type:"fail",
                            duration:1500
                        })
                    }
                })

                // 模拟调用接口异步抽奖
                setTimeout(() => {
                    // 调用stop停止旋转并传递中奖索引
                    this.$refs.myLucky.stop(this.index)
                }, 3000)
            },
            // 抽奖结束会触发end回调
            endCallback (prize) {
                this.show = true
            },
            // 再来一次
            again(){
                this.show = false
            },
            // 查看我的奖品
            viewPrize(){
                let params = {
                    openId: this.$cookies.get('openId')
                }
                getMyPrize(params).then((res)=>{
                    if(res.data.id){
                        if(res.data.id == 1){
                            this.index = 1
                        }else if(res.data.id == 2){
                            this.index = 3
                        }else if(res.data.id == 3){
                            this.index = 5
                        }
                        this.show = true
                    }else{
                        this.$toast({
                            message:'暂未中奖',
                            type:'fail',
                            duration:1500
                        })
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .lottery-page{
        height: 100vh;
        width: 100%;
        background-image: url("../assets/image/lotteryBg.png");
        background-size: 100% 100%;
        .luckyImg{
            position: absolute;
            top: 25%;
            left: 4%;
        }
        .total{
            position: absolute;
            bottom: 17%;
            left: 38%;
            font-size: 0.9rem;
        }
        .myPrize{
            position: absolute;
            bottom: 8%;
            left: 10%;
            width: 15%;
        }
        .playNUm{
            width: 40px;
            position: absolute;
            bottom: 13.5%;
            left: 39.5%;
            text-align: center;
            color: white;
            font-weight: bold;
            font-size: 1.3rem;
        }
    }
    .van-popup{
        width: 80%;
        background-color: initial; // initial 默认值
        .prizeImg{
            img{
                width: 100%;
                height: 100%;
            }
            span{
                margin-left: 11%;
               color: white;
               font-size: .6rem;
               display: flex;
                width: 78%;
               justify-content: center;
                text-align: center;
            }
            .again{
                width: 40%;
                position: relative;
                top: -55px;
                left: 30%;
            }
        }

    }

</style>