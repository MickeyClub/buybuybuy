<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li :aaa="item.subcates" v-for="(item) in cateList" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p >
                                            <span v-for="(item, index) in item.subcates" :key="index">
                                                {{item.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl >
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd v-for="(item, index) in item.subcates" :key="index">
                                                <a href="/goods/43.html">{{item.title}}</a>
                                                <!-- <a href="/goods/43.html">摄影摄像</a>
                                                <a href="/goods/43.html">存储设备</a> -->
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                           
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <div class="block">
                                    <el-carousel height="341px">
                                    <el-carousel-item v-for="item in sliderList" :key="item.id">
                                        <a href="#">
                                            <img style="display:block;height:100%" :src="item.img_url" alt="">
                                        </a>
                                    </el-carousel-item>
                                    </el-carousel>
  </div>
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in topList" :key="item.id">
                                <div class="img-box">
                                    <label>{{index++}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | formatTime('YYYY-MM-DD hh:mm:ss')}}</span>
                                </div>
                            </li>
                          
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in message" :key="item.level1cateid">
            <div class="main-tit" >
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="item in item.level2catelist">{{item.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(item, index) in item.datas" :key="index">
                            <!-- <a :href="'#/site/goodsinfo/'+item.artID" class=""> -->
                            <!-- 使用路由连接跳转 -->
                            <router-link :to="'/detail/'+item.artID">
                                <div class="img-box">
                                    <img v-lazy="item.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{item.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{item.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{item.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{item.sell_price}}</s>
                                        </span>
                                    </p>
                                </div>
                                </router-link>
                            <!-- </a> -->
                        </li>
  
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      cateList: [],
      sliderList: [],
      topList: [],
      aaa: [],
      // 商品列表
      message: []
    };
  },
  // 页面挂在并创建
  created() {
    //   头部
    this.$axios
      //   .get(this.$baseURL+"/site/goods/gettopdata/goods")
      .get("/site/goods/gettopdata/goods")
      .then(response => {
        //   console.log(response)
        this.cateList = response.data.message.catelist;
        this.sliderList = response.data.message.sliderlist;
        this.topList = response.data.message.toplist;
        console.log(this.cateList);
      });
    //   商品列表
    this.$axios
      //   .get(this.$baseURL+"/site/goods/getgoodsgroup")
      .get("/site/goods/getgoodsgroup")
      .then(response => {
        //   console.log(response);
        this.message = response.data.message;
        //   console.log(this.message)
      });
  }
};
</script>

<style>
</style>

