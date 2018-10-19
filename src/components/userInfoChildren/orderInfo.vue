<template>
    <div class="bg-wrap" style="min-height: 765px;">
        <div class="sub-tit">
            <a href="javascript:void(0)" class="add">
                <i class="iconfont icon-reply"></i>返回</a>
            <ul>
                <li class="selected">
                    <a href="javascript:;">查看订单</a>
                </li>
            </ul>
        </div>
        <div class="order-progress">
            <ul>
                <li :class="orderinfo.status >= 1 ? 'active': ''">
                    <div class="progress">下单</div>
                    <div class="info">{{orderinfo.add_time | formatTime('YYYY-MM-DD HH:mm:ss')}}</div>
                </li>
                <li :class="orderinfo.status >= 2 ? 'active': ''">
                    <div class="progress">已付款</div>
                    <div class="info">{{orderinfo.payment_time | formatTime('YYYY-MM-DD HH:mm:ss')}}</div>
                </li>
                <li :class="orderinfo.status >= 3 ? 'active': ''">
                    <div class="progress">已经发货</div>
                    <div class="info">{{orderinfo.express_time | formatTime('YYYY-MM-DD HH:mm:ss')}}</div>
                </li>
                <li :class="orderinfo.status >= 4 ? 'active': ''">
                    <div class="progress">已完成</div>
                    <div class="info">{{orderinfo.complate_time | formatTime('YYYY-MM-DD HH:mm:ss')}}</div>
                </li>
            </ul>
        </div>
        <div class="form-box accept-box form-box1">
            <dl class="head form-group">
                <dd>
                    订单号：BD20171025213815752

                    <!-- <a href="#/site/goods/payment/12" class="btn-pay">去付款</a> -->
                    <router-link v-if="orderinfo.status == 1" :to="'/payOrder/'+orderinfo.id" class="btn-pay">去付款</router-link>
                    <a v-show="orderinfo.status!=1&&orderinfo.status!=4" to="" @click.prevent="signOrder" class="btn-pay">签收</a>
                    <!---->
                </dd>
            </dl>
            <dl class="form-group">
                <dt>订单状态：</dt>
                <dd>
                    {{orderinfo.statusName}}
                </dd>
            </dl>
            <dl class="form-group">
                <dt>快递单号：</dt>
                <dd>
                    {{orderinfo.order_no}}
                </dd>
            </dl>
            <dl class="form-group">
                <dt>支付方式：</dt>
                <dd>{{orderinfo.paymentTitle}}</dd>
            </dl>
        </div>
        <div class="table-wrap">
            <table width="100%" border="0" cellspacing="0" cellpadding="5" class="ftable">
                <tbody>
                    <tr>
                        <th align="left">商品信息</th>
                        <th width="60%">名称</th>
                        <th width="10%">单价
                        </th>
                        <th width="10%">数量</th>
                        <th width="10%">金额</th>
                    </tr>
                    <tr v-for="(item, index) in goodslist" :key="item.id">
                        <td width="60">
                            <img :src="item.imgurl" class="img">
                        </td>
                        <td align="left">
                            <a target="_blank" :href="'#/detail/'+item.goods_id">{{item.goods_title}}</a>
                        </td>
                        <td align="center">
                            <s>￥{{item.goods_price}}</s>
                            <p>￥{{item.goods_price}}</p>
                        </td>
                        <td align="center">{{item.quantity}}</td>
                        <td align="center">￥{{item.real_price}}</td>
                    </tr>
                    <tr>
                        <td colspan="7" align="right">
                            <p>商品金额：
                                <b class="red">￥{{orderinfo.payable_amount}}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                                <b class="red">￥{{orderinfo.express_fee}}</b>
                            </p>
                            <p style="font-size: 22px;">应付总金额：
                                <b class="red">￥{{orderinfo.order_amount}}</b>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="form-box accept-box">
            <dl class="head form-group">
                <dd>收货信息</dd>
            </dl>
            <dl class="form-group">
                <dt>顾客姓名：</dt>
                <dd>{{orderinfo.accept_name}}</dd>
            </dl>
            <dl class="form-group">
                <dt>送货地址：</dt>
                <dd>{{orderinfo.area+orderinfo.address}}</dd>
            </dl>
            <dl class="form-group">
                <dt>联系电话：</dt>
                <dd>{{orderinfo.mobile}} </dd>
            </dl>
            <dl class="form-group">
                <dt>电子邮箱：</dt>
                <dd>{{orderinfo.email}}</dd>
            </dl>
            <dl class="form-group">
                <dt>备注留言：</dt>
                <dd>{{orderinfo.message}}</dd>
            </dl>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderInfo',
    data() {
        return {
            // 订单id
            orderId: '',
            // 商品信息
            goodslist: [],
            // 订单信息
            orderinfo: {},
        }
    },
    methods: {
        getOrderInfo() {
            // 请求接口
            this.$axios
                .get(`site/validate/order/getorderdetial/${this.orderId}`)
                .then(response => {
                    console.log(response)
                    this.goodslist = response.data.message.goodslist;
                    this.orderinfo = response.data.message.orderinfo;
                })
        },
        // 签收
        signOrder() {
            console.log(11)
            this.$axios
                .get(`site/validate/order/complate/${this.orderId}`)
                .then(response => {
                    console.log(response)
                    if (response.data.status == 0) {
                        this.$message({
                            type: 'success',
                            message: "签收成功"
                        })
                        // 重新渲染
                        this.getOrderInfo()
                    }
                })
        }
    },
    created() {
        // console.log(this.$route)
        // 获取url传递过来的id
        this.orderId = this.$route.params.orderId;
        // 初始化渲染
        this.getOrderInfo()
    }
}
</script>

<style>
</style>
