<template>
   <div class="photo">
       <div class="slide">
            <scroll class="wrapper" :scrollX="true">
                <ul>
                    <li class="big">
                       <img :src="video.medium" alt="">
                    </li>
                    <li class="big" v-for="(photo,index) in photo" v-if="index<2">
                        <img :src="photo.thumb" alt="">
                    </li>
                  <li class="small" v-for="(photo,index) in photo" v-if="index>1&&index<8">
                        <img :src="photo.thumb" alt="">
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
    props:['video','photo'],
}
</script>
<style lang="scss" scoped>
.photo{
     position: relative;
     height:4rem;
    //  padding-bottom: 2rem;
    .slide{
         position: absolute;
         width: 10rem;
         overflow: hidden;
         left: -0.45rem;
         top: 0;
         height:4rem;
        ul{
            padding-left:0.45rem;
            width:27.4rem;
            &::after{
                 content:'';
                 display: block;
                 clear: both;
             }
            li{
                float: left;
                margin-right:0.02rem;
            }
            .big{
                img{
                     width:6rem;
                     height:4rem;
                }
            }
            .small{
               img{
                     width:2.8rem;
                     height:2rem;
                } 
            }
        }
    }
}
</style>