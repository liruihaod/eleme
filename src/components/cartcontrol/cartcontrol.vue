<template lang="html">
      <div class="cartcontrol">
          <!-- 减小 -->
          <div class="cart-decrease " v-show="food.count>0" @click.stop.prevent="reduce($event)|debounce 0"
            transition="move">
            <div class="inner icon-remove_circle_outline"></div>
          </div>
          <div  class="cart-count" v-show="food.count>0">
            {{food.count}}
          </div>
          <div class="cart-add icon-add_circle" @click.stop.prevent="Addfoods($event)|debounce 0">
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
      },
      total:{
        type:Number,
      }
    },
    data(){
      return{
        listShow:false
      } 
    },
    methods:{
      Addfoods(event){
      event.stopPropagation();
        // 这里是防止多次点击。
        if(!this.food.count){
          Vue.set(this.food,'count',1);
        }else{
          this.food.count++;
        }
        // 当添加一个商品的时候 执行一个派发事件
        this.$dispatch('cart.add',event.target);
      },
      goto(){
        console.log("三大赵日天")
      },
      reduce(event){
        if(this.food.count>1){
          this.food.count--
         this.$nextTick(()=>{
            if(this.total==0){
             this.$dispatch('empty.hide',event.target);
          }
         })
          return this.food.count;
        }else {
           this.food.count=0;
          this.$nextTick(()=>{
          if(this.total==0){
             this.$dispatch('empty.hide',event.target);
          }
          })
          return this.food.count;
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
