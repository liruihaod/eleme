<template lang="html">
        <div class="header">
           <div class="content-wrapper">
             <div class="avatar">
               <img width="64px" height="64px" :src="seller.avatar">
            </div>
           <div class="content">
             <div class="title">
               <span class="brand"></span>
               <span class="name">{{seller.name}}</span>
             </div>
             <div class="description">
             {{seller.description}}/{{seller.deliveryPrice}}分钟送达
             </div>
             <div vi-if="seller.supports" class="supports">
                <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                <span class="text">{{seller.supports[0].description}}</span>
             </div>
           </div>
            <div class="support-count" @click="showDetail()">
              <span class="count">{{seller.supports.length}}个</span>
              <span class="iconfont icon-keyboard_arrow_right"></span>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail()">
          <span class="icon"></span>
          <div class="text">{{seller.bulletin}}</div>
          <span class="iconfont icon-keyboard_arrow_right"></span>
        </div>
        <!-- // 这里添加一个背景 -->
        <div class="background">
          <img :src="seller.avatar" alt="" class="bg">
        </div>
        <div v-show="detailShow" class="details">
            <div class="details-weapper clearFix">
              <div class="details-main">
                <h1 class="name">{{seller.name}}</h1>
                <star class="star" :size="48" :score="seller.score"></star>
                <h2 class="info">优惠信息</h2>
                <div class="info-list">
                    <div v-for="item in seller.supports" class="supports">
                        <span :class="classMap[item.type]" class="icon"></span>
                        <span class="text">{{item.description}}</span>
                    </div>
                </div>
                <h2 class="info">商家公告</h2>
                <div class="content">
                    {{seller.bulletin}}
                </div>
              </div>
            </div>
            <div class="details-close" >
            <i class="icon-close" @click="hideDetail"></i>
            </span>
        </div>
        </div>
</template>

<script type="text/ecmascript-6">

// 引入star 组件
import star from '../star/star';

  export default {
    props: {
      seller: {
        // 类型为Object;
        type:Object
      }
    },
    created(){
      // 这里定义一个方法
      this.classMap=["decrease","discount","special","invoice","guarantee"];
    },
    //注册一个star
    data(){
      return {
        detailShow:false
      }
    },
    methods:{
      // showDetail:function(){
      //   this.detailShow=!this.detailShow
      // }
      // 其实也可以采用这一种方法
      hideDetail(){
        this.detailShow=false;
      },
      showDetail(){
        console.log("zone");
        this.detailShow=true;
      },

    },
    components: {
        star
      }
};
</script>

