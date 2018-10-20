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
                                <tr v-show="goodList.length==0">
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
                                <tr  v-show="goodList.length!=0" v-for="(item, index) in goodList" :key="item.id">
                                   <td><input v-model="item.isChecked" type="checkbox" name="" id=""></td>
                                   <td ><img style="width:100px" :src="item.img_url" alt=""></td>
                                   <td>{{item.title}}</td>
                                   <td>{{item.sell_price}}</td>
                                   <td><el-input-number  v-model="item.buycount"  :min="1" :max="10" label="描述文字"></el-input-number></td>
                                   <td>{{item.buycount * item.sell_price}}</td>
                                   <td><input type="button" @click="removeGood(index)" value="移除"></td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{num}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}0</b>元
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
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "cart",
  data: function() {
    return {
      // 商品数量
      goodList: [],
      // 选择的商品
      num: 0
    };
  },
  methods: {
    // 请求数据逻辑
    getShopCart() {
      // 获取vuex数据仓库
      let totalCart = this.$store.state.shopCartData;
      // 遍历获取id
      let ids = [];
      // 将遍历的属性存进数组中
      for (const key in totalCart) {
        ids.push(key);
      }
      // 非空判断
      if(!ids.length){
          this.goodList = []
          return
      }
      // 请求接口数据
      this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(responese => {
        // console.log(responese);
        // console.log(this.$store.state.shopCartData);
        this.goodList = responese.data.message;
        // 处理商品数量   如果商品的id == 当前数据仓库的属性 则 修改buycount的值
        this.goodList.forEach(element => {
          // 动态添加属性  input的选择框
          Vue.set(element, "isChecked", false);
          // 遍历vuex的数据仓库id 
          for (const key in this.$store.state.shopCartData) {
              // vuex的数据仓库的id == 接口返回的id
            if (element.id == key) {
                // 将vuex数据仓库的购买数量 赋值给buycount
                element.buycount = this.$store.state.shopCartData[key];
            }
          }
        });
        // console.log(this.goodList);
      });
    },
    // 删除商品
    removeGood(index){
        console.log(this.goodList[index].id)
        // 传递一个id过去vuex进行数据的删除  
       this.$store.commit('removeGood',this.goodList[index].id);
       this.getShopCart()
    }
  },
  // 请求数据
  created() {
    this.getShopCart();
  },
  computed: {
    // 商品总金额  选择商品数量
    totalPrice() {
      let price = 0; // 商品总金额
      this.num = 0;  // 选择商品数量
      this.goodList.forEach(element => {
          // 被选中
        if (element.isChecked) {
            // 商品数量 += 
          this.num += element.buycount;
          price += element.sell_price * element.buycount;
        }
      });
      price = price =! 0 ? price : 0
      // 返回总金额
      return price;
    },
    
  }
};
</script>

<style>
td,
th {
  text-align: center;
}
</style>
