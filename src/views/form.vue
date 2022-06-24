<template>
    <div class="form-page" :style="{height:bgHeight}">
        <el-form :rules="rules" :hide-required-asterisk="isRequired" label-position="left" ref="form" :model="form">
            <el-form-item prop="name">
                <el-input placeholder="姓名" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item prop="company">
                <el-input placeholder="公司名" v-model="form.company"></el-input>
            </el-form-item>
            <el-form-item prop="region">
                <el-input placeholder="收件地址" v-model="form.region"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input placeholder="手机号" style="width: 70%" type="number" v-model="form.phone"></el-input>
                <span>|</span>
                <span v-if="isGetcode" @click="getCode()" class="getCode">获取验证码</span>
                <span v-else class="getCode">{{codeText}}S</span>
            </el-form-item>
            <el-form-item prop="code">
                <el-input placeholder="验证码" type="number" v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item class="fromBtn">
                <el-button class="verifyBtn1" type="primary" @click="submitForm('form')">验证登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { getCode,addUserForm } from '../api/path'
    export default {
        name: "form-page",
        data(){
            // 手机号码验证
            return{
                form:{
                    name:'', // 姓名
                    company:'', // 公司名
                    region:'', // 地区
                    phone:'', // 手机号
                    code:'', // 用户输入验证码
                },
                code1:'', // 接口返回数据
                rules:{
                    name:[
                        { required: true, message: '请输入您的姓名', trigger: 'blur' },
                    ],
                    company:[
                        { required: true, message: '请输入您的公司名', trigger: 'blur' },
                    ],
                    region:[
                        { required: true, message: '请输入地区', trigger: 'blur' },
                    ],
                    phone:[
                        { required: true, message: '请输入您的手机号', trigger: 'blur' },
                    ],
                    code:[
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ],
                },
                isRequired:true,
                codeText: 60,
                isRight:'verifyBtn',
                isGetcode:true,
                bgHeight:""
            }
        },
        mounted() {
            this.bgHeight = document.documentElement.clientHeight + "px";
        },
        methods:{
            // 表单提交
            submitForm(formName) {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.submitInfo()
                    } else {
                        this.$toast({
                            message:'请检查信息是否填写完整',
                            type:'fail',
                            duration:1500
                        })
                    }
                });
            },
            // 提交表单信息
            submitInfo(){
                let data = {
                    name: this.form.name, // 用户姓名
                    departmentId: this.form.company, // 公司名
                    address: this.form.region, // 地区
                    phone: this.form.phone, // 手机号
                    verification: this.form.code, // 验证码
                    openId:this.$cookies.get('openId')
                };
                addUserForm(JSON.stringify(data)).then((result)=>{
                    console.log(result)
                    if(result.code == 200){
                        this.$dialog.alert({
                            title: '提交成功',
                            message: '表单以保存，可以开始答题了',
                        }).then(()=>{
                            this.$store.commit('startWork')
                            this.$router.replace('/topic')
                        })
                    }else{
                        this.$toast({
                            message:result.msg,
                            type:'fail',
                            duration:1500
                        })
                    }
                })
            },
            // 校验验证码
            checkCode(){
                let data = {
                    code:this.form.code,
                    phone:this.form.phone
                }
                this.submitInfo()
                checkCode(data).then((result)=>{
                    if(result.code == 200){
                        this.submitInfo()
                    }
                })
            },
            // 获取验证码
            getCode(){
                // 手机号验证
                let regExp = new RegExp("^1[3578]\\d{9}$");
                if(this.form.phone && regExp.test(this.form.phone)){
                    this.isGetcode = false
                    // 60s后重新发送验证码
                    let countDown = setInterval(()=>{
                        this.codeText--
                        if(this.codeText == 0){
                            clearInterval(countDown)
                            this.isGetcode = true
                        }
                    },1000)
                    // 获取验证码
                    let data = {
                        phone:this.form.phone
                    }
                    console.log(data)
                    getCode(data).then((result)=>{
                        if (result.code == 200){
                            this.$toast({
                                message:'发送成功，请注意查收短信',
                                type:'success',
                                duration:1500
                            })
                        }
                    })
                }else {
                    if(!this.form.phone){
                        this.$toast({
                            message:'手机号不能为空',
                            type:'fail'
                        })
                    }else{
                        this.$toast({
                            message:'请检查你输入的手机号是否正确',
                            type:'fail',
                        })
                    }
                }

            },
        }
    }
</script>

<style lang="scss" scoped>
    .form-page{
        height: 100vh;
        width: 100%;
        background-image: url("../assets/image/formbg.png");
        background-size: 100% 100%;
        .el-form{
            width: 85%;
            position: absolute;
            left: 9%;
            top: 120px;
            .el-form-item{
                width: 100%;
                border-bottom: 1px solid #dbd9d9;
                background-color: #ffffff;
                box-shadow: #999999 0px -2px 9px 0px;
                border-radius: 6px;
                margin-bottom: 17px;
                /deep/.el-input{
                    width: 95%;
                    margin-bottom: 2px;
                    .el-input__inner{
                        border-color: transparent;
                    }
                }
            }
            .getCode{
                display: inline-block;
                width: 27%;
                font-size: 0.8rem;
                text-align: center;
                color: red;
            }
            .fromBtn{
                border: 0;
                width: 100%;
                margin-top: 15%;
                margin-left: 0 !important;
                /deep/ .el-form-item__content{
                    margin-left: 0 !important;
                    .verifyBtn{
                        width: 100%;
                        padding: 5% 20px;
                        background-color: #ffc6c7;
                        border: #ffc6c7;
                        font-size: 1.1rem;
                        letter-spacing: 2px;
                    }
                    .verifyBtn1{
                        width: 100%;
                        padding: 5% 20px;
                        background-color: #cf0001;
                        border: #cf0001;
                        font-size: 1.1rem;
                        letter-spacing: 2px;
                    }
                }
            }
        }
    }
    /deep/ .el-form-item.is-error .el-input__inner{
        border-color: #F56C6C !important;
        line-height: 41px;
        width: 105%;
    }
</style>