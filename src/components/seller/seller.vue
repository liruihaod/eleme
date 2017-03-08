<template lang="html">
    <div class="seller">
        <div class="seller-wrapper">
            <div class="seller-wrapper-header">
                <div>
                    <div class="seller-left">
                        <h2>{{seller.name}}</h2>
                        <div>
                            <star :size="48" :score="seller.score"></star>
                            <span>({{seller.ratingCount}}份)</span>
                            <span>月售{{seller.sellCount}}</span> 
                        </div>
                    </div>
                    <div class="seller-right">
                        <span class="icon-favorite"></span>
                        <span class="selelr-right-tips">
                            已收藏
                        </span>
                    </div> 
                </div>
            </div>
            <div class="seller-warpper-nav">
                <div>
                    <p>起送价</p>
                    <span>{{seller.minPrice}}元</span>
                </div>
                <div>
                    <p>商家配送</p>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import star from '../star/star';
    import BScroll from 'better-scroll';
    export default {
        props: {
            seller: {
                type: Object
            }
        }, components: {
            star
        },
    }
</script>

<style lang="scss">
</style>