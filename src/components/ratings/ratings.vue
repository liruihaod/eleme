<template lang="html">
      <div class="ratings-wapper" v-el:ratings>
            <div class="ratings">
                  <div class="ratings-header bottom">
                        <div class="ratings-header-appraise">
                              <h2>3.9</h2>
                              <p>综合评分</p>
                              <span>高于周边商家{{good.rankRate}}%</span>
                        </div>
                        <div class="ratings-header-zone">
                              <div class="grade-start">
                                    <span>服务态度</span>
                                    <star :size="36" :score="good.serviceScore"></star>
                                    <em>{{good.serviceScore}}</em>
                              </div>
                              <div class="grade-start">
                                    <span>服务态度</span>
                                    <star :size="36" :score="good.foodScore"></star>
                                    <em>{{good.foodScore}}</em>
                              </div>
                              <div class="grade-start">
                                    <span>送达时间</span>
                                    <time>{{good.deliveryTime}}分钟</time>
                              </div>
                        </div>
                  </div>
                  <ratingselect :ratings="ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></ratingselect>
                  <!--数据展示 -->
                  <ul class="ratings-ul">
                        <li v-show="needShow(item.rateType,item.text)" v-for="item in ratings">
                              <div class="ratings-ul-header">
                                    <img :src="item.avatar" alt="" width="28px" height="28px">
                                    <div class="header-main">
                                          <div>
                                                <span>{{item.username}}</span>
                                                <div>
                                                      <star :size="24" :score="item.score"></star>
                                                      <em v-show="item.deliveryTime">{{item.deliveryTime}}分钟到达</em>
                                                </div>
                                          </div>
                                          <time>{{item.rateTime | formatDate}}</time>
                                    </div>
                              </div>
                              <p>
                                    {{item.text}}
                              </p>
                              <div class="ratings-label">
                                    <span :class="{'icon-thumb_down':item.rateType===0},{'icon-thumb_up':item.rateType===1}"></span>
                                    <ul>
                                          <li v-for="span in item.recommend">
                                                {{span}}
                                          </li>
                                    </ul>
                              </div>
                        </li>

                  </ul>
            </div>
      </div>
</template>

<script>
      // 引入 star 组件
      import star from '../star/star';
      import BScroll from 'better-scroll';
      import ratingselect from 'components/ratingselect/ratingselect.vue';
      import { formatDate } from 'common/js/date';
      const ERR_OK = 0;
          const POSITIVE = 0,
        NEGATIVE = 1,
        ALL = 2;
      export default {
            props: {
            },
            components: {
                  star,
                  ratingselect
            },
            data() {
                  return {
                        good: [],
                        ratings: [],
                        showFlag: false,
                        selecType: ALL,
                        onlyContent: true
                  }
            },
            filters: {
                  formatDate(time) {
                        let date = new Date(time);
                        return formatDate(date, 'yyyy-MM-dd hh:mm');
                  }
            },
            methods: {
                  needShow(type, text) {
                        // 当 只看内容的情况下，且评论没有内容
                        if (this.onlyContent && !text) {
                              return false;
                        }
                        // 显示展开全部
                        if (this.selecType === ALL) {
                              return true;
                        } else {
                              // 如果不是暂开全部,则是什么类型就展示什么类型。
                              return type === this.selectType;
                        }
                  },
                  _select(type) {
                        this.selectType = type;
                        this.$nextTick(() => {
                              this.scroll.refresh();
                        })
                  },
                  _change(Boolean) {
                        this.onlyContent = Boolean;
                        this.$nextTick(() => {
                              this.scroll.refresh();
                        })
                  }

            },
            created() {
                  this.$http.get("/api/seller").then((response) => {
                        response = response.body.data;
                        this.good = response;
                  });
                  this.$http.get("/api/ratings").then((response) => {
                        response = response.body.date;
                        this.ratings = response;
                        this.$nextTick(() => {
                              this.scroll = new BScroll(this.$els.ratings, {
                                    click: true
                              })
                        })

                  });

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

<style lang="scss">
.bottom{
        margin-bottom:18px;
        box-shadow:0px 1px 0px rgba(7,17,27,.1),
                    0px 17px 0px #f3f5f7,
                    0px 18px 0px rgba(7,17,27,.1);
    }
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
            flex:0 0 220px;
            @media only screen and (max-width:320px){
                  flex:0 0 150px;
                  width:150px;
                  padding:18px 14px;
            }
           .grade-start{
                 display:flex;
                  >span{
               display:inline-block;
               font-size:12px;
               color:rgb(7,17,27);
               margin:0 12px 8px 0;
               line-height: 18px;
               vertical-align:top;
               }
               .star{
                     margin-right:8px;
               }
             em{
                  font-style:normal;
                  font-size:12px;
                  color:blue;
            }
            >time{
                  display:inline-block;
                  vertical-align:middle;
                  font-size:12px;
                  color:rgb(147,153,159);
            }
           }
      }
      &-ul{
        >li{
            padding:18px;
            .ratings-ul-header{
                  display:flex;
                  img{
                        display:inline-block;
                        border-radius:50%;
                        margin-right:12px;
                  }
                  .header-main{
                        display:flex;
                        flex:1;
                        justify-content: space-between;
                        >div{
                              >span{
                                    font-size:10px;
                                    color:rgb(7,17,27);
                                    display:inline-block;
                                    margin-bottom:4px;
                              }
                              div{
                                  display:flex;
                                  justify-content: flex-start;
                                  >em{
                                        font-style:normal;
                                        margin-left:6px;
                                        color:rgb(147,153,159);
                                        font-size:10px;
                                        font-weight:200;
                                  }    
                              }
                        }
                        time{
                              font-size:10px;
                              font-weight:200;
                              color:rgb(147,153,159);
                        }
                  }
            }
            >p{
                        font-size:12px;
                        color:rgb(7,17,27);
                        margin-top:6px;
                        line-height:18px;
                        margin-bottom:8px;
                        margin-left:40px;
                  }
                  .ratings-label{
                        margin-left:40px;
                        display:flex;
              
                        >span{
                              font-size:12px;
                              color:rgb(0,160,220);
                              line-height:32px;
                              display:inline-block;
                              margin-right:8px;
                        }
                        ul{
                              display:flex;
                                        width:80%;
                        flex-wrap:wrap;
                              li{
                                    margin-bottom:10px;
                                    font-size:9px;
                                    color:rgb(148,153,159);
                                    line-height:16px;
                                    height:16px;
                                    border:1px solid rgba(7,17,27,.1);
                                    border-radius:1px;
                                    background-color:rgb(255,255,255);
                                    overflow:hidden;
                                    width:60px;
                                    text-align:center;
                                    margin-right:8px;
                                    white-space:nowrap;
                                    text-overflow:ellipsis;
                              }
                        }
                  }
        }    
      }
    }
</style>