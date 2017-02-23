<template lang="html">
    <dis class="goods">
      <div class="menu-wrapper" v-el:menu-wrapper>
        <ul>
          <li v-for="item in goods" :class="{'zone':currentIndex===$index}" @click="clickRerun($index,$event)">
            <p><span v-show="item.type>1" class="icon" :class="classMap[item.type]"></span>{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" v-el:foods-wrapper>
        <ul>
          <li  v-for="item in goods" class="food-list-hook food-list" >
              <h3>{{item.name}}</h3>
              <a @click="setFood(items)|debounce 0"  v-for="items in item.foods">
                <img v-bind:src="items.icon" alt="" class="foods-icon">
                <div class="foods-info">
                  <h2>  {{items.name}}</h2>
                  <span  v-show="items.description!=''" class="description">{{items.description}}</span>
                  <div class="foods-info-evaluate">
                    <span>月售{{items.sellCount}}份</span>
                    <span>好评率{{items.rating}}%</span>
                  </div>
                <div class="foods-price">
                  <div>
                    <span class="foods-sale-price">¥{{items.price}}</span>
                    <span v-show="items.oldPrice!=''" class="foods-old-price">¥{{items.oldPrice}}</span>
                  </div>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol v-ref:cartcontrol :food="items"></v-cartcontrol>
                </div>
                </div>
              </div>
              </a>

          </li>
        </ul>
      </div>
    </dis>
<v-shopcart v-ref:shopcart :select-foods="selectedFood" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopcart>
  <v-food :food="setFoods" v-ref:food></v-food>
</template>

<script >
// 注入Better-scroll 组件
import BScroll from 'better-scroll';
// 注册购物车组件
import shopcart from 'components/shopcart/shopcart.vue';
// 注入添加列表组件
import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
// 注入food组件
import food from 'components/food/food.vue'; 
const ERR_OK = 0;

export default {
  // 这里传入一个数
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      // 定义select-foods的值
      selectedFood: {}
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    // 通过请求拿到参数
    this.$http.get("/api/goods").then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        this.$nextTick(() => {
           this.listHeight=[];
          this._initScroll();
          this._clacHeight();
        });
      }
    });
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$els.menuWrapper, {
        click:true
      });
      this.foodScroll = new BScroll(this.$els.foodsWrapper, {
        probeType: 3,
        click:true
      });
      this.foodScroll.on("scroll",(pos)=>{
        this.scrollY=Math.abs(Math.round(pos.y));
      })
    },
    _drop(target){
      // 父组件调用子组件的方法
      this.$nextTick(()=>{
        this.$refs.shopcart.drop(target);
      })
    },
    _empty(target){
      this.$refs.cartcontrol.goto(target);
    },
    foodShow(){
      
    },
    setFood(item) {
      this.setFoods=item;
         this.$refs.food.show(); 
    },
    _clacHeight(){
      let foodList=this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
      let height=0;
      this.listHeight.push(height);
      for(let i=0;i<foodList.length;i++){
        let item=foodList[i];
        height+=item.clientHeight;
        this.listHeight.push(height);
      }
    },
    //点击左边榜单实现左右两边联动
    clickRerun(index,event){
      if(!event._constructed){
            return;
      }
      let foodList=this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
      let el=foodList[index].offsetTop;
      this.foodScroll.scrollTo(0,-el,800);
    }
  },
  computed:{
    currentIndex(){
      for(let i=0;i<this.listHeight.length;i++){
        let height1=this.listHeight[i];
        let height2=this.listHeight[i+1];
        if(!height2||(this.scrollY>=height1 && this.scrollY<height2)){
          return i;
        }
      }
              return 0;
    },
    selectedFood(){
         let foods=[];
         this.goods.forEach((good)=>{          
           good.foods.forEach((food)=>{
            if(food.count){
              foods.push(food);
            }
           })
         })
         return foods;
  }
  },
  // 引入组件
  components: {
    'v-shopcart': shopcart,
    'v-cartcontrol': cartcontrol,
    'v-food':food
  },
  events:{
    'cart.add'(target){
      this._drop(target);
    },
    'empty.todo'(target){
      this._empty(target);
    }
  }
};
</script>

<style lang="scss">@import "../../common/stylus/mixin.scss";
.goods {
    position: absolute;
    top: 175px;
    bottom: 50px;
    width: 100%;
    display: flex;
    overflow: hidden;
    .menu-wrapper {
        width: 80px;
        flex: 0 0 80px;
        background: #f3f5f7;
        ul {
            li {
                font-size: 12px;
                color: #101010;
                font-weight: 200;
                line-height: 14px;
                min-height: 54px;
                display: table;
                padding: 0 12px;
                background:#f3f5f7;
                &.zone{
                    background:white;
                    font-weight:600;
                    border:none;
                    p{
                      color:red;
                      &:after{
                        display: none;
                      }
                    }
                }
                &.choose {
                    background: white;
                }
                p {
                    display: table-cell;
                    vertical-align: middle;
                    box-sizing: border-box;
                    width: 56px;
                    @include border-1px(rgba(7,17,27,.1));
                    .icon {
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        background-size: 16px 16px;
                        vertical-align: top;
                        &.decrease {
                            @include bg-image( 'decrease_2');
                        };
                        &.discount {
                            @include bg-image( 'discount_2');
                        };
                        &.invoice {
                            @include bg-image( 'invoice_2');
                        };
                        &.guarantee {
                            @include bg-image( 'guarantee_2');
                        };
                        &.special {
                            @include bg-image( 'special_2');
                        }
                    }
                }
            }
        }
    }
    .foods-wrapper {
        flex: 1;
        > ul {
            > li {
                h3 {
                    font-size: 12px;
                    color: rgb(147,153,159);
                    height: 26px;
                    line-height: 26px;
                    background: #f3f5f7;
                    position: relative;
                    padding-left: 14px;
                    &:after {
                        display: block;
                        content: "";
                        width: 1px;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background: #d9dde1;
                    }
                }
                > a {
                    display: flex;
                    padding: 18px;
                    img {
                        width: 58px;
                        height: 58px;
                        display: inline-block;
                        vertical-align: top;
                        margin-right: 10px;

                    }
                    .foods-info {
                        flex: 1;
                        display: inline-block;
                        padding-top: 2px;
                        position: relative;
                        height: 100%;
                        h2 {
                            font-size: 14px;
                            color: rgb(7,17,27);
                            line-height: 14px;
                        }
                        span {
                            font-size: 10px;
                            color: rgb(147,153,159);
                            line-height: 10px;
                        }
                        .description {
                            margin-top: 8px;
                        }
                        .foods-info-evaluate {
                            margin: 8px 0;
                            span {
                                margin-right: 12px;
                            }
                        }
                    }
                }
                .foods-price {
                    display: flex;
                    justify-content: space-between;
                    > div {
                        span {
                            display: inline-block;
                            font-size: 0;
                            line-height: 24px;
                            font-weight: 700;
                        }
                        .foods-sale-price {
                            font-size: 14px;
                            color: red;
                        }
                        .foods-old-price {
                            font-size: 10px;
                            color: rgb(147,153,159);
                        }
                    }
                }
                .cartcontrol-wrapper {
                    display: block;
                    position: absolute;
                    bottom: -8px;
                    right: 0;
                }
            }
        }
    }
}
</style>
