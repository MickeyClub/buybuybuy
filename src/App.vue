<template>
    <div id="app">
        <!-- 头部 -->
        <div class="header">
            <!-- 1.0 导航栏头部 -->
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>黑马买买买</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <span v-show="this.$store.state.isLogin==false">
                            <!-- <a href="#/login" class="">登录</a> -->
                            <router-link to="/login">登录</router-link>
                            <strong>|</strong>
                            <a href="" class="">注册</a>
                            <strong>|</strong>
                        </span>
                        <span v-show="this.$store.state.isLogin">
                            <!-- <a href="" class="">会员中心</a> -->
                            <router-link to="/userInfo">会员中心</router-link>
                            <strong>|</strong>
                            <a @click="dropOut">退出</a>
                            <strong>|</strong>
                        </span>
                        <!-- <a href="" class=""> -->
                        <!-- <router-link :to="'/cart'"> -->
                        <router-link to="/shopcart">
                            <i class="iconfont icon-cart" ref="cart"></i>购物车(
                            <span id="shoppingCartCount">
                                <!-- 获取vuex的count数据 -->
                                <span>{{$store.getters.cartDataCount}}</span>
                            </span>)
                            <!-- </router-link> -->
                        </router-link>
                        <!-- </a> -->
                    </div>
                </div>
            </div>

            <!-- 2.0 导航条 -->
            <div class="head-nav">
                <div class="section">
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <router-link to="/index">
                                    <span class="out" style="top: 0px;">首页</span>
                                </router-link>
                            </li>
                            <li class="news">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">每日精选</span>
                                </a>
                            </li>
                            <li class="photo">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">秒杀专区</span>
                                </a>
                            </li>
                            <li class="video">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">黑马超市</span>
                                </a>
                            </li>
                            <li class="down">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">会员权益</span>
                                </a>
                            </li>
                            <li class="goods">
                                <a href="" class="router-link-exact-active ">
                                    <span class="out" style="top: 0px;">购物商城</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 测试App.vue的vuex功能 -->
        <!-- <input type="button" value="我是App.vue的按钮" @click="add">  -->

        <!-- 组件出口 -->
        <!-- include: 字符串或正则表达式。只有名称匹配的组件会被缓存。 -->
        <keep-alive include="index">
            <router-view></router-view>
        </keep-alive>

        <!-- 底部 -->
        <div class="footer">
            <div class="section">
                <div class="foot-nav">
                    <a href="">关于我们</a>
                    <strong>|</strong>
                    <a href="">联系我们</a>
                    <strong>|</strong>
                    <a href="">联系客服</a>
                    <strong>|</strong>
                    <a href="">合作招商</a>
                    <strong>|</strong>
                    <a href="">商家帮助</a>
                    <strong>|</strong>
                    <a href="">营销中心</a>
                    <strong>|</strong>
                    <a href="">隐私政策</a>
                </div>
                <div class="foot-box">
                    <div class="copyright">
                        <p>版权所有 黑马买买买 </p>
                        <p>公司地址： 联系电话：</p>
                        <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                    </div>
                    <div class="service">
                        <p>周一至周日 9:00-24:00</p>
                        <a href="#">
                            <i class="iconfont icon-phone"></i>在线客服</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 导入jQuery
import $ from "jquery";

export default {
    name: "app",
    mounted() {
        $(document).ready(function () {
            $("#menu2 li a").wrapInner('<span class="out"></span>');
            $("#menu2 li a").each(function () {
                $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
            });

            $("#menu2 li a").hover(
                function () {
                    $(".out", this)
                        .stop()
                        .animate({ top: "48px" }, 300); // move down - hide
                    $(".over", this)
                        .stop()
                        .animate({ top: "0px" }, 300); // move down - show
                },
                function () {
                    $(".out", this)
                        .stop()
                        .animate({ top: "0px" }, 300); // move up - show
                    $(".over", this)
                        .stop()
                        .animate({ top: "-48px" }, 300); // move up - hide
                }
            );
        });
    },
    methods: {
        add() {
            // 修改$store中的数据
            console.log(this.$store.state);
            this.$store.commit("increment");
        },
        // 退出登录
        dropOut() {
            if (confirm("确定要退出?")) {
                this.$axios.get("site/account/logout").then(response => {
                    console.log(response)
                    if (response.data.status == false) {
                        // 注销成功 跳转login
                        this.$router.push('/login')
                        // 退出登录后修改vuex的登录状态
                        this.$store.commit('changeLoginState', false)

                    } else {
                        alert('退出失败')
                    }
                })
            }
        }
    },
    // 页面(一打开)重现刷新后,需要重新判断登录状态,否则vuex的登录状态默认是false
    created() {
        this.$axios.get('site/account/islogin').then((response) => {
            // console.log(response)
            if (response.data.code == "logined") {
                this.$store.commit('changeLoginState', true)
            }
        })
    },
};
</script>

<style>
@import url("./assets/statics/site/css/style.css");
.menuhd ul li a span.over,
.menu ul li a span.bg {
  background-color: yellowgreen;
}
</style>
