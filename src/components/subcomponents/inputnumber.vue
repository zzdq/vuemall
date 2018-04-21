<template>
   <div>
       <div @click="substric" class="left">-</div>
       <div class="middle">{{count}}</div>
       <div @click="add" class="right">+</div>
   </div>
</template>
   
<style scoped>
   .left,.middle,.right{
       display: inline-block;
       width: 30px;
       height: 30px;
       line-height: 30px;
       text-align: center;
       border:1px solid rgba(92,92,92,0.3);
   }
</style>
   
<script>
   export default {
       data() {
           return {
                count:1
           }
       },
       props: ['initCount','goodsId'],
       created() {
           this.count = this.initCount
       },
       methods: {
            substric(){
                if(this.count<=1) return

                this.count--
                this.notify()
            },
            add(){
                this.count++
                this.notify()
            },
            notify(){
                //子组件，通过触发自定义事件，把我们商品id和数量传递给父组件
                this.$emit('numberChange',{goodsId:this.goodsId,count:this.count})
            }
       }
   }
</script>