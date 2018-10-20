<template>
    <div id="detail">
        <!-- <input type="button" value="我是detail的按钮" @click="detailAdd"> -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <!-- 放大镜组件 -->
                                <ProductZoomer v-if="images.normal_size.length" :base-images="images" :base-zoomer-options="zoomerOptions" />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsInfo.title}}</h1>
                                <p class="subtitle">{{goodsInfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsInfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsInfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsInfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- <div class="el-input-number el-input-number--small"> -->
                                                <!-- <span role="button" class="el-input-number__decrease is-disabled">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase">
                                                        <i class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <input autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
                                                    </div> -->
                                                <!-- </div> -->
                                                <el-input-number v-model="buyNum" :min="1" :max="goodsInfo.stock_quantity" label="描述文字"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsInfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addCart" ref="toCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a @click="selectedIndex=0" href="javascript:;" :class="{selected: selectedIndex ===0}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a @click="selectedIndex=1" href="javascript:;" :class="{selected: selectedIndex ===1}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" v-show="selectedIndex===0">
                                <div v-html="goodsInfo.content"> </div>
                            </div>
                            <div class="tab-content" v-show="selectedIndex===1">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="message" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" @click="subComments" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="comments.length == 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-show="comments.length !== 0" v-for="(item) in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | formatDate}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- <div id="pagination" class="digg">
                                            <span class="disabled">« 上一页</span>
                                            <span class="current">1</span>
                                            <span class="disabled">下一页 »</span>
                                        </div> -->
                                        <Page :current="pageIndex" @on-change="pageChange" placement="top" :page-size=6 :page-size-opts='[6,16,26,36]' :total="totalcount" show-sizer />
                                        <!-- <Page @on-change="pageChange" :total="totalcount" placement='top' :page-size-opts='[6,16,26,36]' :page-size=6 show-elevator show-sizer /> -->

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item) in hotGoodsList" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                {{item.title}}
                                            </router-link>
                                            <!-- </a> -->
                                            <span>{{item.add_time | formatDate}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 返回顶部 -->
        <BackTop :height="100" :bottom="200">
            <div class="top">返回顶端</div>
        </BackTop>

        <!-- 购物车动画图片    :src="imgList.length ==0 ? '' : imglist[0].original_path" -->
        <img class="fly-img" :src="imgList.length ==0 ? '' : imgList[0].original_path" ref="flyImg" alt="">
    </div>
</template>

<script>
import $ from 'jquery'
// import func from './vue-temp/vue-editor-bridge';
export default {
    name: "detail",
    data() {
        return {
            // 商品id
            goodId: "",
            // 商品详情
            goodsInfo: {},
            // 热卖商品
            hotGoodsList: [],
            //  图片列表
            imgList: [],
            // 购买数量
            buyNum: 1,
            // 商品内容及评价(tab切换)
            selectedIndex: 0,
            // 当前页码
            pageIndex: 1,
            // 页码容量
            pageSize: 6,
            // 评论列表
            comments: [],
            // 总页数
            totalcount: 0,
            // 评论内容
            message: "",
            // 放大镜图片数据
            images: {
                normal_size: [
                    {
                        id: 1,
                        url:
                            "http://yoohooworld.com/images/vue_product_zoomer/normal_size/2.jpeg"
                    },
                    {
                        id: 2,
                        url:
                            "http://yoohooworld.com/images/vue_product_zoomer/normal_size/3.jpeg"
                    }
                ]
            },
            // 放大镜参数
            zoomerOptions: {
                // 放大倍数
                zoomFactor: 4,
                // 放大样式
                pane: "container-round",
                // 多久生肖
                hoverDelay: 300,
                // 类前缀
                namespace: "inline-zoomer",
                // 点击移动
                move_by_click: true,
                // 滚动图片张数
                scroll_items: 5,
                // 选中边框颜色
                choosed_thumb_border_color: "#bbdefb"
            },
            // 动画是否播放完毕
            isFinish: true
        };
    },
    // 事件
    methods: {
        //   请求商品详情
        getGoodInfo() {
            this.images.normal_size = [];
            this.$axios
                .get("site/goods/getgoodsinfo/" + this.goodId)
                .then(response => {
                    // console.log(this.goodId)
                    console.log(response);
                    this.goodsInfo = response.data.message.goodsinfo;
                    this.hotGoodsList = response.data.message.hotgoodslist;
                    this.imgList = response.data.message.imglist;
                    //   console.log(this.goodsInfo);
                    // 将请求到的图片列表, 生成到新的数据
                    let tem_normal_size = [];
                    this.imgList.forEach(v => {
                        tem_normal_size.push({
                            id: v.id,
                            url: v.thumb_path
                        });
                    });
                    this.images.normal_size = tem_normal_size;
                });
        },
        // 请求评论列表
        getComments() {
            this.$axios
                .get(
                    `site/comment/getbypage/goods/${this.goodId}?pageIndex=${
                    this.pageIndex
                    }&pageSize=${this.pageSize}`
                )
                .then(response => {
                    // console.log(response)
                    this.comments = response.data.message;
                    this.totalcount = response.data.totalcount;
                });
        },
        // 页码改变事件
        pageChange(num) {
            // console.log("111")
            this.pageIndex = num;
            this.buyNum = 1;
            this.getComments();
        },
        // 提交评论
        subComments() {
            if (this.message == "") {
                this.$Message.warning("哥们,写点什么吧");
                return;
            }
            this.$axios
                .post("site/validate/comment/post/goods/" + this.goodId, {
                    commenttxt: this.message
                })
                .then(response => {
                    // console.log(response)
                    // 重新渲染
                    this.getComments();
                    this.message = "";
                    this.$Message.info("提交成功");
                });
        },
        // 用于测试add
        detailAdd() {
            // 修改$store中的数据
            this.$store.commit("increment");
        },
        // 添加购物车
        addCart() {
            // { 商品id:购买个数  ,商品id2:购买个数}
            // shopCartData
            //   console.log(this.$store);
            this.$store.commit("addCart", {
                id: this.goodId,
                buyNum: this.buyNum
            });
            //   console.log(this.buyNum);
            console.log(this.$refs.toCart);
            // 使用jquery获取元素的top left值
            let startPos = $(this.$refs.toCart).offset(); // {top: 463, left: 912.5}
            console.log(startPos);
            // this.$parent 访问父实例的refs
            //   console.log(this.$parent.$refs.cart)
            // 父元素的 top left
            let targetPos = $(this.$parent.$refs.cart).offset()
            console.log(this.imgList);
            $(this.$refs.flyImg)
                //   设置位置
                .stop()
                .show()
                .addClass("animate")
                .css(startPos)
                // 显示出来
                .animate(
                    {
                        left: targetPos.left,
                        top: targetPos.top
                    },
                    1000,
                    //   回调函数
                    () => {
                        //   console.log("飞完啦");
                        // console.log(this);
                        $(this.$refs.flyImg)
                            .hide()
                            .removeClass("animate");
                        // // 调用Vuex中的数据修改方法 提交载荷
                        // this.$store.commit("addCart", {
                        //     id: this.goodId,
                        //     buyCount: this.buyNum
                        // });
                        // // 设置标示变量为true即可
                        // this.isFinish = true;
                        // // 移除类名
                        // $(this.$refs.toCart).removeClass("disabled");
                    }
                );
        }
    },
    created() {
        // console.log(this.$route.params.id)
        this.goodId = this.$route.params.id;
        // this.$axios.get('')
        // 根据路由规则获取id,并发送请求
        this.getGoodInfo();
        this.getComments();
    },
    filters: {
        // 时间格式化  2018-10-04 15:00:23
        formatDate: function (date) {
            var padDate = function (date) {
                return date < 10 ? 0 + date : date;
            };
            // 这里的 value 就是需要过滤的数据
            var date = new Date(date);
            var year = date.getFullYear();
            var month = padDate(date.getMonth() + 1);
            var day = padDate(date.getDate());
            var hours = padDate(date.getHours());
            var minutes = padDate(date.getMinutes());
            var seconds = padDate(date.getSeconds());
            // 将整理好的数据返回出去 <!-- yyyy-mm-dd hh:mm:ss -->
            return (
                year +
                "-" +
                month +
                "-" +
                day +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds
            );
        }
    },
    // 观察路由数据改变
    // watch 观察对应的数据 改变时触发
    watch: {
        $route(to, from) {
            //   console.log(to)
            this.goodId = to.params.id;
            this.getGoodInfo();
            this.getComments();
        }
    }
};
</script>

<style>
.tab-content p img {
  display: block;
}
.pic-box {
  width: 350px;
  height: 320px;
}
.inline-zoomer-hahaha-zoomer-box {
  height: 300px;
}
.preview-box img {
  height: 250px;
}
.control-box {
  height: 50px;
}
.control {
  margin: 0 auto;
}
.control-box > div {
  float: left;
  height: 50px;
}
.control-box .thumb-list img {
  width: 50px;
  height: 50px;
  float: left;
}

.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
#detail {
  position: relative;
}

/* 移动图片 */
.fly-img {
  width: 60px;
  height: 60px;
  position: absolute;
  /* left: 880px;
  top: 440px; */
  /* display: none; */
}

.fly-img.animate {
  transform: rotate(3600deg) scale(0.5, 0.5);
  opacity: 0;
  transition: transform 1s, opacity 2s;
}
.goods-spec .spec-box .btn-buy .add.disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>
