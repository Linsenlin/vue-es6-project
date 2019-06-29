export default {
    //判断字符串为空
    judgeNull(string) {
        for (let item of string.split('')) {
            if (item !== " ") {
                return true;
            }
        }
    },
    //判断是否为电话号码
    isMobile(string) {
        const mobileReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/; //验证规则;
        if (mobileReg.test(string)) {
            return true;
        }
    },
    //判断是否为邮箱
    judgeEmail(string) {
        const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (emailReg.test(string)) {
            return true;
        }
    },
    //post请求
    post(url, data) {
        return new Promise(resolve => {
            wx.request({
                url: `${config.url}${url}`,
                data,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${wx.getStorageSync('token')}`
                },
                method: 'POST',
                success: res => {
                    resolve(res)
                }
            })
        })
    },
    //get请求
    get(url) {
        return new Promise(resolve => {
            wx.request({
                url: `${config.url}${url}`,
                header: {
                    "Authorization": `Bearer ${wx.getStorageSync('token')}`
                },
                success: res => {
                    resolve(res)
                }
            })
        })
    },
    //时间戳转日期
    getDate(time, onOff) {
        function judge(number) {
            return date[number]() < 10 ? `0${date[number]()}` : date[number]();
        }
        const date = new Date(time);
        const month = Number(judge('getMonth')) + 1;
        const transfromDate1 = `${judge('getFullYear')}-${month < 10 ? `0${month}` : month}-${judge('getDate')}`;
        const transfromDate2 = `${transfromDate1} ${judge('getHours')}:${judge('getMinutes')}:${judge('getSeconds')}`;
        return onOff ? transfromDate2 : transfromDate1;
    },
    //存储全局变量
    store: new Map(),
    //上传图片（通过wx.uploadFile没有达到预想效果）
    uploadImg(url, img) {
        return new Promise(resolve => {
            wx.request({
                url: img,
                responseType: 'arraybuffer',
                success: res => {
                    img = `data:image/jpeg;base64,${wx.arrayBufferToBase64(res.data)}`;
                    resolve()
                }
            })
        }).then(() => {
            return this.post(url, {
                file: img
            })
        })
    },
    //项目配置
    config,
    //消息提示框
    showToast({
        title,
        duration = 2000
    }) {
        wx.showToast({
            title,
            icon: 'none',
            duration
        })
    }
}