<template>
    <div class="login-page">
<!--        <img @click="show = true" class="rule" src="../assets/image/explain.png" alt="">-->
<!--        <van-overlay :show="show" @click="show = false">-->
<!--            <div class="ruleBox">-->
<!--                <img class="ruleImg" src="../assets/image/explain.png" alt="">-->
<!--                <img class="ruleBorder" src="../assets/image/relu1-border.png" alt="">-->
<!--                <img class="ruleImg2" src="../assets/image/set.png" alt="">-->
<!--                <img class="ruleBorder2" src="../assets/image/relu2-border.png" alt="">-->
<!--            </div>-->
<!--        </van-overlay>-->
        <img class="login" @click="startButton()" src="../assets/image/start-btn.png" alt="">
    </div>
</template>

<script>
    import { userLogin } from '../api/path'
    export default {
        name: "login",
        data(){
            return{
                openId: this.$route.query.openId || "", //获取openid
                avatar: this.$route.query.avatar || "",
                nickName: this.$route.query.nickname || "",
                show: false,
            }
        },
        created() {
            // this.getOpenId()
        },
        methods:{
            // 获取openId
            getOpenId() {
                if (this.openId) {
                    this.$cookies.set("openId", this.openId);
                    this.$cookies.set("avatar", this.avatar);
                    this.$cookies.set("nickName", this.nickName);
                    this.userLogin()
                } else {
                    // window.location.href =
                    //     "http://wx.oauth.synconize.com/wechat/oauth/?appId=wxfb99f0fc1ca20ac0&redirectUrl=http://192.168.0.105:8080/";
                    window.location.href =
                        "http://wx.oauth.synconize.com/wechat/oauth/?appId=wxfb99f0fc1ca20ac0&redirectUrl=http://new-answer.cdn-static.synconize.com/";
                }
            },
            // 微信授权登录
            userLogin() {
                let data = {
                    openId: this.openId,
                    avatar: this.avatar,
                    nickName: this.nickName,
                    userState:{},
                };
                userLogin(data)
                    .then((result) => {
                        if (result.code === 200) {
                            this.userState = result.data
                            this.$store.state.prizeCount = result.data.prizeNum
                            this.$toast({
                                type: "success",
                                message: "登录成功",
                                duration: 1500,
                            });
                        }
                    })
                    .catch((err) => {});
            },
            // 开始答题
            startButton(){
                if(this.userState.isPrize == 1){
                    this.$dialog.alert({
                        message:'您已抽中奖品，无法继续参与答题',
                    }).then(()=>{

                    })
                }else {
                    if(this.userState.isInput){
                        if(this.userState.answerCount < 2){
                            this.$dialog.alert({
                                message: '您已填写过表单，可以开始答题了',
                            }).then(()=>{
                                this.$store.commit('startWork')
                                this.$router.replace('/topic')
                            })
                        }else{
                            if(this.userState.prizeNum > 0){
                                   this.$dialog.confirm({
                                       message:'您今天的答题次数已用完啦！明天再来吧',
                                       cancelButtonText:'去抽奖',
                                   }).then(()=>{

                                   }).catch(()=>{
                                        this.$router.replace('/lottery')
                                   })
                            }else{
                                this.$toast({
                                    message:"您今天的答题次数已用完啦！明天再来吧",
                                    type:'fail',
                                    duration:1500
                                })
                            }

                        }
                    }else{
                        this.$router.push('/form')
                    }
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .login-page{
        height: 135vh;
        width: 100%;
        background-image: url("../assets/image/login.png");
        background-repeat: no-repeat;
        overflow: scroll;
        background-size: 100% 100%;
        .login{
            width: 40%;
            position: absolute;
            bottom: -30%;
            margin: 0 30%;
            left: 0;
        }
    }
</style>