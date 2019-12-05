<template>
    <div class="book">
        <!-- 头部书影音分类导航 -->
        <navigation></navigation>
        <router-view></router-view>
    </div>
</template>
<script>
import navigation from './book/nav'
export default {
    components:{
        navigation
    },
    mounted(){
        this.$emit('getMsg',1);
    }
}
</script>