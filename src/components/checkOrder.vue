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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                            <div id="orderForm" name="orderForm" url="">
                                <div class="form-box address-info">
                                    <el-form-item label="收货人姓名" prop="accept_name">
                                        <el-input style="width: 400px" v-model="ruleForm.accept_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属区域" prop="area">
                                        <v-distpicker @selected='changeArea' :province="ruleForm.area.province.value" :city="ruleForm.area.city.value" :area="ruleForm.area.area.value"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址" prop="address">
                                        <el-input style="width: 400px" v-model="ruleForm.address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile">
                                        <el-input style="width: 400px" v-model="ruleForm.mobile"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮箱" prop="email">
                                        <el-input style="width: 400px" v-model="ruleForm.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" prop="post_code">
                                        <el-input style="width: 400px" v-model="ruleForm.post_code"></el-input>
                                    </el-form-item>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <!-- <label>
                                            <input name="payment_id" type="radio" onclick="paymentAmountTotal(this);" value="1">
                                            <input name="payment_price" type="hidden" value="0.00">在线支付
                                            <em>手续费：0.00元</em>
                                        </label> -->
                                        <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>
                                        <span class="info">手续费: 0.00元</span>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <!-- <label>
                                            <input name="express_id" type="radio" onclick="freightAmountTotal(this);" value="1" datatype="*" sucmsg=" ">
                                            <input name="express_price" type="hidden" value="20.00">顺丰快递
                                            <em>费用：20.00元</em>
                                            <span class="Validform_checktip"></span>
                                        </label> -->
                                        <el-radio @change="changeExpress(20)" v-model="ruleForm.express_id" label="1">顺丰</el-radio>
                                        <span class="info"> 费用: 20.00元</span>

                                        <el-radio @change="changeExpress(0)" v-model="ruleForm.express_id" label="2">圆通</el-radio>
                                        <span class="info"> 费用: 0.00元</span>

                                        <el-radio @change="changeExpress(-2)" v-model="ruleForm.express_id" label="3">韵达</el-radio>
                                        <span class="info"> 费用: -2.00元</span>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item, index) in goodsList" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" :href="'#/detail/'+item.id">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" :href="'#/detail/'+item.id">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price * item.buycount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea name="message" class="input" style="height:35px;">{{ruleForm.message}}</textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{goodsNum}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{ruleForm.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{ruleForm.goodsAmount - ruleForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <!-- <a class="btn button" href="/cart.html"> -->
                                            <router-link class="btn button" to="/shopcart">
                                                返回购物车
                                            </router-link>
                                            <!-- </a> -->
                                            <a id="btnSubmit" @click="subOrder" class="btn submit">确认提交</a>
                                            <!-- <router-link to="/payOrder"  class="btn submit">确认提交</router-link> -->
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vDistpicker from 'v-distpicker'
export default {
    name: 'checkOrder',
    data() {
        var validateMobile = (rule, value, callback) => {
            // 延时动画
            setTimeout(function() {
                // 手机号正则
                let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
                if (value === '') {
                    callback(new Error('请输入手机号码'));
                } else if (reg.test(value) == false) {
                    callback(new Error("请输入正确的手机号"));

                } else {
                    // 没有问题
                    callback();
                }

            }, 1000)
        };
        var validateEmail = (rule, value, callback) => {
            // 手机号正则
            let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else if (reg.test(value) == false) {
                callback(new Error("请输入正确的邮箱"));

            } else {
                // 没有问题
                callback();
            }
        };
        var validatePostCode = (rule, value, callback) => {
            // 手机号正则
            let reg = /^[1-9]\d{5}(?!\d)$/
            if (reg.test(value) == false) {
                callback(new Error("请输入正确邮政编码"));

            } else {
                // 没有问题
                callback();
            }
        };
        return {
            ruleForm: {
                // 收货人
                accept_name: 'mickey',
                // 收货地址
                address: '福永',
                // 邮箱
                email: '97220@qq.com',
                // 手机
                mobile: '18888888888',
                //邮编
                post_code: '510000',
                // 收货人地区
                area: {
                    province: {
                        code: '440000',
                        value: "广东省"
                    },
                    city: {
                        code: '440300',
                        value: "深圳市"
                    },
                    area: {
                        code: '440306',
                        value: "宝安区"
                    },
                },
                // 支付方式
                payment_id: '6',
                // 快递
                express_id: '1',
                // 备注信息
                message: '请尽快发货',
                // 购买商品id
                goodsids: '',
                // 商品对象{id: 81}
                cargoodsobj: {},
                // 总金额
                goodsAmount: 0,
                // 快递费
                expressMoment: 20
            },
            rules: {
                accept_name: [
                    { required: true, message: '请输入名字', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' },
                    { min: 3, message: '最少3个字符', trigger: 'blur' }
                ],
                mobile: [
                    { validator: validateMobile, trigger: 'change' }
                ],
                email: [
                    { validator: validateEmail, trigger: 'change' }
                ],
                post_code: [
                    // validator 自定义的验证规则 trigger 触发的时机
                    { validator: validatePostCode, trigger: "change" }
                ]
            },
            goodsList: []
        }
    },
    methods: {
        // 收货地区
        changeArea(data) {
            // console.log(data)
            this.ruleForm.area = data;
        },
        // 快递费
        changeExpress(data) {
            this.ruleForm.expressMoment = data;
        },
        // 下单操作
        subOrder() {
            // 提交表单并请求接口
            this.$axios.post('site/validate/order/setorder', this.ruleForm)
                .then(response => {
                    console.log(response)
                    if (response.data.status == 0) {
                        this.$message({
                            type: 'success',
                            message: '创建订单成功!'
                        });
                        // alert("创建订单成功")
                        // 删除购物车里的数据
                        // 遍历商品对象 cargoodsobj 删除vuex的商品
                        for (const key in this.ruleForm.cargoodsobj) {
                            // 传id过去vuex 进行购物车删除
                            console.log(key)
                            this.$store.commit('delById', key)
                        }
                        // 跳转订单页
                        this.$router.push('/payOrder/' + response.data.message.orderid)
                    } else {
                        alert("创建订单失败")
                    }
                })
        }
    },
    // 请求数据 渲染订单页
    created() {
        // console.log(this.$route)
        // 通过路由 route 获取id
        this.ruleForm.goodsids = this.$route.params.ids;
        // 请求接口,获取商品列表
        this.$axios
            .get('site/validate/order/getgoodslist/' + this.ruleForm.goodsids)
            .then(response => {
                // console.log(response)
                // 遍历接口返回的数据,并修改
                let temData = {};
                response.data.message.forEach(v => {
                    // 商品购买数量 ,从vuex中获取购买商品数量 
                    v.buycount = this.$store.state.shopCartData[v.id];
                    // 接口返回的id:81 =>  购买的商品对象=> 商品id: 购买数量
                    temData[v.id] = v.buycount
                    // 累加总金额
                    this.ruleForm.goodsAmount += v.buycount * v.sell_price
                });
                // 返回 接口需要的参数 cartgoodsobj
                this.ruleForm.cargoodsobj = temData;
                // 先处理数据,最后在返回数据
                this.goodsList = response.data.message;
                console.log(this.goodsList)
            })
    },
    computed: {
        // 总数
        goodsNum() {
            let num = 0;
            this.goodsList.forEach(v => {
                num += v.buycount;
            })
            return num
        },
        // // 总金额
        // totalPrice() {
        //     let total = 0;
        //     this.goodsList.forEach(v => {
        //         total += (v.buycount * v.totalamount) + this.ruleForm.expressMoment

        //     })
        //     return total
        // }
    },

    // 使用省市区联动插件
    components: { vDistpicker }
}
</script>

 
<style>
.info {
  color: #ccc;
}
</style>
