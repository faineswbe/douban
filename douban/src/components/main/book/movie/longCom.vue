<template>
    <div class="longcom">
        <div class="nav">
            <i></i>
            <p>影评</p>
            <p>讨论</p>
        </div>
         <scroll class="wrapper" ref="scroll" :disable="true" :probeType="3" :bounce="bounce" @scrollHeight='scrollHeight' :stopPropagation="true"  >
            <div class="video-comment">
                <div class="video-nav nav-space">
                    <p>
                        影评列表
                    </p>
                    <div>
                        热门，最新，好友
                    </div>
                </div>
                <div class="video-content">
                    <ul>
                        <li v-for="(reviews,index) in reviews">
                            <div class="author">
                                <img :src="reviews.author.avatar" alt="">
                                <p>{{reviews.author.name}}</p>
                                <span>看过</span>
                                <star class="star" :size="24" :score="reviews.rating.value" ></star>
                            </div>
                            <div class="video-title">
                                {{reviews.title}}
                            </div>
                            <div class="video-content">
                                <p>
                                    {{reviews.summary}}
                                </p>
                                <commentimg :photo="JSON.parse(JSON.stringify(photo))" v-if="photo!=''"></commentimg>
                            </div>
                        </li>
                    </ul>
                </div>
            </div> 
         </scroll>
    </div>

</template>
<script>
import star from '../star';
import commentimg from './comImg';
import scroll from '@/components/betterScroll'
export default {
    components:{
        scroll,
        star,
        commentimg
    },
      props:['id','state'],
      data(){
          return{
              reviews:'',
              photo:'',
              data:0,
              probeType:2,
               bounce: {
                    top: false,
                    bottom: true,
                    left: true,
                    right: true
                }
          }
      },
      methods:{
          scrollHeight(data){
            //   console.log(data);
              if(data>=0){         
                   this.$refs.scroll.d_disable = true;
                   this.$emit("pulldown",false);
              }else{
                   this.$refs.scroll.d_disable = false;
                   this.$emit("pulldown",true);
              }
          }
      },
      mounted(){
        this.$axios.get("movie/subject/"+this.id+"/reviews?apikey="+this.apikey) 
            .then(res => {
                this.reviews=res.data.reviews;
            })
            .catch(err => {
                alert("数据接收失败");
            });
        this.$axios.get("movie/subject/"+this.id+"/photos?apikey="+this.apikey) 
            .then(res => {
                 this.photo=res.data.photos;
                 this.$nextTick(function(){
                    this.data++;
                    this.$emit("longOK");
                 })
            })
            .catch(err => {
                alert("数据接收失败");
            });

    },
    watch:{
        state:{
            handler(newV,oldV){
                console.log(newV);
                if(newV){
                    this.$refs.scroll.d_disable = false;
                }else{
                    //this.$refs.scroll.d_disable = true;
                }
            },
            deep:true
        },
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    height: calc(100vh - 2.55rem);
}
.longcom{
    .nav{
        z-index:100;
        height:1.3rem;
        text-align: left;
        padding-top:0.2rem;
        position: relative;
        width:10rem;
        background-color:rgb(232,232,232);
        border-bottom: 0.02rem solid rgb(220,220,220);
        i{
            position: absolute;
            left: 4.5rem;
            top:0.12rem;
            width:1rem;
            height:0.12rem;
            border-radius: 0.4rem;
            background-color: rgb(170,170,170);
        }
        p{
            display: inline-block;
            color:#59a5ff;
            font-size:0.42rem;
            padding:0.2rem 0 0.2rem 0;
            margin-left: 0.6rem;
            border-bottom: 0.06rem solid rgb(200,200,200);
        }
        @media  screen and (-webkit-min-device-pixel-ratio:0) {
            p {
                background: -webkit-gradient(linear,left top ,left bottom,from(rgb(100,100,100)),to(rgb(220,220,220)));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
    }
    .video-comment{
        .video-nav{
            padding:0.4rem;
            p{
                color:rgb(80,80,80);
            }
        }
        .video-content{
            ul{
                li{
                    padding:0.4rem;
                    .author{
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        margin-bottom: 0.1rem;
                        img{
                            width:0.7rem;
                            height:0.7rem;
                            border-radius:10rem;
                        }
                        p{
                            padding:0 0.2rem;
                             color:rgb(120,120,120)
                        }
                        span{
                            display: inline-block;
                            font-size:0.25rem;
                            color:rgb(100,100,100)
                        }
                        .star{
                            padding:0.15rem 0 0 0.1rem;
                        }
                    }
                    .video-title{
                        text-align: left;
                        font-size:0.45rem;
                        color:#000;
                        font-weight: 700;
                        margin-bottom: 0.15rem;
                    }
                    .video-content{
                        p{
                            margin-bottom: 0.2rem;
                             text-align: left;
                            font-size:0.4rem;
                            color:#444;
                            text-overflow: -o-ellipsis-lastline;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;/*重点，不能用block等其他*/
                            -webkit-line-clamp: 2;/*重点IE和火狐不支持*/
                            -webkit-box-orient: vertical;/*重点*/
                        }
                       
                    }
                }
            }
        }
    }
}
</style>