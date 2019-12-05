<template>
<div class="subject">
     <div class="nav">
                 <div class="back-icon">
                      <svg class="icon" aria-hidden="true" @click="back()">
                        <use xlink:href="#iconxiangzuo"></use>
                    </svg>
                 </div>
               
                <p>电影</p>
                <svg class="icon ellipsis-icon" aria-hidden="true" >
                    <use xlink:href="#iconshenglvehao"></use>
                </svg>
            </div>
    <scroll ref="scroll" class="wrapper" :bounce="bounce" :probeType="3"  @scrollHeight="scrollHeight" >
        <div class="movie-subject">
            <div class="clauses container" v-if="subject!=''">
                <div>
                    <img :src="subject.images.small" alt="">
                </div>
                <div class="detail">
                    <p class="title">{{subject.title}}</p>
                    <p class="englishTitle">{{subject.original_title}}({{subject.year}})</p>
                    <p class="shortdesc" @click="lookVideoInfo()">{{subject.countries[0]}} / 
                        <span v-for="genres in subject.genres">&nbsp;{{genres}}</span>
                        / 上映时间：<span>{{subject.mainland_pubdate}}(中国大陆) </span>/
                        片长：{{subject.durations[0]}}
                    <p>
                    <p>
                        <button>
                            <svg class="icon" aria-hidden="true" >
                                <use xlink:href="#iconguanzhu"></use>
                            </svg>
                        想看
                        </button>
                        <button>
                            <svg class="icon" aria-hidden="true" >
                                <use xlink:href="#iconshoucang"></use>
                            </svg>
                        看过
                        </button>
                    </p>
                </div>
            </div>
            <div class="record container">
                <div class="content">
                    <span>已看过？记录此刻感受</span>
                    <svg class="icon" aria-hidden="true" v-for="index of 5" :key="index">
                                <use xlink:href="#iconshoucang"></use>
                    </svg>
                    <svg class="icon right-icon" aria-hidden="true">
                                <use xlink:href="#iconyou"></use>
                    </svg>
                </div>
            </div>
            <div class="douban-score container">
                <div class="content" v-if="subject!=''" >
                    <doubanscore :subject='subject'></doubanscore>
                </div>
            </div>
            <div class="movie-desc container" v-if="subject!=''">
                <p  class="part-title">简介</p>
                 <textinit :text="subject.summary" :len="88" :size="0.4"></textinit>
                <i>举报简介</i>
            </div>
            <div class="movie-staff container" v-if="subject!=''">
                <p class="part-title">演职员</p>
                <actor :directors="subject.directors" :casts="subject.casts"></actor>
            </div>
            <div class="photos container" v-if="subject!=''">
                <p class="part-title">预告片 / 视频评论 / 剧照</p>
                <photo :video="subject.trailers[3]" :photo="subject.photos"></photo>
            </div>
             <div class="shortCom container" v-if="subject!=''" >
                 <div class="content">
                     <p class="part-title">短评</p>
                    <shortcomment :id="subject.id" @shortOK="shortOK" ></shortcomment>
                 </div>     
            </div>
            <div class="longComment" v-if="subject!=''" >
                <longCom ref="longCom" :id="subject.id" :state="state"  @longOK="longOK" @pulldown="pulldown"></longCom>
            </div>
        </div>
    </scroll>
     <div class="longCom" v-if="subject!=''" :class="{'longCom-inactive':longComment}">
        <longCom :id="subject.id"></longCom>
    </div>
    <div class="videoinfo" v-if="subject!=''">
        <videoinfo :id='subject.id'  @sendclose="getclose"></videoinfo>
    </div>
    <div class="loading" v-if="longState||subjectState">
        <loading></loading>
    </div>
</div>

