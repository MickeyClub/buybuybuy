<template>
    <div class="bg-wrap" style="min-height: 765px;">
        <div class="sub-tit">
            <ul>
                <li class="selected">
                    <a href="/user/order-list.html">交易订单</a>
                </li>
            </ul>
        </div>
        <div class="table-wrap">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                <tbody>
                    <tr>
                        <th width="16%" align="left">订单号</th>
                        <th width="10%">姓名</th>
                        <th width="12%">订单金额</th>
                        <th width="11%">下单时间</th>
                        <th width="10%">状态</th>
                        <th width="12%">操作</th>
                    </tr>
                    <tr v-for="(item, index) in orderList" :key="item.id">
                        <td>{{item.order_no}}</td>
                        <td align="left">{{item.accept_name}}</td>
                        <td align="left">
                            <strong style="color: red;">￥{{item.real_amount}}</strong>
                            <br> 在线支付
                        </td>
                        <td align="left">{{item.add_time | formatTime('YYYY-MM-DD HH:mm:ss')}}</td>
                        <td align="left">
                            {{item.statusName}}
                        </td>
                        <td align="left">
                            <!-- <a href="#/site/member/orderinfo/12" class="">查看订单</a> -->
                            <router-link :to="'/userInfo/orderInfo/'+item.id">查看订单</router-link>
                            <br>
                            <!-- <a href="#/site/goods/payment/12" class="">|去付款</a> -->
                            <br>
                            <!-- <a href="javascript:void(0)">|取消</a> -->
                            <router-link v-show="item.status==1" :to="'/payOrder/' + item.id">去付款</router-link>
                            <br>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="page-foot">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                :current-page="pageIndex" :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalPage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderList',
    data() {
        return {
            // 页码
            pageIndex: 1,
            // 页容量
            pageSize: 10,
            // 总页数
            totalPage: 0,
            // 订单列表
            orderList: [],
        }
    },
    // 分页组件
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageIndex = val;
            this.getOrderList()
        },
        getOrderList() {
            // 请求接口
            this.$axios
                .get(`site/validate/order/userorderlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
                .then(response => {
                    // console.log(response)
                    this.orderList = response.data.message;
                    this.totalPage = response.data.totalcount

                })
        }
    },
    created() {
        // 渲染页面
        this.getOrderList()
    }
}
</script>

<style>
</style>
