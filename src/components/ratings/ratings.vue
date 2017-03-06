<template lang="html">
  <div class="ratings-wapper">
      <div class="ratings">
            <div class="ratings-header">
                  <div class="ratings-header-appraise">
                        <h2>3.9</h2>
                        <p>综合评分</p>
                        <span>高于周边商家{{good.rankRate}}%</span>
                  </div>
                  <div class="ratings-header-zone">
                        <div class="grade-start">
                              <span>服务态度</span>
                              <star :size="36" :score="good.serviceScore"></star>
                        </div>
                        <div class="grade-start">
                              <span>服务态度</span>
                              <star :size="36" :score="good.foodScore"></star>
                        </div>
                        <div class="grade-start">
                              <span>送达时间</span>
                              <time>{{good.deliveryTime}}</time>
                        </div>
                  </div>
            </div>
            <ratingselect></ratingselect>
            <!--数据展示 -->
      </div>
      </div>
</template>

<script>
      // 引入 star 组件
      import star from '../star/star';
      import BScorll from 'better-scroll';
      import ratingselect from 'components/ratingselect/ratingselect.vue'
      const ERR_OK = 0;
      export default {
            props: {

            },
            components: {
                  star,
                  ratingselect
            },
            data() {
                  return {
                        good: []
                  }
            },
            created() {
                  this.$http.get("/api/seller").then((response) => {
                        response = response.body.data;
                        this.good = response;
                        console.log(this.good.name);
                  });
            }
      }
</script>

<style lang="scss">

    .ratings{
      &-wapper{
            position:absolute;
            top:174px;
            left:0;
            bottom:0;
            width:100%;
            overflow:hidden;
      }
      &-header{
            display:flex;
      &-appraise{
             width:138px;
             text-align:center;
             position:relative;
             margin:18px 0;
             border-right:1px solid #eaeaea;
             flex:0 0 138px;
              h2{
              font-size:24px;
              color:rgb(255,153,0);
              line-height:28px;
              }   
              p{
                    font-size:12px;
                    color:rgb(7,17,27);
                    line-height:24px;
                    font-weight:700;
              }
              span{
                font-size:10px;
                color:rgb(7,17,27);
                display:inline-block;    
              }
              
            } 
      }
      .ratings-header-zone{
            padding:18px 24px;
            flex:1;
           .grade-start{
                 display:flex;
                 justify-content: flex-start;
                  >span{
               display:inline-block;
               font-size:12px;
               color:rgb(7,17,27);
               margin:0 12px 8px 0;
               line-height: 18px;
                   }
            >time{
                  display:inline-block;
                  vertical-align:middle;
                  font-size:12px;
                  color:rgb(147,153,159);
            }
           }
      }
    }
</style>