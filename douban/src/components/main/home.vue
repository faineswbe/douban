<template>
    <div class="home">
        首页
        <div>
            <loading></loading>
        </div>
    </div>
</template>
<script>
import loading from '../loading'
export default {
    components:{
        loading
    },
    mounted(){
        this.$emit('getMsg',0);
    }
}
</script>
<style lang="scss" scoped>
.home{
    // position: relative;
    padding-top:1.7rem;
    .loading{
        background-color: #fff;
        position: absolute;
        top: 1.7rem;
        left: 0;
        width: 10rem;
        height: calc( 100vh - 1.7rem);
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

</style>