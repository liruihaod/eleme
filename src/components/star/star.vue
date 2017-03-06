<template lang="html">
      <div class="star" :class="starType">
          <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" track-by="$index"></span>
      </div>
</template>

<script>

// 定义几个常量
 const LENGTH=5;
 const CLS_ON="on";
 const CLS_HALF="half";
 const CLS_OFF="off";

export default {
    // 接受一个数
    props:{
      size:{
        type:Number
      },
      score:{
        type:Number
      },
    },
    computed:{
        starType(){
          return 'star-'+this.size;
        },
        itemClasses(){
          let result=[];
          let score=Math.floor(this.score*2)/2;
          let hasDecimal=score%1 !==0;
          let integer=Math.floor(score);
          // 第一步先填充整星
          for(let a=0;a<integer;a++){
             result.push(CLS_ON);
          }
          // 如果存在小数,填充半星
          if(hasDecimal){
            result.push(CLS_HALF);
          }
          while(result.length<LENGTH){
            result.push(CLS_OFF);
          }
          // 最后返回这个数字
          console.log(result);
          return result;
        }
      }
    // 这里新增一个计算属性

};
</script>

<style lang="scss">
@import "../../common/stylus/mixin.scss";
      .star{
        font-size:0;
        .star-item{
          display:inline-block;
          background-repeat:no-repeat;
        }
        &.star-48{
          .star-item{
            width:20px;
            height:20px;
            margin-right:22px;
            background-size:20px 20px;
            &:last-child{
              margin-right:0;
            }
            &.on{
              @include bg-image('star48_on');
            }
            &.half{
              @include bg-image('star48_half');
            }
            &.off{
              @include bg-image('star48_off');
            }
          }
        }
        &.star-36{
          .star-item{
            width:15px;
            height:15px;
            margin-right:10px;
            background-size:15px 15px;
            &:last-child{
              margin-right:0;
            }
            &.on{
              @include bg-image('star36_on');
            }
            &.half{
              @include bg-image('star36_half');
            }
            &.off{
              @include bg-image('star36_off');
            }
          }
        }
        &.star-24{
          .star-item{
            width:10px;
            height:10px;
            margin-right:3px;
            background-size:10px 10px;
            &:last-child{
              margin-right:0;
            }
            &.on{
              @include bg-image('star24_on');
            }
            &.half{
              @include bg-image('star24_half');
            }
            &.off{
              @include bg-image('star24_off');
            }
          }
        }
      }
</style>