</template>
<script>
import scroll from '@/components/betterScroll'
import loading from '@/components/loading'
import videoinfo from '@/components/main/book/movie/videoInfo'
import doubanscore from '@/components/main/book/movie/score'
import actor from '@/components/main/book/movie/actor'
import photo from '@/components/main/book/movie/photo'
import shortcomment from '@/components/main/book/movie/shortcomment'
import longCom from '@/components/main/book/movie/longCom'
import textinit from '@/components/textinit'
export default {
    components:{
        textinit,
        loading,
        scroll,
        loading,
        videoinfo,
        doubanscore,
        actor,
        photo,
        shortcomment,
        longCom,
    },
    data(){
        return{
            subject:'',
            longComment:false,
            data:0,
            commentHeight:0,
            longState:true,
            subjectState:true,
            shortState:true,
            stop:false,
            state:false,
            bounce: {
                top: true,
                bottom: false,
                left: true,
                right: true
            }
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        //查看影片信息
        lookVideoInfo(){
            
            document.getElementsByClassName("videoinfo")[0].className='videoinfo-active';
        },
        //查看影片信息关闭
        getclose(){
            document.getElementsByClassName("videoinfo-active")[0].className='videoinfo-close';
            setTimeout(()=>{
                document.getElementsByClassName("videoinfo-close")[0].className='videoinfo';
            },300);
        },
        // scrollup(){
        //     this.data++;
        // },
        scrollHeight(data){
           let longCommentHeight=document.getElementsByClassName("longComment")[0].offsetTop;
           let height=longCommentHeight-((document.body.clientHeight/100)*90);
           let topHeight=longCommentHeight-((document.body.clientHeight/100)*8);
        //    console.log(data,height);
           //console.log()
           if(Math.abs(data)>=height){
               this.longComment=true;
               if(Math.abs(data)>=topHeight){
                   this.state=true;
                }else{
                     this.state=false;
                } 
           }else{
                this.longComment=false;
              
              
           }
        },
        pulldown(data){
            console.log('subject',data);
            this.$refs.scroll.d_disable = data;
        },
        longOK(){
           this.longState=false;
        },
        shortOK(){
             this.shortState=false;
        },
    },
    mounted(){
        let id=this.$route.params.id;
        this.$axios.get("movie/subject/"+id+"?apikey="+this.apikey) 
        .then(res => {
           this.subject=res.data;
            this.$nextTick(function(){
                this.subjectState=false;
            })
        })
        .catch(err => {
            alert("数据接收失败");
        });
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    height:100vh;
}
.subject{
    .loading{
        background-color: #4F94CD;
        position: absolute;
        top: 0rem;
        left: 0;
        width: 10rem;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    background-color: #4F94CD;
    .part-title{
        text-align: left;
        color:white;
        font-size:0.5rem;
        margin-bottom: 0.2rem;
    }
    .movie-subject{
        background-color: #4F94CD;
    }
    .nav{
        z-index: 100;
         background-color: #4F94CD;
        padding:0.4rem;
        width: 10rem;
        height:1.3rem;
        position: fixed;
        top:0;
        left: 0;
        color:white;
        .back-icon{
            position: absolute;
            height:1rem;
            width: 1rem;
            left:0.4rem;
            top:0.4rem;
        }
        p{
            font-size:0.4rem;
        }
        .ellipsis-icon{
            position: absolute;
            right:0.4rem;
            width:0.6rem;
            height:0.6rem;
            top:00.4rem;
        }
    }
    .clauses{
        padding-top: 1.5rem;
        display: inline-flex;
        justify-content: space-between;
        img{
            height:4rem;
            width:2.8rem;
            border-radius: 6px;
        }
        .detail{
            flex: auto;
            color:white;
            padding-left: 0.4rem;
            span{
                display: inline-block;
            }
            p{
                text-align: left;
            }
            .title{
                font-size:0.6rem;
                font-weight: 700;
                margin-bottom: 0.1rem;
            }
            .englishTitle{
                font-weight: 700;
                margin-bottom: 0.3rem;
            }
            button:first-child{
               margin-right:0.4rem; 
            }
            button{
                width:2.6rem;
                height:1rem;
                border-radius: 4px;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                background-color: white;
                font-size:0.4rem;
                font-weight: 600;
                //  margin-right:0.4rem;
                svg{
                    color:coral;
                    height:0.4rem;
                }
            }
            .shortdesc{
                position: relative;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;/*重点，不能用block等其他*/
                -webkit-line-clamp: 2;/*重点IE和火狐不支持*/
                -webkit-box-orient: vertical;/*重点*/
                 width:5.6rem;
                 margin-bottom: 0.2rem;
                span{
                     font-size:0.3rem;
                }
                font-size:0.3rem;
                color:rgb(234, 244, 234);
                &::after{
                    content:'〉';
                    position: absolute;
                    right:0rem;
                    bottom: 0;
                }
            }
        }
    }

    .record{
        position: relative;
        .content{
            border-radius: 4px;
            padding:0.3rem 0;
            font-size:0.35rem;
            color:white;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(240, 240, 240, 0.2);
            span{
                margin-right:0.2rem;
            }
            svg{
                width:0.4rem;
                height:0.4rem;
            }
            .right-icon{
                position: absolute;
                right:0.7rem;
                width:0.6rem;
                height:0.6rem;
            }
        }
        &::after{
            content:'';
            position: absolute;
            right:1.7rem;
            top:-0.4rem;
            height:0rem;
            width: 0rem;
            border: 0.3rem solid;
              border-color: transparent transparent rgba(240, 240, 240, 0.2);
        }
    
    }
    .movie-desc{
        position: relative;
        padding-bottom: 0.6rem;
        div{
            text-align: left;
            color:white;
            font-size:0.4rem;
        }
        i{
            font-size:0.3rem;
            color:rgba(240, 240, 240, 0.6);
            font-style: normal;
            position: absolute;
            bottom: 0;
            right:0.7rem;
        }
    }
    .photos{
        padding-bottom: 1rem;
    }
    .shortCom{
        margin-bottom: 1rem;
       .content{
           border-radius: 0.2rem;
           padding:0.4rem; 
           background-color: rgba(40, 40, 40, 0.4);
       }
    }
    .longComment{
        // display: none;
        width: 10rem;
        background-color:rgb(232,232,232);
        border-radius: 0.4rem 0.4rem 0 0;
        overflow: hidden;
    }
    .longComment-top{
        display: block !important;
        position: fixed;
        top: 1.25rem !important; 
        left: 0;
    }
    .longCom{
        width: 10rem;
        background-color:rgb(232,232,232);
        border-radius: 0.4rem 0.4rem 0 0;
        overflow: hidden;
        position: fixed;
        top: 92vh; 
        left: 0;
    }
    .longCom-inactive{
        display: none;
    }
    // position: relative;
    .videoinfo{
        position: fixed;
        bottom: -100vh;
        left: 0;
        display: none;
    }
    .videoinfo-close{
         display: block;
         position: fixed;
         bottom: -100vh;
         left: 0;
         animation: videoinfo-close 0.3s;
    }
    @keyframes videoinfo-close{
        0%{
            bottom: 0;
        }
        100%{
            bottom: -100vh;
        }
    }
    .videoinfo-active{
         z-index:200;
         display: block;
         position: fixed;
         height:100vh;
         top:0;
         left: 0;
         animation: videoinfo 0.6s;
    }
    @keyframes videoinfo{
        0%{
            top: 100vh;
        }
        100%{
            top: 0;
        }
    }
   
}
</style>