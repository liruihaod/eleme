<template lang="html">
      <div class="cartcontrol">
          <!-- 减小 -->
          <div class="cart-decrease " v-show="food.count>0" @click="reduce($event)"
            transition="move">
            <div class="inner icon-remove_circle_outline"></div>
          </div>
          <div  class="cart-count" v-show="food.count>0">
            {{food.count}}
          </div>
          <div class="cart-add icon-add_circle" @click="Addfoods($event)">
 
          </div>
      </div>
</template>

<script>
import Vue from "vue";
export default {
    props:{
      // 这里需要一个依赖food;
      food:{
        type:Object,
      }
    },
    methods:{
      Addfoods(event){
        console.log(event);
        // 这里是防止多次点击。
        if(!event._constructed){
          return;
        }
        if(!this.food.count){
          Vue.set(this.food,'count',1);
        }else{
          this.food.count++;
        }
        // 当添加一个商品的时候 执行一个派发事件
        this.$dispatch('cart.add',event.target);
      },
      goto(){
      },
      reduce(event){
        if(!event._constructed){
          return;
        }
        if(this.food.count>1){
          return this.food.count--
        }else {
          return this.food.count=0;
        }
      }
    },
    created(){
     
    }
}
</script>

<style lang="scss">
// 这里如果想要点击区域变大,又不想要图标发生太大的变化,可以使用padding来完成。

  .cartcontrol{
    font-size:0px;
    >div{
      display: inline-block;
      width:24px;
    }
    .cart-decrease{
      vertical-align: bottom;
      padding:6px;
      line-height: 36px;
      transition:all .3s linear;
      &.move-transition{
        opacity:1;
        transform:translate3d(0,0,0);
      .inner{
        transform:rotate(0);
        transition:all .3s linear;
      }
      }
      .inner{
        font-size:24px;
        color:rgb(0,160,220);
        vertical-align:bottom;
      };
      &.move-enter,&.move-leave{
          opacity:0;
          transform:translate3d(24px,0,0);
          .inner{
            transform:rotate(180deg);
          }
      }
    }
    .cart-count{
      font-size:10px;
      color:rgb(147,153,159);
      text-align:center;
      line-height: 36px;
      display:inline-block;
    }
    .cart-add{
       padding:6px;
       font-size:24px;
      color:rgb(0,160,220);
      vertical-align:bottom;
    }
  }
</style>
