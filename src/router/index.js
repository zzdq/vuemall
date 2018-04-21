import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter) //Vue.property.$route  Vue.property.$router

//不是基于Vue的插件，如果想绑定到Vue上面
Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://39.108.135.214:8899/"
//在跨域的时候，允许访问服务器带上cookies
axios.defaults.withCredentials = true

//路由相关
//导入组件
// import layout from '../components/layout'
// import goodslist from '../components/goods/goodslist'
// import goodsinfo from '../components/goods/goodsinfo'
// import shopcart from '../components/shopcart/shopcart'
// import order from '../components/order/order'
// import login from '../components/account/login'
// import payOrder from '../components/pay/payOrder'
// import pcPaySuccess from '../components/pay/pcPaySuccess'
// import vipCenter from '../components/vip/vipCenter'
// import myOrders from '../components/vip/myOrders'
// import orderInfo from '../components/vip/orderInfo'

// 实现按需加载
const layout = () => import('../components/layout')
const goodslist = () => import('../components/goods/goodslist')
const goodsinfo = () => import('../components/goods/goodsinfo')
const shopcart = () => import('../components/shopcart/shopcart')
const order = () => import('../components/order/order')
const login = () => import('../components/account/login')
const payOrder = () => import('../components/pay/payOrder')
const pcPaySuccess = () => import('../components/pay/pcPaySuccess')
const vipCenter = () => import('../components/vip/vipCenter')
const myOrders = () => import('../components/vip/myOrders')
const orderInfo = () => import('../components/vip/orderInfo')
const home = () =>import('../components/home/home')
const seckill = () =>import('../components/seckill/seckill')
const selection = () =>import('../components/selection/selection')
const supermarket = () =>import('../components/supermarket/supermarket')
const vip1 = () =>import('../components/vip1/vip1')


const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/site/goodslist'},
        {path:'/site',component:layout,children:[
            {name:'goodslist',path:'goodslist',component:goodslist},
            {path:'goodsinfo/:goodsId',component:goodsinfo},
            {path:'shopcart',component:shopcart},
            {path:'home',component:home},
            {path:'seckill',component:seckill},
            {path:'selection',component:selection},
            {path:'supermarket',component:supermarket},
            {path:'vip1',component:vip1},
            {name:'login',path:'login',component:login},
            //下面开始，需要进行登录验证
            {path:'order/:ids',component:order,meta:{needLogin:true}},
            {path:'payOrder/:orderid',component:payOrder,meta:{needLogin:true}},
            {path:'pcPaySuccess',component:pcPaySuccess,meta:{needLogin:true}},
            {path:'vipCenter',component:vipCenter,meta:{needLogin:true}},
            {path:'myOrders',component:myOrders,meta:{needLogin:true}},
            {path:'orderInfo/:orderid',component:orderInfo,meta:{needLogin:true}},
            {path:'vip1',component:vip1,meta:{needLogin:true}}
        ]}
    ]
})

/**
 * 路由守卫
 * 
 * to 跳转到哪里去
 * from 从哪里跳转过来
 * next 调用next就会触发路由，调用它，就不会触发路由
 */
router.beforeEach((to, from, next) => {
    
    //记录要去的路径
    if(to.path!='/site/login'){
        localStorage.setItem('lastVisitPath',to.path)
    }

    //2、判断即将跳转的组件中的路径(to)里面是否需要进行权限验证，如果需要权限验证，就发送请求给后台
    //如果不需要权限验证，直接跳过
    if(to.meta.needLogin){//需要登录的组件
        //判断登录
        const url = "site/account/islogin"

        axios.get(url).then(response=>{
            console.log(response.data)
            if(response.data.code==='nologin'){
                //跳转到登录页面上面去
                router.push({name:'login'})
            }else{
                next()
            }
        })
    }else{
        next()
    }
})

export default router