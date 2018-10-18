<template>
    <div>
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
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}{{orderInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderInfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                    <!-- <canvas width="300" height="300"></canvas> -->
                                    <qriously :value="'http://111.230.232.110:8899/site/validate/pay/alipay/'+this.orderInfo.id" :size="200" />
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
    name: 'payOrder',
    data() {
        return {
            // 订单数据
            orderInfo: {},
            // 商品id
            orderId: 0,
            // 定时器
            timeId: 0
        }
    },
    methods: {
        // 获取商品订单
        getOrderInfo() {
            this.$axios.get('site/validate/order/getorder/' + this.orderId)
                .then(response => {
                    console.log(response)
                    this.orderInfo = response.data.message[0]
                })
        }
    },
    created() {
        //通过路由 获取订单数据
        console.log(this.$route.params.orderId)
        this.orderId = this.$route.params.orderId;
        // 渲染订单页面
        this.getOrderInfo()
        // 定时器,验证是否支付
        this.timeId = setInterval(() => {
            this.$axios.get('site/validate/order/getorder/' + this.orderId)
                .then(response => {
                    console.log(response)
                    // this.orderInfo = response.data.message[0]
                    if(response.data.message[0].status == 2){
                        // 弹窗提示
                         this.$message({
                            type: 'success',
                            message: '订单支付成功!'
                        });
                        // 跳转页面
                        this.$router.push('/paySuccess')
                    }
                })
        }, 1500)

        // this.$axios.get('site/validate/order/getorder/:orderid')

    },
    destroyed(){
        // 停止定时器
        clearInterval(this.timeId)
    }
}
</script>

<style>
</style>
  