<template>
    <div v-show="showKey" class="food" transition="move" v-el:food>
        <div>
            <a class="back icon-arrow_lift" @click="hide()"></a>
            <div class="food-headerBg">
                <img :src="food.image" alt="">
            </div>
            <div class="food-header bottom">
                <h1>{{food.name}}</h1>
                <aside>
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                </aside>
                <div class="food-header-main">
                    <div>
                        <span class="price">¥{{food.price}}</span>
                        <span class="oldprice" v-show="food.price">¥{{food.price}}</span>
                    </div>

                </div>
                <div class="cartontrol-wrapper">
                    <v-cartcontrol :food="food"></v-cartcontrol>
                </div>
                <div transition="fade" @click="addFirst" class="shopcartd" v-show="!food.count||food.count===0">
                    加入购物车
                </div>
            </div>

            <div class="food-referral bottom" v-show="food.info">
                <h1>商品介绍</h1>
                <p>
                    {{food.info}}
                </p>
            </div>
            <div class="food-estimate">
                <h1>商品评价</h1>
                <div class="food-estimate-nav">
                    <a class="all on">全部<span>11</span></a>
                    <a class="recommend">推荐<span>11</span></a>
                    <a class="say">吐槽<span>11</span></a>
                </div>
                <a class="food-estimate-choose">只看有内容的评价</a>
                <ul>
                    <li v-for="item in food.ratings">
                        <div class="header">
                            <div>
                                <span></span> span
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    // 这里载入滚动插件
    import BScroll from 'better-scroll';
    import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
    // 这里引入Vue
    import Vue from 'vue';

    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showKey: false
            }
        },
        computed: {
            time(time) {
                let now = new Date(time),
                    y = now.getFullYear(),
                    m = now.getMonth(),
                    d = now.getDate();
                return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
            }
        },
        methods: {
            show() {
                this.showKey = true;
                this.$nextTick(() => {
                    if (!this.foodS) {
                        this.foodS = new BScroll(this.$els.food, {
                            click: true
                        })
                    }
                });
            },
            hide() {
                this.showKey =false;
            },
            addFirst(event) {
                // 这里防止pc多次点击
                if (!event._constructed) {
                    return;
                }
                // 给购物车消失添加一个动画。
                this.$dispatch('cart.add', event.target);
                Vue.set(this.food, 'count', 1)
            }
        },
        components: {
            'v-cartcontrol': cartcontrol
        }
    }
</script>

<style lang='scss'>
    .bottom{
        margin-bottom:18px;
        box-shadow:0px 1px 0px rgba(7,17,27,.1),
                    0px 17px 0px #f3f5f7,
                    0px 18px 0px rgba(7,17,27,.1);
    }
    .food{
        position:fixed;
        left:0;
        top:0;
        bottom:50px;
        z-index:5;
        width:100%;
        background:white;
        &.move-transition{
            transform:translate3d(0,0,0);
            transition:all .2s linear;
        }
        &.move-enter, &.move-leave{
            transform:translate3d(100%,0,0);
        }
       
       &-headerBg{
           img{
               display:block;
               width:100%;
               height:375px;
           }
       }
       .back{
         font-size: 16px;
        position: fixed;
        top: 10px;
        left: 10px;
        color: white;
       }
       &-header{
           position:relative;
           padding:18px;
           background:white;
           h1{
               font-size:14px;
               font-weight:700;
               color:rgb(7,17,27);
               line-height:14px;
               margin-bottom:8px;
           }
           aside{
               margin-bottom:18px;
               span{
                   font-size:10px;
                   color:rgb(147,153,159);
                   line-height:10px;
                   margin-right:12px;
               }
           }
           &-main{
               display:flex;
               justify-content: space-between;
               span{
                   vertical-align: middle;
               }
               .price{
                   font-size:10px/14px;
                   font-weight:normal/700;
                   color:rgb(240,20,20);
                   line-height:24px;
                   margin-right:10px;
               }
               .oldprice{
                   font-size:10px;
                   font-weight:normal/700;
                   color:rgb(147,153,159);
                   line-height: 24px; 
                   text-decoration:line-through;
               }


           }
       }
       .cartontrol-wrapper{
           display:block;
           position:absolute;
           bottom:13px;
           right:12px;
       }
        .shopcartd{
                   width:84px;
                   color:white;
                   background:rgb(0,160,220);
                   height:24px;
                   line-height: 24px;
                   border-radius:12px;
                   text-align:center;
                   font-size:10px;
                   position:absolute;
                   bottom:18px;
                   right:12px;
                   &.fade-transition{
                       transition:all .5s linear;
                       opacity:1;
                   }
                   &.fade-enter,&.fade-leave{
                       opacity:0;
                   }
               }
       &-referral{
           padding:18px;
           h1{
            font-size:14px;
               font-weight:700;
               color:rgb(7,17,27);
               line-height:14px;
               margin-bottom:8px;
           }
           p{
            word-break: break-all;
           }
       }
       &-estimate{
           padding:18px;
           h1{
               font-size:14px;
               font-weight:700;
               color:rgb(7,17,27);
               line-height:14px;
               margin-bottom:8px;
           }
           &-nav{
            a{
                display:inline-block;
                padding:12px 10px;
                font-size:12px;
                margin-right:1px;
                span{
                    font-size:8px;
                    margin-left:4px;
                }
                margin-right:8px;
                border-radius:4px;
                &.on{
                    color:white;
                    background:rgb(0,160,220);
                }
                    color:#aaa;
                    background:rgba(77,85,93,.2)
            }
           }
       }
     }
</style>