<template>
    <div class="nav nav-space">
        <router-link tag="div" 
        :to="{name:nav.path}" 
        class="book-nav" 
        v-for="(nav,index) in nav" 
        :key="index">
            <p>{{nav.text}}</p>
        </router-link>
    </div>
</template>
<script>
export default {
    data(){
        return{
            nav:[
                {
                    path:'movie',
                    text:'电影'
                },
                {
                    path:'tv',
                    text:'电视'
                },
                {
                    path:'read',
                    text:'读书'
                },
                {
                    path:'novel',
                    text:'小说'
                },
                {
                    path:'music',
                    text:'音乐'
                },
                {
                    path:'city',
                    text:'同城'
                }

            ]
        }
    }
}
</script>
<style lang="scss" scoped>
$color1:#666;
.nav{
    border-bottom:0.01rem solid #DCDCDC;
    position: fixed;
    top:1.7rem;
    left: 0;
    background-color: white;
    .book-nav{
        padding:0 0.43rem;
        height:0.9rem;
        p{
            height:100%;
            font-size:0.4rem;
            color:#888;
        }
        &.router-link-active{
            p{
                color:#444;
                border-bottom: 0.06rem solid #222;
            }
        }
    }
}
</style>