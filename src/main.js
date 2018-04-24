//导包
import Vue from 'vue'
import moment from 'moment'
// import ElementUI from 'element-ui'
import VueLazyLoad from 'vue-lazyload'

//按需导入我们的element-ui
import { 
    Button, 
    Pagination,
    Input,
    InputNumber,
    Switch,
    Form,
    FormItem,
    Radio,
    RadioGroup,
    MessageBox,
    Message,
    Carousel,
    CarouselItem,
    Row,
    Col,
    Icon
} from 'element-ui'

Vue.use(Button)
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Icon)

// 把方法添加到原型上
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

//基于Vue的组件，需要使用Vue.use(xxx)
// Vue.use(ElementUI) //Vue.property.$message
Vue.use(VueLazyLoad,{
    // loading:'src/statics/site/images/01.gif'
    loading:require('./statics/site/images/01.gif')
})

//全局过滤器
Vue.filter('dateFmt',(input,formatString="YYYY-MM-DD")=>{
    // const lastFormatString = formatString || "YYYY-MM-DD"

    return moment(input).format(formatString)
})

//导入全局用到的样式
// import 'element-ui/lib/theme-chalk/index.css'
import "./statics/site/css/style.css"

//导入根组件
//es5  var App = require('./App.vue')
import App from './App'

//导入router
import router from './router'
import {store} from './store'

new Vue({
    el:"#app",
    router,
    store,
    //参考:https://cn.vuejs.org/v2/guide/render-function.html
    render:h=>h(App)
})