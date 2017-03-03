<template lang="html">
      <div class="ratings">
            <div class="ratings-header">
                  <div class="ratings-header-appraise">
                        <h2>3.9</h2>
                        <p>综合评分</p>
                        <span>高于周边商家{{good.rankRate}}</span>
                  </div>
                  <div class="ratings-header-grade">
                        <div class="grade-start">
                              <span>服务态度</span>
                              <start></start>
                        </div>
                        <div class="grade-start">
                              <span>服务态度</span>
                              <start></start>
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
</template>

<script>
      // 引入 star 组件
      import star from '../star/star';
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
      &-header{
            display:flex;
            justify-content: space-between;
      &-appraise{
             width:138px;
             padding:18px 0;
             text-align:center;
             position:relative;
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
    }
</style>