<style lang="scss">
  @import "../../common/stylus/mixin.scss";
  @import "../../common/stylus/base.scss";
  .header {
      color: white;
      width: 100%;
      background:rgba(7,17,27,.5);
      overflow:hidden;
      position:relative;
      .content-wrapper{
        padding:24px 12px 18px 24px;
        font-size:0;
        position:relative;
        display:flex;
        .avatar{
          display: inline-block;
          margin-right:16px;
          vertical-align: top;
          img{
              border-radius:2px;
          }
        }
        .content{
          .title{
              margin:2px 6px 8px 0;
            .brand{
              vertical-align: top;
                width:30px;
                height:18px;
                margin-right:6px;
                display:inline-block;
                @include bg-image('brand');
                background-size:30px 18px;
            }
            .name{
              font-size:16px;
              color:white;
              font-weight:bold;
              line-height: 18px;
              display: inline-block;
            }
          }
        .description{
          font-size:12px;
          color:white;
          font-weight:200;
          line-height: 12px;
        }
        .supports{
          margin-top:10px;
          .icon{
            margin:0 4px 2px 0;
            width:12px;
            height:12px;
            display:inline-block;
            background-size:12px 12px;
            background-repeat: no-repeat;
            vertical-align: top;
            &.decrease{
            @include bg-image('decrease_1');
          };
            &.discount{
            @include bg-image('discount_1');
          };
            &.invoice{
              @include bg-image('invoice_1');
            };
            &.guarantee{
              @include bg-image('guarantee_1');
            };
            &.special{
              @include bg-image('special_1');
            }
          }
          .text{
            font-size:10px;
            color:white;
            font-weight:200;
            line-height: 12px;
            display: inline-block;
          }
        }
        }
        .support-count{
            height:24px;
            line-height: 24px;
            font-size:10px;
            color:white;
            background-color:rgba(0,0,0,.2);
            padding:0 10px;
            border-radius:15px;
            position:absolute;
            right:12px;
            bottom:14px;
            .count{
              display:inline-block;
              vertical-align: top;
            }
            .iconfont{
              font-size:24px;
              display: inline-block;
            }
        }

      }
      .bulletin-wrapper{
          line-height: 28px;
          display: flex;
          justify-content:space-between;
          font-size:0;
        .icon{
          margin:8px 4px 0 12px;
          display:inline-block;
          width:22px;
          height:12px;
          vertical-align: top;
          @include bg-image(bulletin);
          background-size:22px 12px;

        }
        .text{
          vertical-align: top;
          display:inline-block;
          font-size:10px;
          color:white;
          line-height: 28px;
          overflow:hidden;
          white-space:nowrap;
          text-overflow:ellipsis;
          width:320px;
        }
        .iconfont{
          padding-right:12px;
          padding-left:4px;
          text-align:center;
          font-size:20px;
          margin-top:4px;
          vertical-align: top;
        }
      }
      .background{
        position: absolute;
        width:100%;
        top:100%;
        top:0;
        left:0;
        z-index: -1;
        filter:blur(10px);
        img{
          width:100%;
          height:100%;
        }
      }
      .details{
        display:block;
        position: fixed;
        width:100%;
        height:100%;
        top:0;
        left:0;
        bottom:0;
        z-index:10;
        background:rgba(7,17,27,.8);
        box-sizing:border-box;
        overflow:auto;
        &-weapper{
          min-height:100%;
          width:100%;
          @extend .clearFix;
          .details-main{
            // 向上和向下固定的宽度
            margin-top:64px;
            padding-bottom:64px;
            .name{
              font-size:16px;
              font-weight:700;
              color:white;
              line-height: 32px;
              width:100%;
              text-align:center;
            }
            .star{
              text-align:center;
            }
            .info{
              margin:28px 36px 24px 36px;
              font-size:16px;
              font-weight: 700;
              color:white;
              text-align:center;
              position:relative;
              line-height: 16px;
              &:after{
                content:"";
                display:block;
                width:112px;
                height:1px;
                background:rgba(255,255,255,.2);
                position:absolute;
                left:0;
                top:50%;
                transform:translate3d(0,-50%,0);
              };
              &:before{
                content:"";
                display:block;
                width:112px;
                height:1px;
                background:rgba(255,255,255,.2);
                position:absolute;
                right:0;
                top:50%;
                transform:translate3d(0,-50%,0);
              }
            }
            .info-list{
            padding-left:36px;
              >div{
                  width:100%;
                  margin-bottom:12px;
                  span{
                    display:inline-block;
                    vertical-align:top;
                  }
                  .icon{
                    width:16px;
                    height:16px;
                    margin-right:6px;
                    background-size:16px 16px;
                    background-repeat:no-repeat;
                    &.decrease{
                    @include bg-image('decrease_1');
                  };
                    &.discount{
                    @include bg-image('discount_1');
                  };
                    &.invoice{
                      @include bg-image('invoice_1');
                    };
                    &.guarantee{
                      @include bg-image('guarantee_1');
                    };
                    &.special{
                      @include bg-image('special_1');
                    }
                  }
                  .text{
                    font-size:12px;
                    font-weight:200;
                    line-height: 16px;
                    color:rgb(255,255,255);
                  }

              }
            }
          }
          .content{
            padding:0 48px;
            font-size:14px;
            font-weight:200;
            color:white;
            line-height:24px;
          }
        }
        .details-close{
          position: relative;
          width:32px;
          height:32px;
          margin:-64px auto 0 auto;
          clear:both;
          font-size:32px;
        }
      }

  }
</style>
