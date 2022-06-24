import request from '../utils/request';
import requestWx from '../utils/requestWx'

// 保存用户登录信息
export function userLogin(data) {
    return request({
        url: '/user/UserLogin',
        method: 'POST',
        data
    })
}
// 获取验证码
export function getCode(params) {
    return request({
        url:'/user/sendVerificationCode',
        method:'GET',
        params
    })
}


// 表单信息提交
export function addUserForm(data) {
    return request({
        Accept: 'json',
        url:'/user/UserInformation',
        method:'POST',
        data
    })
}

// 开始抽奖
export function getPrize(params) {
    return request({
        url:'/thePrize/getPrize',
        method:'GET',
        params
    })
}

// 答题结算
export function saveDetail(data) {
    return request({
        Accept: 'json',
        url:'/topic/detail/saveDetail',
        method:'POST',
        data
    })
}

//查询用户最高分最快时间
export  function getHightScore(params) {
    return request({
        url:'/topic/detail/getHightScore',
        method:'GET',
        params
    })
}

// 查看我的奖品
export function getMyPrize(params) {
    return request({
        url:'/thePrize/getMyPrize',
        method:'GET',
        params
    })
}

// 获取当天的答题次数
export function getDayanswerSum(params) {
    return request({
        url:'/topic/detail/getAnswerTimes',
        method:'GET',
        params
    })
}

// 抽奖参与人数
export function getPrizeCount() {
    return request({
        url:"/topic/detail/getPrizeCount",
        method:"GET",
    })
}



