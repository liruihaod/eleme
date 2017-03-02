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
                <div transition="fade" @click.stop.prevent="addFirst" class="shopcartd" v-show="!food.count||food.count===0">
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
                <v-ratingselect :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></v-ratingselect>
            </div>
            <div class="rating-wrapper">
                <!--存在数据的时候-->
                <ul v-show="food.ratings&&food.ratings.length">
                    <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
                        <div class="rating-header">
                            <div class="time">
                                {{rating.rateTime| formatDate}}
                            </div>
                            <div class="right">
                                <span class="username">{{rating.username}}</span>
                                <img class="avatar" :src="rating.avatar" alt="头像">
                            </div>

                        </div>
                        <div class="text">
                            <p><span :class="{'icon-thumb_down':rating.rateType===0},{'icon-thumb_up':rating.rateType===1}"></span>{{rating.text}}</p>
                        </div>
                    </li>
                </ul>
                <!--不存在数据的时候 -->
                <div v-show="!food.ratings||!food.ratings.length">
                    暂无数据
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 这里载入滚动插件
    import BScroll from 'better-scroll';
    import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
    // 这里引入ratingselect组件
    import ratingselect from 'components/ratingselect/ratingselect.vue';
    // 这里引入Vue
    import {formatDate} from 'common/js/date';
    import Vue from 'vue';
    const POSITIVE = 0,
        NEGATIVE = 1,
        ALL = 2;
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showKey: false,
                selectType: NEGATIVE,
                onlyContent: false,
                desc: {
                    all: "全部",
                    positive: "推荐",
                    negative: "吐槽"
                }
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
            needShow(type,text){
                // 当 只看内容的情况下，且评论没有内容
                if(this.onlyContent && !text){
                    return false;
                }
                // 显示展开全部
                if(this.selecType===ALL){
                    return true;
                }else {
                    // 如果不是暂开全部,则是什么类型就展示什么类型。
                    return type === this.selectType;
                }
            },
            hide() {
                this.showKey = false;
            },
            addFirst(event) {
                // 这里防止pc多次点击
                if (!event._constructed) {
                    return;
                }
                // 给购物车消失添加一个动画。
                this.$dispatch('cart.add', event.target);
                Vue.set(this.food, 'count', 1)
            },
            _select(type) {
                this.selectType = type;
                this.$nextTick(()=>{
                    this.foodS.refresh();
                })
            },
            _change(Boolean) {
                this.onlyContent = Boolean;
                this.$nextTick(()=>{
                    this.foodS.refresh();
                })
            }
        },
        components: {
            'v-cartcontrol': cartcontrol,
            'v-ratingselect': ratingselect
        },
        filters:{
            formatDate(time){
                let date=new Date(time);
                return formatDate(date,'yyyy-MM-dd hh:mm');
            }
        },
        events: {
            'ratingtype.select'(target) {
                this._select(target);
            },
            'content.change'(target) {
                this._change(target);
            }
        }
    }
</script>

<style lang='scss'>
@import "../../common/stylus/mixin.scss";
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
            padding-top:18px;
           h1{
            font-size:14px;
               font-weight:700;
               color:rgb(7,17,27);
               line-height:14px;
               margin-bottom:8px;
               padding-left:14px;
           }
       }
       .rating-wrapper{
        ul{
            li{
                 padding:18px;
                 @include border-1px(rgba(7,17,27,.1));
                 .rating-header{
                     display:flex;
                     justify-content: space-between;
                     .right{
                         span{
                             display:inline-block;
                             font-size:10px;
                             color:rgb(147,153,159);
                             line-height:12px;
                             margin-right:6px;
                         }
                         .avatar{
                             width:12px;
                             height:12px;
                             display:inline-block;
                         }

                     }
                 }
                 .text{
                     padding:6px 0 16px 0;
                     p{
                         font-size:12px;
                         color:rgb(7,17,27);
                         line-height:16px;
                        span{
                         font-size:12px;
                         color:rgb(147,153,159);
                         line-height:24px;
                         margin-right:4px;
                         &.icon-thumb_up{
                             color:rgb(0,160,220);
                         }
                        }
                     }
                     
                 }
            }
        }
       }
     }
</style>