<template>
    <div class="actor">
       <div class="slide">
            <scroll class="wrapper" :scrollX="true">
                <ul>
                    <li v-for="directors in directors" class="actors">
                        <img :src="directors.avatars.small" alt="">
                        <p>{{directors.name}}</p>
                        <p>导演</p>
                    </li>
                    <li v-for="casts in casts" class="actors">
                        <img :src="casts.avatars.small" alt="">
                        <p>{{casts.name}}</p>
                        <p>主演</p>
                    </li>
                </ul>
             </scroll>
       </div>

    </div>
</template>
<script>
import scroll from '@/components/betterScroll'
export default {
    components:{
        scroll
    },
    props:['directors','casts'],
    mounted(){
        console.log(this.directors,this.casts)
    }
}
</script>
<style lang="scss" scoped>
.actor{
     position: relative;
     height:4rem;
     .slide{
         position: absolute;
         width: 10rem;
         overflow: hidden;
         left: -0.45rem;
         top: 0;
         height:4rem;
         ul{
             width:15rem;
             &::after{
                 content:'';
                 display: block;
                 clear: both;
             }
         }
         li{
             float: left;
             margin-left:0.45rem;
             p{
                 color:white;
             }
         }
         .actors{
             img{
                 height:2.8rem;
                 width:1.8rem;
             }
         }
        
     }
    &::after{
        content:'';
        display: block;
        clear: both;
    }
}
</style>