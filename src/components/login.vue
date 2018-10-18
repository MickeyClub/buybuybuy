<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" name="txtUserName" v-model.trim="username" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" @keyup.enter="login" name="txtPassword" v-model.trim="password" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" @click="login" name="btnSubmit" type="submit" value="立即登录">

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            let that = this
            // 发送请求
            // $.axios
            this.$axios.post('site/account/login', {
                user_name: this.username,
                password: this.password
            }).then(response => {
                // console.log(response)
                if (response.data.status) {
                    // 登录失败
                    this.$notify({
                        title: '登录失败',
                        message: response.data.message,
                        type: 'warning'
                    });
                } else {
                    // 登录成功
                    this.$notify({
                        title: '欢迎登录',
                        message: response.data.message,
                        type: 'success'
                    });
                    // 注意 必须设置axios跨域请求携带cookie,否则会一直登录失败
                    this.$router.push('/checkOrder/ids')
                    // 登录成功 改变登录成功状态
                    this.$store.commit('changeLoginState', true)
                    // 在哪点击登录 就回去哪
                    this.$router.back()
                }
            })
        },

    }

}
</script>

<style>
.el-button {
  border: none;
}
.el-button:focus,
.el-button:hover {
  background-color: #fff;
}
</style>
