import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) //Vue.property.$store

//全局数据存储相关
//导入localStorageTool中的方法
import {
    addLocalGoods,
    getTotalCount,
    updateLocalGoods,
    deleteLocalGoodsById,
    deleteLocalGoodsByIds
} from '../common/localStorageTool.js'

const store = new Vuex.Store({
    state:{
        buycount:0 //加入购物车中的商品总数量，用在layout.vue的头部的购物车那个徽标上面
    },
    getters:{//从仓库中获取数据，靠getters
        getBuyCount(state){ //state是固定的
            if(state.buycount>0){//当内存中有的时候
                return state.buycount
            }else{ //重新刷新，再从本地取
                return getTotalCount()
            }
        }
    },
    mutations:{//往仓库中增、删、改数据
        /**
         * 参数1：state 固定写法
         * 参数2：载荷，就是参数
         */
        addGoods(state,goodsObj){
            //保存到本地，统计总数量，赋值给buycount
            state.buycount = addLocalGoods(goodsObj)
        },
        updateGoods(state,changedGoods){
            //修改本地的数量，统计总数量，赋值给buycount
            state.buycount = updateLocalGoods(changedGoods)
        },
        deleteGoodsById(state,goodsId){
            //删除本地商品，统计总数量，赋值给buycount
            state.buycount = deleteLocalGoodsById(goodsId)
        },
        deleteGoodsByIds(state,goodsids){//约定，传递过来的goodsids是一个数组[87,92]
            //根据ids删除本地的商品
            state.buycount = deleteLocalGoodsByIds(goodsids)
        }
    }
})

//导出
export {store}