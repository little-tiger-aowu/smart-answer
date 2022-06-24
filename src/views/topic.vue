<template>
    <div class="topic-page">
        <!-- 用户信息 -->
        <div class="userInfo">
            <div class="heardBox">
                <img :src="$cookies.get('avatar')" alt="">
            </div>
            <div class="UserName">
                <div>{{$cookies.get('nickName')}}</div>
                <div>ID：{{ $cookies.get('openId') }}</div>
            </div>
        </div>
        <!-- 当前得分 -->
        <div class="currentScore">{{ score   }}</div>
        <div class="topicSum">第{{topics[topicIndex].stide}}题</div>
        <div class="topicContent">
            <div class="topic-title">
                {{topics[topicIndex].title}}
            </div>
            <div class="topic-options">
                <!-- 单选 -->
                <template v-if="topics[topicIndex].type === 'radio'">
                    <el-radio-group @change.native="check"  v-model="radio1">
                        <el-radio-button v-for="(item,index) in topics[topicIndex].options" :label="index">
                            {{item}}
                        </el-radio-button>
                    </el-radio-group>
                </template>
                <!-- 多选 -->
                <template v-else>
                    <el-checkbox-group  v-if="topicIndex !== 7" v-model="checkboxGroup1">
                        <el-checkbox-button v-for="(item,index) in topics[topicIndex].options" :label="index" :key="index">
                            {{item}}
                        </el-checkbox-button>
                    </el-checkbox-group>
                    <el-checkbox-group class="manyOptions" v-else v-model="checkboxGroup1">
                        <el-checkbox-button v-for="(item,index) in topics[topicIndex].options" :label="index" :key="index">
                            {{item}}
                        </el-checkbox-button>
                    </el-checkbox-group>
                </template>

            </div>
        </div>
        <div class="nextBtn">
            <img  @click="upTopic()" src="../assets/image/upTopic.png" alt="">
            <img  @click="nextTopic()" src="../assets/image/nextTopic.png" alt="">
        </div>
        <!-- 设置点击音效 -->
        <audio ref="audio" class="audio" preload="auto" src="../assets/music/check.mp3"></audio>
    </div>

</template>

