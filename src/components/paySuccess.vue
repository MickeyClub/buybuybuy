<template>
    <div class="center">
        <div class="el-row">
            <div class="el-col el-col-24">
                <div class="comp">
                    <div class="goodsinfo routeanimate">
                        <div class="section">
                            <div class="location">
                                <span>当前位置：</span>
                                <a href="/index.html">首页</a> &gt;
                                <a href="javascript:;">支付中心</a>
                            </div>
                        </div>
                        <div class="section">
                            <div class="wrapper">
                                <div class="bg-wrap">
                                    <div class="nav-tit pay">
                                        <a href="javascript:;" class="selected">支付中心</a>
                                    </div>
                                    <div class="msg-tips">
                                        <div class="icon">
                                            <i class="iconfont icon-check"></i>
                                        </div>
                                        <div class="info">
                                            <strong>订单已支付成功！<span>离开页面此页还剩<i class="red">{{num}}秒</i></span></strong>
                                            <p>您可以点击这里进入
                                                <a href="/user/center/index.html">会员中心</a>查看订单状态！</p>
                                            <p>如有其它问题，请立即与我们客服人员联系。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'paySueccess',
    data() {
        return {
            num: 5,
            timeId: 0
        }
    },
    created() {
        // 倒计时
        this.timeId = setInterval(() => {
            this.num--;
            if (this.num == 0) {
                this.$router.push('/index')
            }
        }, 1000)
    },
    destroyed() {
        // 清楚定时器
        clearInterval(this.timeId)
    }
}
</script>

<style>
.red{
    font-size: 20px;
    font-weight: 700;
    color: red;
}
</style>
