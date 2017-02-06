<template lang="html">
      <div class="shopcart">
          <div class="content">
            <div class="content-left">
              <div class="num" v-show="totalCount>0">{{totalCount }}</div>
              <div class="logo-wrapper">
                <div class="logo" :class="{'on':totalCount>0}">
                  <i class="inconfont icon-shopping_cart"></i>
                </div>

              </div>
              <div class="price" :class="{'on':totalCount>0}">¥{{totalPrice}}元</div>
              <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" :class="zone">
              <div class="pay">
                  {{payDead}}
              </div>
            </div>
          </div>
          <div class="shopcart-list" v-show="shopcartList!=null">
              <div class="shopcart-list-header">
                <span>购物车</span>
                  <a class="empty">清除</a> 
              </div>
              <ul class="shopcart-list-ct">
                <li v-for="item in shopcartList">
                    <span>{{item.name}}</span>
                   <div>
                    <span>{{item.price*item.count}}</span>  
                      <v-cartcontrol :food="food" class="cartcontrol"></v-cartcontrol>
                    </div> 
                </li>  
              </ul>
          </div>
      </div> 
</template>

<script>
import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
export default {
    props:{
      price:{
        type:Number,
        default:100
      },
      selectFoods:{
        // 如果是一个函数 这里的default 就是一个空数组
        type:Array
       
      },
      minPrice:{
        type:Number,
        default:0
        
      },
      deliveryPrice:{
        type:Number,
        default:0

      }
    },
    created(){
      console.log(this.shopcartList);
    },
    data(){
      return {
        shopcartList:[{
          name:"三大赵日22天",
          count:13,
          price:14,
          total:123,
        },{
          name:"三大赵日天",
          count:12,
          price:"14",
          total:123,
        },{
          name:"三大赵日天",
          count:3,
          price:"14",
          total:123
        },{
          name:"三大赵日天",
          count:5,
          price:"14",
          total:123
        },{
          name:"三大赵日天",
          count:1,
          price:"14",
          total:123
        },{
          name:"三大赵日天",
          count:1,
          price:"14",
          total:123
        }]
      }
    },
    computed:{

      // 这里利用一个计算方法
      totalPrice(){
        let total=0;
        this.selectFoods.forEach((food)=>{
          total+=food.price * food.count;
        })
        return total;
      },
      totalCount(){
        let count =0;
        this.selectFoods.forEach((food)=>{
          count  +=food.count;
        })
        // 拿到选择商品的总和。
        return count
      },
      // 同样用一个计算属性来描述
      payDead(){
        if(this.totalPrice===0){
          return `¥${this.minPrice}元起送`;
        }else if(this.totalPrice<this.minPrice){
          let diff=this.minPrice-this.totalPrice;
          return `还差¥${diff}元起送`;
        }else {
          return "去结算";
        }
      },
      zone(){
        if(this.payDead==0){
          return "zone1";
        }else if(this.minPrice>this.totalPrice&&this.totalPrice>0){
          return "zone2";
        }else if(this.totalPrice>=this.minPrice){
          return "zone3";
        } 
      }
    },
    components: {
      'v-cartcontrol':cartcontrol
    }
}
</script>

<style lang="scss">
@import "../../common/stylus/mixin.scss";

  .shopcart{
    display:block;
    position:fixed;
    left:0;
    bottom:0;
    width:100%;
    .content{
      width:100%;
      display:flex;
      justify-content:space-between;;
      height:50px;
      line-height: 50px;
      &-left{
        display:flex;
        justify-content: flex-start;
        position:relative;
        flex:auto;
        background:#141d27;
        .num{
          position:absolute;
          top:-7px;
          left:35px;
          width:24px;
          height:16px;
          line-height: 16px;
          text-align:center;
          border-radius:16px;
          font-size:9px;
          font-weight:700;
          color:white;
          background:red;
          z-index: 3;
          box-shadow:0 4px 8px 0 rgba(0,0,0,.4);
        }
        .logo-wrapper{
        position: absolute;
        font-size:24px;
        z-index: 2;
        background:#2b333b;
        color:rgba(255,255,255,.5);
        line-height: 24px;
        border:3px solid #141d27;
        border-radius:100%;
        overflow:hidden;
        left:10px;
        top:-6px;
        .logo{
          width:44px;
          line-height: 44px;
          text-align:center;
          height:44px;
          font-size:24px;
          &.on{
            background:rgb(0,160,220);
            color:#fff;

          }
        }

        }
        .price{
          margin-left:65px;
          font-size:16px;
          color:rgba(255,255,255,.4);
          line-height:50px;
          padding-right:12px;
          position:relative;
          &.on{
            color:white;
          }
          &:after{
            position: absolute;
            content:"";
            display:block;
            width:1px;
            height:25px;
            background:#aaa;
            z-index: 1;
            top:50%;
            right:0;
            transform:translate3d(0,-50%,0);
          }

        }
        .desc{
          margin-left:12px;
          font-size:16px;
          color:rgba(255,255,255,.4);
          font-weight:700;
          line-height: 50px;
        }

      }
      &-right{
        flex:0 0 105px;
        width:105px;
        box-sizing:border-box;
        padding:0 8px;
        line-height: 50px;
        text-align:center;
        font-size:12px;
        color:rgba(255,255,255,.7);
        font-weight:700;
        background:rgba(0,0,0,.2);
        &.zone3{
          background:#00a0dc;
          color:white;
        }
      }
    }
    &-list{
    position:fixed;
    bottom:50px;
    max-height:305px;
    width:100%;
    background:white;
    overflow-y:auto;
    -webkit-overflow-scrolling: touch;
      &-header{
        height:40px;
        background:#f3f5f7;
        line-height: 40px;
        padding:0 18px;
        border-bottom:2px solid rgba(7,17,27,.1);
        display:flex;
        justify-content:space-between;
        span{
          display:block;
          font-size:14px;
          font-weight:200;
          color:rgb(7,17,27);
        }
        .empty{
          font-size:12px;
          color:rgb(0,160,220);
          line-height: 40px;
        }
      }
      &-ct{
        padding:0 18px;
      li{
        height:48px;
        @include border-1px(rgba(7,17,27,.1));
        display:flex;
        justify-content: space-between;
        >span{
          display:block;
          line-height: 48px;
          font-size:14px;
          color:rgb(7,17,27);
        }
        div{
          display:flex;
          span{
            display:inline-block;
            line-height: 48px;
            margin-right:12px;
          }
        }
      }
      
      }
    }
  }
</style>