<script>
    import { saveDetail } from '../api/path'
    export default {
        name: "topic",
        data(){
            return{
                topicIndex:0, // 当前题目下标
                radio1:'', // 单选框选项
                checkboxGroup1:[], // 多选框选项
                score:0, // 得分
                options:[], // 答案汇总
                decide:[], // 是否回答正确
                topics:[
                    {
                        stide:'一',
                        type:'radio',
                        title:'EyeCGas的检测限是多少？',
                        options:{
                            A:'10mk@25℃',
                            B:'25mk@10℃',
                            C:'15mk@25℃',
                            D:'50mk@20℃',
                        },
                        answer:['A']
                    },
                    {
                        stide:'二',
                        type: 'checkbox',
                        title:'选择OGI相机时，哪些是最需要关注的或最重要的性能参数或指标？（多选）',
                        options:{
                            A:'防爆等级',
                            B:'热灵敏度',
                            C:'防水防尘等级',
                            D:'监测准确度',
                        },
                        answer:['A','B','C']
                    },
                    {
                        stide:'三',
                        type: 'radio',
                        title:'OGI最低能测到多少ppm的有机气体？',
                        options:{
                            A:'0.35g/h甲烷泄漏量',
                            B:'0.22g/h甲烷泄漏量',
                            C:'0.49g/h甲烷泄漏量',
                            D:'0.28g/h甲烷泄漏量',
                        },
                        answer:['A']
                    },
                    {
                        stide:'四',
                        type: 'radio',
                        title:'EyeCGas的防水防尘等级是多少？',
                        options:{
                            A:'IP54',
                            B:'IP55',
                            C:'IP64',
                            D:'IP65',
                        },
                        answer:['D']
                    },
                    {
                        stide:'五',
                        type: 'checkbox',
                        title:'EyeCGas Mini可以观察多少种气体呢？（多选）',
                        options:{
                            A:'CH₄',
                            B:'NH₃',
                            C:'SF6',
                            D:'R134',
                        },
                        answer:['A','B','C','D']
                    },
                    {
                        stide:'六',
                        type: 'checkbox',
                        title:'目前设计气体成像检测VOCs的国家标准或方法有哪些？（多选）',
                        options:{
                            A:'《GB 20950- 2020》',
                            B:'《GB 20951- 2020》',
                            C:'《GB 20952- 2020》',
                            D:'《HJ733-2014》',
                        },
                        answer:['A','B','C','D']
                    },
                    {
                        stide:'七',
                        type: 'radio',
                        title:'赛默飞中国总部位于？',
                        options:{
                            A:'北京',
                            B:'广州',
                            C:'上海',
                            D:'香港',
                        },
                        answer:['C']
                    },
                    {
                        stide:'八',
                        type: 'checkbox',
                        title:'以下哪些是赛默飞化学分析覆盖的领域？（多选）',
                        options:{
                            A:'环境',
                            B:'石化',
                            C:'医疗健康',
                            D:'临床诊断',
                            E:'抗体与细胞分析',
                            F:'钢铁',
                            G:'生物制药',
                            H:'农业'
                        },
                        answer:['A','B','F','G']
                    },
                    {
                        stide:'九',
                        type: 'radio',
                        title:'赛默飞的目标是？',
                        options:{
                            A:'我们携手客户，让世界更美好，更智能，更完善',
                            B:'我们携手客户，让世界更健康，更清洁，更安全',
                            C:'我们携手客户，让世界更繁荣，更强大，更健康',
                            D:'我们携手客户，让世界更智能，更清洁，更辉煌',
                        },
                        answer:['B']
                    },
                    {
                        stide:'十',
                        type: 'radio',
                        title:'赛默飞已进入中国发展超过多少年？',
                        options:{
                            A:'18年',
                            B:'27年',
                            C:'35年',
                            D:'40年',
                        },
                        answer:['D']
                    },
                ], // 题目列表
                createTime:'',
                isDisabled: false,
                issubmit:false
            }
        },
        methods:{
            // 下一题
            nextTopic(){
                // 避免按钮短时间重复点击
                if(this.isDisabled) return false
                this.isDisabled = true
                setTimeout(()=>{
                    this.isDisabled = false
                },500)
                if(this.topics[this.topicIndex].type === 'radio'){
                    this.options.splice(this.topicIndex, 1, this.radio1)
                    let answer = this.topics[this.topicIndex].answer
                    if(answer.indexOf(this.radio1) !== -1){
                        this.decide.splice(this.topicIndex, 1, '1')
                    }else{
                        this.decide.splice(this.topicIndex, 1, '0')
                    }
                }else{
                    this.options.splice(this.topicIndex, 1, this.checkboxGroup1)
                    let answer = this.topics[this.topicIndex].answer
                    if(this.checkboxGroup1.length != answer.length){
                        this.decide.splice(this.topicIndex, 1, '0')
                    }else{
                        let newarr = this.checkboxGroup1.filter((v) => answer.indexOf(v) > -1)
                        if (newarr.length === answer.length){
                            this.decide.splice(this.topicIndex, 1, '1')
                        }else{
                            this.decide.splice(this.topicIndex, 1, '0')
                        }
                    }
                }
                let newScore = 0
                this.decide.forEach((res)=>{
                    if(res === '1'){
                        newScore += 10
                    }
                    this.score = newScore
                })
                if(this.topicIndex >= this.topics.length-1){
                    if (this.issubmit) return false
                    this.issubmit = true
                    this.getTime()
                    this.$store.commit('stopTime')
                    this.$store.state.score = this.score
                    if(this.score >= 80){
                        this.$store.state.prizeCount += 1
                    }
                    let data = {
                        totalScore: this.score.toString(),
                        totalTime: this.$store.state.duration.toString(),
                        rightCount: this.score/10,
                        openId: this.$cookies.get('openId'),
                        createTime: this.createTime
                    }
                    saveDetail(JSON.stringify(data)).then((res)=>{
                        if(res.code == 200){
                            this.$toast.loading({
                                message:'正在结算。。。',
                                duration:1500
                            })
                            setTimeout(()=>{
                                this.$router.replace('settlement')
                            },1500)
                        }
                    })

                }else{
                    console.log(this.radio1)
                    console.log(this.checkboxGroup1)
                    if(this.radio1 || this.checkboxGroup1.length != 0){
                        this.topicIndex ++
                        this.radio1 = ""
                        this.checkboxGroup1 = []
                    }else{
                        this.$toast({
                            message:'未作答！',
                            type:'fail',
                            duration:1200
                        })
                    }

                }
            },
            // 上一题
            upTopic(){
                if(this.topicIndex > 0){
                    this.topicIndex --
                   let types = typeof this.options[this.topicIndex]
                    if(types == 'string'){
                        this.radio1 = this.options[this.topicIndex]
                    }else{
                        this.checkboxGroup1 = this.options[this.topicIndex]
                    }

                }else{
                    console.log('没有上一题了')
                }
            },
            // 获取当前时间
            getTime(){
                let date = new Date();
                let year = date.getFullYear();    //  返回的是年份
                let month = date.getMonth() + 1;  //  返回的月份上个月的月份，记得+1才是当月
                let dates = date.getDate();       //  返回的是几号
                let HH = date.getHours()
                let MM = date.getMinutes()
                let SS = date.getSeconds()
                this.createTime = year + "-" + month + "-" + dates+' '+HH+':'+MM+':'+SS;
            },
            //
            check(){
                this.$refs.audio.play()
            }
    }
    }
