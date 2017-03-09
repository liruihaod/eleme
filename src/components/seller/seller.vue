<template lang="html">
    <div class="seller" v-el:zone>
        <div class="seller-wrapper">
            <div class="seller-wrapper-header">
                <div>
                    <div class="seller-left">
                        <h2>{{seller.name}}</h2>
                        <div>
                            <star :size="36" :score="seller.score"></star>
                            <span>({{seller.ratingCount}}份)</span>
                            <span>月售{{seller.sellCount}}</span>
                        </div>
                    </div>
                    <div class="seller-right">
                        <span class="icon-favorite"></span>
                        <em class="selelr-right-tips">
                            已收藏
                        </em>
                    </div>
                </div>
            </div>
            <div class="seller-wrapper-nav bottom">
                <div>
                    <p>起送价</p>
                    <span><em>{{seller.minPrice}}</em>元</span>
                </div>
                <div>
                    <p>商家配送</p>
                    <span><em>{{seller.deliveryPrice}}</em>元</span>
                </div>
                <div>
                    <p>平均配送时间</p>
                    <span><em>{{seller.ratingCount}}</em>分钟</span>
                </div>
            </div>
            <div class="seller-wrapper-notice">
                <h3>公告与活动</h3>
                <p>
                    {{seller.bulletin}}
                </p>
            </div>
            <ul class="seller-wrapper-list bottom">
                <li v-for="item in seller.supports">
                    <img src="" alt="">
                    <p>{{item.description}}</p>
                </li>
            </ul>
            <div class="seller-wrapper-pics bottom" >
                <h3>商家实景</h3>
                <div v-el:img>
                    <div >
                    <img :src="item" alt="" v-for="item in seller.pics">
                    </div>
                </div>
            </div>
            <div class="seller-wrapper-info">
                <h3>商家信息</h3>
                <ul>
                    <li v-for="item in seller.infos">
                        {{item}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!--  <v-shopcart v-ref:shopcart :select-foods="selectedFood" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopcart>
  <v-food :food="setFoods" v-ref:food></v-food> -->
</template>

<script>
    import star from '../star/star';
    import BScroll from 'better-scroll';
    import shopcart from 'components/shopcart/shopcart.vue';
    import food from 'components/food/food.vue';

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        components: {
            star,
            'v-shopcart': shopcart,
            'v-food': food
        },
        created() {
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$els.zone, {
                    click: true
                })
                this.zone = new BScroll(this.$els.img,{
                    click:true,
                    scrollY:false
                })
            })
        }
    }
</script>

<style lang="scss">
    .bottom{
        margin-bottom:18px;
        box-shadow:0px 1px 0px rgba(7,17,27,.1),
                    0px 17px 0px #f3f5f7,
                     0px 18px 0px rgba(7,17,27,.1);
    }
    .seller{
              position:absolute;
            top:174px;
            left:0;
            bottom:0px;
            width:100%;
            overflow:hidden;
        &-wrapper{
            &-header{
                padding:18px;
                border-bottom:1px solid rgba(7,17,27,.1);
                >div{
                    display:flex;
                    justify-content: space-between;
                    .seller-left{
                        h2{
                            font-size:14px;
                            color:rgb(7,17,27);
                            line-height:14px;
                        }
                        >div{
                            margin-top:8px;
                            .star{
                                display:inline-block;
                            }
                            >span{
                                font-size:10px;
                                color:rgb(77,85,93);
                                line-height:18px;
                                :nth-of-type(1){
                                    margin-left:8px;
                                    magrin-right:12px;
                                }
                                vertical-align: top;
                            }
                        }
                    }
                    .seller-right{
                       text-align:center;
                       span{
                           font-size:24px;
                       color:rgb(240,20,20);
                       line-height:24px;
                       display:block;
                       }
                       em{
                           font-style:normal;
                           font-size:10px;
                           color:rgb(77,85,93);
                           line-height:10px;
                           margin-top:4px;
                       }

                    }
                }
            }
            &-nav{
                display:flex;
                >div{
                    flex:0 0 33.3%;
                    padding:18px 0;
                    text-align:center;
                    box-sizing:border-box;
                    border-left:1px solid rgba(7,17,27,.1);
                    :nth-of-type(3){
                        border-right:none;
                    }
                    p{
                        font-size:10px;
                        color:rgb(147,153,159);
                        line-height:10px;
                        margin-bottom:4px;
                    }
                    span{
                        display:block;
                        font-size:10px;
                        font-weight:200;
                        color:rgb(7,17,27);
                        line-height:24px;
                        em{
                            font-size:24px;
                            font-style:normal;
                        }
                    }
                }

            }
            &-notice{
                padding:18px 18px 0 18px;
                h3{
                     font-size:14px;
                     color:rgb(7,17,27);
                    line-height:14px;
                    margin-bottom:12px;
                    font-weight:600;
                }
                p{
                    font-size:12px;
                    font-weight:400;
                    color:rgb(240,20,20);
                    line-height:24px;
                    margin:0 12px 16px 12px;
                }
            }
            &-list{
                padding:0 16px;
                li{
                    padding:16px 12px;
                    border-top:1px solid rgba(7,17,27,.1);
                    img{
                        display:inline-block;
                        width:16px;
                        height:16px;
                        margin-right:6px;
                    }
                    p{
                        display:inline-block;
                        font-size:12px;
                        font-weight:200;
                        color:rgb(7,17,27);
                        line-height:16px;
                        font-weight:400;
                        vertical-align: top;
                    }
                }
            }
            &-pics{
                 padding:18px 18px 0 18px;
                h3{
                     font-size:14px;
                     color:rgb(7,17,27);
                    line-height:14px;
                    margin-bottom:12px;
                    font-weight:400;
                }
                >div{
                    div{
                        display:flex;
                    padding:12px 0 18px 18px;
                    img{
                        width:120px;
                        height:90px;
                        margin-right:6px;
                    }
                    }
                }
            }
            &-info{
                   padding:18px 18px 0 18px;
                h3{
                     font-size:14px;
                     color:rgb(7,17,27);
                    line-height:14px;
                    margin-bottom:12px;
                    font-weight:400;
                }
                ul{
                    li{
                        padding:16px 12px;
                        font-size:12px;
                        font-weight:200;
                        color:rgb(7,17,27);
                        line-height:16px;
                        border-top:1px solid rgba(7,17,27,.1);
                    }
                }
            }
        }
    }
</style>