<template>
    <div>
        <!-- 1.0 头部 -->
        <div class="header">
            <!-- 1.0 导航栏头部 -->
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>new买买买</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <span v-show="!isLogin">
                            <router-link to="/site/login" class="">登录</router-link>
                            <strong>|</strong>
                            <a href="" class="">注册</a>
                            <strong>|</strong>
                        </span>
                        <span v-show="isLogin">
                            <router-link to="/site/vipCenter" class="">会员中心</router-link>
                            <strong>|</strong>
                            <a href="javascript:void(0)" @click="logout">退出</a>
                            <strong>|</strong>
                        </span>
                        <router-link to="/site/shopcart" id="shoppingCartCount" class="">
                            <i class="iconfont icon-cart"></i>购物车(
                            <span>
                                <span>{{this.$store.getters.getBuyCount}}</span>
                            </span>)</router-link>
                    </div>
                </div>
            </div>

            <!-- 2.0 导航条 -->
            <div class="head-nav">
                <div class="section">
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <router-link to="/site/home" class=""> 
                                    <span class="out" style="top: 0px;">首页</span>
                                </router-link>
                            </li>
                            <li class="news">
                                <router-link to="/site/selection" class=""> 
                                    <span class="out" style="top: 0px;">每日精选</span>
                                </router-link>
                                
                            </li>
                            <li class="photo">
                                <router-link to="/site/seckill" class="">
                                    <span class="out" style="top: 0px;">秒杀专区</span>
                                </router-link>

                            </li>
                            <li class="video">
                                <router-link to="/site/supermarket" class="">
                                    <span class="out" style="top: 0px;">new超市</span>
                                </router-link>
                            </li>
                            <li class="down">
                                <router-link to="/site/vip1" class="">
                                    <span class="out" style="top: 0px;">会员权益</span>
                                </router-link>
                            </li>
                            <li class="goods">
                                <router-link to="/site/goodslist" class="">
                                    <span class="out" style="top: 0px;">购物商城</span>
                                </router-link>
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

        <!-- 2.0 中间内容部分 -->
        <router-view></router-view>

        <!-- 3.0 尾部 -->
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
                        <p>版权所有 new买买买 </p>
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

<style scoped>
/** 导入hoverNav的样式---局部导入 */
@import "../statics/site/js/jqueryplugins/hoverNav/css/style.css";
</style>

<script>
//局部导入
// import $ from 'jquery'

//导入公共的bus
import bus from "../common/common";
import { ISLOGIN } from "../common/common";

//相当于es5的 module.exports = {}
export default {
  data() {
    return {
      isLogin: false
    };
  },
  created() {
    //代表组件已经创建出来了
    /**
             改变处理函数中的this指向的方式1
            const _this = this
            bus.$on(ISLOGIN,function(logined){
                console.log("1111111111111====",logined)
                _this.isLogin = logined
            })
            **/
    //改变处理函数中的this指向的方式2
    /**
            bus.$on(ISLOGIN,function(logined){
                console.log("222====",logined)
                this.isLogin = logined
            }.bind(this))
            **/

    //调用检测是否登录成功的方法
    this.isLogined();

    //改变处理函数中的this指向的方式3
    bus.$on(ISLOGIN, logined => {
      this.isLogin = logined;
    });
  },
  mounted() {
    //它会在我们dom元素加载完成之后执行
    $("#menu2 li a").wrapInner('<span class="out"></span>');
    $("#menu2 li a").each(function() {
      $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
    });

    $("#menu2 li a").hover(
      function() {
        $(".out", this)
          .stop()
          .animate({ top: "48px" }, 300); // move down - hide
        $(".over", this)
          .stop()
          .animate({ top: "0px" }, 300); // move down - show
      },
      function() {
        $(".out", this)
          .stop()
          .animate({ top: "0px" }, 300); // move up - show
        $(".over", this)
          .stop()
          .animate({ top: "-48px" }, 300); // move up - hide
      }
    );
  },
  methods: {
    //登出
    logout() {
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const url = "site/account/logout";

          this.$axios.get(url).then(response => {
            if (response.data.status === 1) {
              this.$message.error(response.data.message);
              return;
            }

            //重置我们的是否登录标识符
            this.isLogin = false;

            //跳转到商品列表页面
            this.$router.push({ name: "goodslist" });
          });
        })
        .catch(() => {});
    },
    //判断是否登录
    isLogined() {
      const url = "site/account/islogin";

      this.$axios.get(url).then(response => {
        console.log(response.data.code);
        if (response.data.code === "logined") {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      });
    }
  },
    // 监听路由的变化，类名加在那个标签上
  watch:{
    '$route' (to, from) {
      // 当路由不是商品详情页
      if(to.path!=="/site/goodlist"){
        // console.log("不是googdlist页");
      }
    }
  }
};
</script>