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
                                            <dd>{{orderInfo.area}}&nbsp;{{orderInfo.address}}
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
                                <!--文字logo-->
                                <!-- <div id="container">
                                    <canvas width="400" height="400"></canvas>
                                </div> -->

                                <img id="imgLogo" src="../../statics/site/images/alipay.png" hidden>

                                <!--图片logo-->
                                <div id="container2">
                                    <canvas width="400" height="400"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

<script>
    //导入二维码js
    import "../../statics/site/js/jqueryplugins/qrcode/jqueryqr.js"

    export default {
        data() {
            return {
                orderInfo: {},
                interval:null
            }
        },
        created() {
            this.getOrderInfoData()

            //调用该方法，每隔3s进行一次轮询
            this.getOrderStatus()
        },
        beforeDestroy(){
            clearInterval(this.interval)
        },
        mounted() {
            //文字logo
            // $("#container").erweima({
            //     mode: 2,
            //     label: '扫码支付',
            //     text: "http://www.baidu.com"
            // });

            //图片logo
            setTimeout(() => {
                $('#container2').erweima({
                    mode: 4,
                    mSize: 30,//最大只能设置这么大，否则太大，扫描不出来
                    text: `http://39.108.135.214:8899/site/validate/pay/alipay/${this.$route.params.orderid}`,
                    image: $("#imgLogo")[0]
                });
            }, 200);
        },
        methods: {
            //获取订单的详细信息
            getOrderInfoData() {
                const url = `site/validate/order/getorder/${this.$route.params.orderid}`

                this.$axios.get(url).then(response => {
                    this.orderInfo = response.data.message[0]
                })
            },
            //每隔一段时间找服务器轮询一下
            getOrderStatus() {
                this.interval = setInterval(() => {
                    const url = `site/validate/order/getorder/${this.$route.params.orderid}`

                    this.$axios.get(url).then(response => {
                        const orderStatus = response.data.message[0].status

                        if(orderStatus===2){
                            this.$router.push({path:'/site/pcPaySuccess'})
                        }
                    })
                }, 3000)
            }
        }
    }
</script>