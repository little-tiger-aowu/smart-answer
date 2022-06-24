<template>
    <div class="settlement-page" :style="{height:bgHeight}">
        <!-- 用户头像 -->
        <div class="heardBox">
            <img :src="$cookies.get('avatar')" alt="">
        </div>
        <!-- 挑战成功 -->
        <div v-if="$store.state.score >= 80" class="success-page">
            <!-- 此次答题成绩 -->
            <div class="score">{{$store.state.score}}</div>
            <!-- 此次用时 -->
            <div class="time">{{$store.state.duration}}</div>
            <!-- 击败用户数 -->
<!--            <div class="percent">30</div>-->
            <!-- 最佳成绩 -->
            <div class="bestScore">{{ bastScore }}</div>
            <!-- 最佳用时 -->
            <div class="fastestTime">{{ fastestTime }}</div>
            <!-- 最好排名 -->
<!--            <div class="bestRanking">1</div>-->
            <!-- 抽检次数 -->
            <div class="LotterySum">{{ this.$store.state.prizeCount }}</div>
            <!-- 赶快去抽奖 -->
            <img @click="toLottery()" class="lotterBtn" src="../assets/image/lottery.png" alt="">
            <!-- 排行版、返回首页 -->
            <div class="ranking">
                <img @click="LookRanking()" src="../assets/image/ranking.png" alt="">
                <img @click="goHome()" src="../assets/image/goHome.png" alt="">
            </div>
            <!-- 更多奖品 -->
<!--            <img class="more" src="../assets/image/more.png" alt="">-->
        </div>
        <!-- 挑战失败 -->
        <div v-else class="failure-page">
            <!-- 此次答题成绩 -->
            <div class="score">{{$store.state.score}}</div>
            <!-- 此次用时 -->
            <div class="time">{{$store.state.duration}}</div>
            <!-- 最底分 -->
            <div class="lowestScore">80</div>
            <!-- 最佳成绩 -->
            <div class="bestScore">{{ bastScore }}</div>
            <!-- 最佳用时 -->
            <div class="fastestTime">{{ fastestTime }}</div>
            <!-- 最好排名 -->
<!--            <div class="bestRanking">1</div>-->
            <!-- 再试一次 -->
            <img @click="tryAgain()" class="repeat" src="../assets/image/repeat.png" alt="">
            <!-- 排行版、返回首页 -->
            <div class="ranking">
                <img @click="LookRanking()" src="../assets/image/ranking.png" alt="">
                <img @click="goHome()" src="../assets/image/goHome.png" alt="">
            </div>
            <!-- 别灰心 领更多奖品 -->
<!--            <img class="more" src="../assets/image/faMore.png" alt="">-->
        </div>
    </div>

</template>

<script>
    import { getHightScore,getDayanswerSum } from '../api/path'
     export default {
        name: "settlement",
        data(){
            return{
                bastScore:'', // 最好成绩
                fastestTime:'', // 最短时间
                answerNum:0 // 当天答题次数
            }
        },
         mounted() {
            this.getBest()
            this.getDayanswerSum()
         },
         methods:{
            // 去抽奖
            toLottery(){
                if(this.answerNum > 0){
                    this.$router.replace('lottery')
                }else{
                    this.$toast({
                        message:'抽奖次数用完了',
                        type:'fail',
                        duration:1500
                    })
                }

            },
             // 获取当日答题次数
             getDayanswerSum(){
                let params = {
                    openId:this.$cookies.get('openId')
                }
                getDayanswerSum(params).then((res)=>{
                    this.answerNum = res.data
                })
             },
            // 再试一次
            tryAgain(){
                if(this.answerNum >= 2){
                    this.$toast({
                        type:'fail',
                        message:'今天的答题次数用完了，明天再来吧！',
                        duration:1500
                    })
                }else{
                    this.$router.replace('/topic')
                    this.$store.state.score = 0 // 分数清零
                    this.$store.state.duration = 0 // 时间清零
                    this.$store.commit('startWork') // 重新开始计时
                }

            },
            // 排行榜
            LookRanking(){
                this.$toast('暂无数据')
            },
            // 返回首页
            goHome(){
                this.$router.replace('./')
            },
            // 查看用户最高分最快时间
             getBest(){
                let data = {
                    openId:this.$cookies.get('openId')
                }
                getHightScore(data).then((res)=>{
                    this.bastScore = res.data.totalScore
                    this.fastestTime = res.data.totalTime
                })
             }
        }
    }
</script>

<style lang="scss" scoped>
    .settlement-page{
        .heardBox{
            width: 18%;
            position: absolute;
            top: 24%;
            left: 40%;
            img{
                width: 100%;
                border-radius: 50%;
            }
        }
    }
    .success-page{
        height: 100vh;
        width: 100%;
        background-image: url("../assets/image/successful.png");
        background-size: 100% 100%;
        .percent{
            position: absolute;
            top: 39.8%;
            right: 43.7%;
        }
        .LotterySum{
            position: absolute;
            text-align: center;
            width: 15px;
            bottom: 42%;
            left: 46%;
            font-size: 0.8rem;
        }
        .lotterBtn{
            width: 50%;
            height: 5%;
            position: absolute;
            bottom: 35%;
            left: 25%;
        }
    }
    .failure-page{
        height: 100vh;
        width: 100%;
        background-image: url("../assets/image/failure.png");
        background-size: 100% 100%;
        .lowestScore{
            position: absolute;
            top: 40.5%;
            right: 46%;
        }
    }
    .score{
        width: 9vw;
        text-align: center;
        position: absolute;
        top: 33.8%;
        right: 33.5%;
        font-size: 1.4rem;
        color: #fa3f69;
        font-weight: bold;
    }
    .time{
        text-align: center;
        width: 9vw;
        position: absolute;
        top:38%;
        right: 36%;
        font-size: 0.8rem;
        font-weight: bold;
    }
    .bestScore{
        position: absolute;
        bottom: 48%;
        left: 23.5%;
        text-align: end;
        width: 32px;
        font-size: 1.2rem;
        color: #f1bc52;
    }
    .fastestTime{
        position: absolute;
        bottom: 48%;
        left: 44%;
        font-size: 1.2rem;
        color: #f1bc52;
    }
    .bestRanking{
        position: absolute;
        bottom: 50%;
        right: 22%;
    }
    .ranking{
        width: 80%;
        position: absolute;
        bottom: 25%;
        left: 10%;
        display: flex;
        justify-content: space-around;
        img{
            width: 45%;
        }
    }
    .repeat{
        width: 60%;
        position: absolute;
        bottom: 36%;
        left: 20%;
    }
    .more{
        width: 60%;
        position: absolute;
        bottom: 10%;
        left: 20%;
    }
</style>