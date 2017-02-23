<template>
    <div v-show="showKey" class="food">
        <div class="food-headerBg">
            <img src="{{food.image}}" alt="">
        </div>
        <div class="food-header">
            <h1>{{food.name}}</h1>
            <aside>
                <span>月售{{food.sellCount}}份</span>
                <span>好评率{{rating}}%</span>
            </aside>
            <div class="food-header-main">
                <div>
                    <span class="price">¥{{food.price}}</span>
                    <span class="oldprice" v-show="food.price">¥{{food.price}}</span>
                </div>
                <div class="shopcart">
                    加入购物车
                </div>
            </div>
            <div class="food-referral">
                <h1>商品介绍</h1>
                <p>
                    {{food.info}}
                </p> 
            </div>
            <div class="food-estimate">
                <h1>商品评价</h1>
                <div class="food-estimate-nav">
                    <a >全部<span></span></a>
                    <a >推荐</a> 
                    <a >吐槽</a>  
                </div>
                <a class="food-estimate-choose">只看有内容的评价</a>
                <ul>
                    <li  v-for="item in food.ratings">
                        <div class="header">
                            <div>
                                <span>{{time(food.rateTime)}}</span>
                                span
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        food:{
            type:Object
        }
    },
    data(){
        return {
            showKey:false
        }
    },
    computed:{
        time(time){
            let now=new Date(time),
                y=now.getFullYear(),
                m=now.getMoon(),
                d=now.getDate();
                return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
        }
    },
    methods:{
        show(){
            this.showKey=true;
        }
    }
}
</script>

<style lang='scss'>
    .food{
        position:fixed;
        left:0;
        top:0;
        bottom:50px;
        z-index:5;
        width:100%;
        background:white;
    }
</style>