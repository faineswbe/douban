<template>
    <div class="movie">
        <!-- 电影页面内导航 -->
        <div class="search nav-space">
            <router-link tag="div" 
            :to="{name:nav.path}" 
            class="movie-nav" 
            v-for="(nav,index) in nav" 
            :key="index">
                <div :style="{backgroundColor:nav.color}">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href='nav.icon'></use>
                    </svg>
                </div>     
                <p>{{nav.text}}</p>
            </router-link>
        </div>
        <!-- 今日可播放电影 -->
        <div></div>
        <!-- 影院热映 -->
        <theaters></theaters>
         <theaters></theaters>
    </div>
</template>
<script>
import theaters from './movie/theaters'
export default {
    components:{
        theaters
    },
    data(){
        return{
            nav:[
                {
                    path:'book',
                    text:'找电影',
                    color:'#4c91d6',
                    icon:'#iconsearchlist'
                },
                 {
                    path:'book',
                    text:'豆瓣榜单',
                    color:'#efb539',
                    icon:'#iconpaihang1'
                },
                 {
                    path:'book',
                    text:'豆瓣猜',
                    color:'#14c216',
                    icon:'#iconcainixihuan'
                },
                 {
                    path:'book',
                    text:'豆瓣片单',
                    color:'#9e36d3',
                    icon:'#iconmovie'
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.movie{
    .search{
        padding-top: 2.6rem;
        .movie-nav{  
            padding:0.5rem 0.55rem 0.3rem 0.55rem;
            div{
                width:1.15rem;
                height:1.15rem;
                padding:0.18rem;
                display: inline-block;
                background-color: red;
                border-radius: 100px;
                margin-bottom: 0.15rem;
                svg{
                    width:0.7rem;
                    height:0.7rem;
                    color:white;
                }
            }
            p{
                font-size:0.35rem;
                color:#666;
            }
            
        }
    }
}
</style>