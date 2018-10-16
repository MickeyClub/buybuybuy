<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-if="goodsList.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="goodsList.length != 0" v-for="(item) in goodsList" :key="item.id">
                                    <td>
                                        <!-- <div role="switch" aria-checked="true" class="el-switch is-checked"><input type="checkbox" name="" true-value="true" class="el-switch__input"><span class="el-switch__core" style="width: 40px; border-color: black; background-color: black;"></span></div> -->
                                        <el-switch v-model="item.seleced" active-color="#13ce66" inactive-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td><img :src="item.img_url" alt="" style="width: 65px;"></td>
                                    <td>
                                        {{item.title}}
                                    </td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <!-- <div class="el-input-number el-input-number--mini"><span role="button" class="el-input-number__decrease"><i class="el-icon-minus"></i></span><span role="button" class="el-input-number__increase"><i class="el-icon-plus"></i></span>
                                            <div class="el-input el-input--mini"><input type="text" autocomplete="off" max="Infinity" min="0" role="spinbutton" aria-valuemax="Infinity" aria-valuemin="0" aria-valuenow="7" aria-disabled="undefined" class="el-input__inner"></div>
                                        </div> -->
                                        <el-input-number @change="changeShop(item.id, $event)" v-model="item.buycount" :min="1" label="描述文字"></el-input-number>
                                    </td>
                                    <td>{{item.buycount * item.sell_price}}</td>
                                    <td><button @click="delOne(item.id, $event)" type="button" class="el-button el-button--danger is-circle"><i class="el-icon-delete"></i></button></td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{shop.num}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{shop.price}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <router-link to="/checkOrder"><button class="submit">立即结算</button></router-link>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name: "shopcart",
    data: function () {
        return {
            goodsList: []
        };
    },
    methods: {
        // 删除
        delOne(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                // 删除当前的商品数据,并没有删除vuex
                this.goodsList.forEach(v => {
                    if (v.id == id) {
                        this.goodsList.splice(0, 1)
                        console.log(1)
                    }
                });
                // 删除vuex数据,并传对应的id
                this.$store.commit('delById', id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // \使用了$event传递元素的参数
        changeShop(id, newCount) {
            this.$store.commit('updateCart', {
                id,
                newCount
            })
            console.log(id, newCount)
        }
    },
    created() {
        // 获取vuex的数据 并遍历属性
        let ids = "";
        for (const key in this.$store.state.shopCartData) {
            // 字符串存vuex数据的id  并用,分割
            ids += key;
            ids += ",";
        }
        ids = ids.slice(0, -1); // 99,110,  =>  99,110
        // 请求数据  ids 用es6语法
        this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(response => {
            // console.log(response)
            // 手动修改buycount数量后 赋值
            response.data.message.forEach(v => {
                v.seleced = true
                v.buycount = this.$store.state.shopCartData[v.id];
            });
            // 动态修改接口的数据, 注意,必须要接口赋值完毕才放回数据,否则需要使用Vue.set动态添加数据
            this.goodsList = response.data.message;
        });
    },
    computed: {
        // 计算商品数量 及商品总价
        shop() {  // 商品数量
            let shop = {};
            shop.num = 0
            // 选中的商品 并计算总价格 
            this.goodsList.forEach(v => {
                if (v.seleced) {
                    shop.num++;
                    shop.price = v.buycount * v.sell_price
                }
            });
            // 放回对象(商品总量 总价格)
            return shop;
        }
    }
};
</script>

<style>
</style>


