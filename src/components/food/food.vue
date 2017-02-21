<template>
    <div v-show="showFlag" class="food">

    </div>
</template>

<script>
export default {
    props:{
        food:{
            type:Object
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