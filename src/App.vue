<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <!-- 使用指令 v-link 进行导航 -->
      <div class="tab-itme">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-itme">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-itme">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <!-- 在这里展示内容 -->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  // 注册组件(使用相当路径)
  import header from 'components/header/heaer.vue';
  const ERR_OK = 0;
  export default {
    // 在vue中组件是可以被复用的。定义成对象，修改这个组件,可能会影响另外一个组件
    // 这里定义成一个函数
    data() {
      // return 一个对象
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        // 拿到返回的json对象
        response = response.body;
        console.log(response);
        if (response.errno === ERR_OK) {
          this.seller = response.data;
        } else {
        }
      })
    },
    components: {
      'v-header': header,
    }
  };
</script>

<style lang='scss'>
@import "common/stylus/mixin.scss";

        .tab{
          height:40px;
          line-height: 40px;
          display: flex;
          width:100%;
          border-bottom:1px solid black;
          &-itme{
            flex:1;
            text-align:center;
            font-size:14px;
            color:#aaa;
            &>a{
              display:block;
              text-decoration: none;
              font-size:14px;
              color:rgb(77,85,93);
              &.active{
                color:rgb(240,20,20);
              }
            }
          }

        }

</style>