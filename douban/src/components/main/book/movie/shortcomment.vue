<template>
    <div  class="shortcomment">
        <ul>
            <li v-for="(comments,index) in comments" :key="index" v-if="index<4">
                <div class="title">
                    <img :src="comments.author.avatar" alt="">
                    <div class="author">
                        <p>{{comments.author.name}}</p>
                        <star :size="24" :score="comments.rating.value"></star>
                        <i class="time">{{
                            /(\d{4})-(\d{2})-(\d{2})/.exec(comments.created_at)[2]+'月'+/(\d{4})-(\d{2})-(\d{2})/.exec(comments.created_at)[3]+'日'
                            }}</i>
                        <svg class="icon ellipsis-icon" aria-hidden="true" >
                            <use xlink:href="#iconshenglvehao"></use>
                        </svg>
                    </div>
                </div>
                <div class="com-content">
                     <textinit :text="comments.content" :len="93" :size="0.4"></textinit>
                </div>
                <div class="useful">
                     <svg class="icon useful-icon" aria-hidden="true" >
                            <use xlink:href="#icondianzan1"></use>
                    </svg>
                    <span>{{comments.useful_count}}</span>
                </div>
            </li>
            <li class="lookTotal nav-space">
                <p>查看全部短评</p>
                 <svg class="icon right-icon" aria-hidden="true">
                     <use xlink:href="#iconyou"></use>
                </svg>
            </li>
        </ul>
    </div>
</template>
<script>
import star from '../star';
import textinit from '@/components/textinit';
export default {
    components:{
        star,
        textinit
    },
    props:['id'],
    data(){
        return{
            comments:''
        }
    },
    mounted(){
        this.$axios.get("movie/subject/"+this.id+"/comments?apikey="+this.apikey) 
        .then(res => {
            this.comments=res.data.comments;
             this.$nextTick(function(){
                    this.$emit("shortOK");
            })
        })
        .catch(err => {
            alert("数据接收失败");
        });
    }
}
</script>
<style lang="scss" scoped>
.shortcomment{
    margin-top:0.8rem;
    .ellipsis-icon,.right-icon{
        color:rgb(210,210,210);
    }
    ul{
        li{
              color:white;
            .title{
                position: relative;
                text-align: left;
                img,div{
                    display: inline-block;
                }
                img{
                    width: 0.9rem;
                    height: 0.9rem;
                    border-radius:10rem;
                }
                .author{
                    padding-left: 0.2rem;
                    text-align: left;
                    p{
                        color:white;
                        font-size:0.4rem;
                        text-align: left;
                        padding-bottom: 0.05rem;
                    }
                    .time{
                        position: absolute;
                        left: 2.8rem;
                        bottom: 0.085rem;
                        font-size:0.25rem;
                        font-style: normal;
                        color:rgb(200,200,200);
                    }
                    .ellipsis-icon{
                        position: absolute;
                        right:0.2rem;
                        top:0.3rem;
                    }
                }
            }
            .com-content{
                padding:0.3rem 0;               
                text-align: left;
            }
            .useful{
                padding:0.1rem 0 0.3rem 0;
                text-align: left;
                margin-bottom: 0.3rem;
                border-bottom: 0.02rem solid rgba(240, 240, 240, 0.2);
                position: relative;
                svg,span{
                    color:rgb(210,210,210);
                }
                span{
                    display: block;
                    position: absolute;
                    left:0.7rem;
                    top:0.2rem;
                }
            }
        }
        .lookTotal{
            p{
                  font-size:0.4rem;
            }
          
        }
    }
}
</style>