<template>  
    <div class="main">  
        <scroll class="wrapper">  
            <div>
                <search :search='search' :state='false'></search>
                <router-view @getMsg='getMsg' ></router-view>
            </div>
        </scroll>
        <footers></footers>
    </div>    

</template>
<script>
import scroll from '@/components/betterScroll'
import search from '../components/search.vue';
import footers from '../components/footer';
export default {
    components:{
        scroll,
        search,
        footers
    },
    data(){
        return{
            search:0
        }
    },
    methods:{
        getMsg(data){
            this.search=data;
        }
    }
}
</script>
<style lang="scss" scoped>
.main{
    width: 10rem;
    .wrapper{
        height:90vh;
    }
}
</style>