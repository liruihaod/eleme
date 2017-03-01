<template>
    <div class="ratingselect border-1px">
        <!--上层展示区块 -->
        <div class="rating-type">
            <!-- 这里绑定on 通过selecType来判定-->
            <span @click="check(2,$event)" data-id="ALL" class="all" :class="{'on':selectType===2}">{{desc.all}}<em>{{ratings.length}}</em></span>
            <span @click="check(0,$event)" data-id="POSITIVE" class="positive" :class="{'on':selectType===0}">{{desc.positive}} <em>{{positive.length}}</em></span>
            <span @click="check(1,$event)" data-id="NEGATIVE" class="negative" :class="{'on':selectType===1}">{{desc.negative}} <em>{{negative.length}}</em></span>
        </div>
        <!--下层展示区块 -->
        <div @click="onlyShow()" class="switch" :class="{'on':onlyContent===true}">
            <span class="icon-check_circle"></span>
            <span>只看内容评价</span>
        </div>
    </div>
</template>
<script>

    // 定义三个常量
    const POSITIVE = 0,
        NEGATIVE = 1,
        ALL = 2;
    export default {
        props: {
            ratings: {
                type: Array,
                default() {
                    // 定义 default 默认值
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            // 是否选择可读内容
            onlyContent: {
                type: Boolean,
                default:false
            },
            desc: {
                type: Object,
                default() {
                    return {
                        all: "全部",
                        positive: "满意",
                        negative: "不满意"
                    }
                }
            }
        },
        computed:{
            // 这里是用到一个过滤器,来帮助我们取得我们想要的数组
            positive(){
                return this.ratings.filter((rating)=>{
                    return  rating.rateType===POSITIVE;
                })
            },
            negative(){
                return this.ratings.filter((rating)=>{
                    return rating.rateType===NEGATIVE;
                })
            }
        },
        methods:{
            check(num,event){
                // 这里判断下 event；防止多次点击
                if(!event._constructed){
                    return;
                }
                this.selectType=num;
                // 这里派发一个事件
                this.$dispatch('ratingtype.select',num);
            },
            onlyShow(){
                if(!event._constructed){
                    return;
                }
                 this.onlyContent=!this.onlyContent;
                 this.$dispatch('content.change',this.onlyContent);
            }
        }
    }

</script>

<style lang='scss'>
@import "../../common/stylus/mixin.scss";
    .ratingselect{
        .rating-type{
            padding:12px 0;
            @include border-1px(#eee);
            margin:0 18px;
           span{
                display:inline-block;
                border-radius:2px;
            &.all,&.positive{
                background:#ccecf8;
                color:#58636b;
                em{
                    color:#58636b;
                }
            }
            &.all.on,&.positive.on{
                background:rgb(0,160,220);
                color:white;
                em{
                    color:white;
                }
            }
            &.negative{
                background:rgba(77,85,93,.2);
                color:#58636b;
            }
            &.negative.on{
                background:rgba(77,85,93,1);
                color:white;
                em{
                    color:white;
                }
            }
            margin-right:8px;
            padding:8px 12px;
            em{
                font-style:normal;
                font-size:8px;
                color:#58636b;
                margin-left:2px;
            }
           }
        }
        .switch{
            padding:12px 0;
            margin:0 18px;
            line-height:24px;
            border-bottom:1px solid rgba(7,17,27,.1);
            span{
                display:inline-block;
                vertical-align: middle;
                &.icon-check_circle{
                    font-size:24px;
                }
              font-size:16px;
              color:rgb(147,153,159);
            }
            &.on{
                span{
                    &.icon-check_circle{
                    color:#00c850;
                }
                }
            }
        }
    }
</style>