</script>

<style lang="scss" scoped>
    .topic-page{
        height: 100vh;
        width: 100%;
        background-image: url("../assets/image/topic.png");
        background-size: 100% 100%;
        .userInfo{
            position: absolute;
            top: 9%;
            left: 7%;
            display: flex;
            .heardBox{
                width: 13%;
                img{
                    width: 100%;
                    border-radius: 50%;
                }
            }
            .UserName{
                margin-left: 10px;
                display: flex;
                justify-content: center;
                flex-direction: column;
                :nth-child(1){
                    font-size: 1.2rem;
                    color: white;
                }
                :nth-child(2){
                    font-size: .7rem;
                    color: #ededed;
                }
            }
        }
        .currentScore{
            position: absolute;
            top: 9%;
            right: 5.3%;
            color: white;
            font-size: 1.5rem;
            /*border: 1px solid;*/
            width: 40px;
            text-align: center;
            font-weight: bold;
        }
        .topicSum{
            position: absolute;
            top: 32%;
            left: 37%;
            width: 26%;
            text-align: center;
            font-size: 1.7rem;
            color: white;
            font-weight: bold;
        }
        .topicContent{
            width: 86%;
            position: absolute;
            left: 7%;
            bottom: 22%;
            .topic-title{
                height: 6vh;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 95%;
                margin: 0 auto 10px;
                text-align: center;
                font-weight: bold;
            }
        }
        .nextBtn{
            position: absolute;
            bottom: 9%;
            left: 10%;
            width: 80%;
            height: 6%;
            display: flex;
            img{
                width: 50%;
                height: 100%;
            }
        }
    }
</style>
<style lang="scss">
    .el-checkbox-group, .el-radio-group{
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         line-height: 8vh;
        .el-checkbox-button,.el-radio-button{
             width: 85%;
         }
        .el-checkbox-button__inner,.el-radio-button__inner{
             width: 100%;
         }
     }
    .el-checkbox-button__inner,.el-radio-button__inner{
        background-color: #ededed;
        border: 0;
        color: black;
        border-radius: 30px !important;
        line-height: 20px;
        height: 7vh;
        font-weight: bold;
        font-size: 1rem;
        padding: 0 5px !important;
        margin: 0.5vh 0;
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: normal;
    }
    .manyOptions{
        display: flex;
        height: 33vh;
        flex-wrap: wrap;
        justify-content: start;
        .el-checkbox-button,{
            width: 43%;
        }
        .el-checkbox-button__inner{
            width: 100%;
        }
    }
</style>