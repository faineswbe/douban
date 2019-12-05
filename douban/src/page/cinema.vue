<template>
    <div class="cinema">
        <div class="nav">
                 <div class="back-icon">
                      <svg class="icon" aria-hidden="true" @click="back()">
                        <use xlink:href="#iconxiangzuo"></use>
                    </svg>
                 </div>
               
                <p>院线电影</p>
                <svg class="icon ellipsis-icon" aria-hidden="true" >
                    <use xlink:href="#iconshenglvehao"></use>
                </svg>
        </div>
        <div class="classify-nav nav-space">
                <span :class="index==0?'active':''"  @click="change(0)">正在热映</span> 
                <span :class="index==1?'active':''" @click="change(1)" >即将上映</span>
                <span :class="index==2?'active':''"  @click="change(2)">11月观影指南</span> 
        </div>
        <div class="big-box">
             <div class="big-box-width nav-space"  :class="{'type1':index==0,'type2':index==1,'type3':index==2}">
                <scroll class="wrapper" :data="data" @scrollToEnd="scrollToEnd" :pullup="true">
                    <div>
                    
                            <div class="hot-movie container" v-if="hotmovie!=''">
                                <ul>
                                    <li class="clauses" v-for="(movie,index) in hotmovie" :key="index" v-if="index<pullnum*5">
                                        <cinema :id='movie.id' :type="1" @loadingok="loadingok"></cinema>   
                                    </li>
                                </ul>
                            </div> 
                    </div>
                </scroll>
                <div class="comming-movie container"   v-if="commingmovie!=''">
                    <div class="navv">
                        <div class="come-nav nav-space">
                            <div class="yingshi">
                                影视 <span>{{commingtotal}}</span>
                            </div>
                            <div></div>
                            <div class="sort">
                                <p class="sort-index" :class="{'cometype0':comeType==0,'cometype1':comeType==1}"></p>
                                <span @click="timesort()" :style="{color:(comeType==0?comeTypeColor:'#999')}" >时间</span>
                                <span @click="hotsort()" :style="{color:(comeType==1?comeTypeColor:'#999')}">热度</span>
                            </div>
                            <div class="come-time">
                                上映时间
                            </div>
                        </div>
                    </div>
             
                     <div class="week weekfixed" >123</div>
                        <scroll class="wrapper" :bounce="bounce2" :data="data" @scrollToEnd="scrollToEnd" :pullup="true">
                        <ul>
                            <li class="clauses" v-for="(movie,index) in commingmovie" v-if="index<pullnum*5">

                                <div class="week" >
                                  {{
                                       /(\d{4})-(\d{2})-(\d{2})/.exec(movie.mainland_pubdate)[2]+'月'+/(\d{4})-(\d{2})-(\d{2})/.exec(movie.mainland_pubdate)[3]+'日，'
                                      +week(movie.mainland_pubdate)
                                      }}
                                </div>
                                <div class="cinema">
                                    <cinema class="cinema-movie"  :id='movie.id' :type="2" @loadingok="loadingok"></cinema>   
                                </div>
                            </li>
                        </ul>
                    </scroll>
                </div> 
                <div class="movie-guide">

                </div>  
            </div>
            <div class="loading"  v-if="index==0&&hotstate||index==1&&comestate">
                <loading></loading>
            </div>
        </div>       
    </div>
</template>
<script>
import scroll from '@/components/betterScroll'
import cinema from '@/components/main/book/movie/cinemaMovie';
import loading from '@/components/loading'
import compare from '@/js/compare.js'
export default {
    components:{
        scroll,
        cinema,
        loading,
    },
    data(){
        return{
            index:this.$route.params.id,
            hotmovie:'',
            commingmovie:'',
            commingtotal:'',
            hotstate:true,
            comestate:true,
            data:0,
            pullnum:1,
            bounce2:{
                 top: false,
                botom: true,
                left: true,
                right: true
            },
            comeType:0,
            comeTypeColor:'#444'
        }
    },
    methods:{
        week(data){
            let week=new Date(data).getDay();
            switch(week){
                case 0:return '星期天'; break;
                case 1:return '星期一'; break;
                case 2:return '星期二'; break;
                case 3:return '星期三'; break;
                case 4:return '星期四'; break;
                case 5:return '星期五'; break;
                case 6:return '星期六'; break;
            }
          
        },
        back(){
            this.$router.go(-1);
        },
        change(index){
            this.index=index;
            this.pullnum=1;
        },
         getmovie1(){
            this.state=true;
            this.$axios.get("movie/in_theaters?apikey="+this.apikey) 
            .then(res => {
                this.hotmovie=res.data.subjects;
                this.$nextTick(function(){
                    this.hotstate=false;   
               })               
            })
            .catch(err => {
                alert("数据接收失败");
            });
        },
         getmovie2(){
            this.state=true;
            this.$axios.get("movie/coming_soon?apikey="+this.apikey) 
            .then(res => {
                this.commingmovie=JSON.parse(JSON.stringify(res.data.subjects));
                this.timesort();
                this.commingtotal=res.data.total;
                this.comestate=false;  
                 this.$nextTick(function(){
                     this.comestate=false; 
               })  
            })
            .catch(err => {
                alert("数据接收失败");
            });
        },
        loadingok(){
            this.data++;
        },
        scrollToEnd(){
            this.pullnum++;
        },
        hotsort(){
            this.comestate=true; 
            this.comeType=1;
            let sort1=JSON.parse(JSON.stringify(this.commingmovie));
            let  sortArray = sort1.sort((compare('collect_count','asc')));
            this.commingmovie=sortArray; 
            setTimeout(()=>{
                 this.comestate=false; 
            },2000);        
           // this.comestate=false; 
        },
        timesort(){
            if(this.comeType==1){
                this.comestate=true; 
                this.comeType=0;
                let sort1=JSON.parse(JSON.stringify(this.commingmovie));
                let  sortArray = sort1.sort((compare('mainland_pubdate','desc')));
                this.commingmovie=sortArray; 
                setTimeout(()=>{
                    this.comestate=false; 
                },2000);    
            }               
        }
    },
    mounted(){
     
        this. getmovie1();
        this. getmovie2();
        
    },
    // computed: {
    //     comeid() {
    // 　　　　return this.commingmovie.id
    // 　　}
    // },
    // watch:{
    //     comeid(newV,oldV){

    //     }
    // }
}
</script>
<style lang="scss" scoped>
.cinema{
    .nav{
        z-index: 100;
        background-color: white;
        padding:0.4rem;
        width: 10rem;
        height:1.3rem;
        position: fixed;
        top:0;
        left: 0;
        color:#444;
        .back-icon{
            position: absolute;
            height:1rem;
            width: 1rem;
            left:0.1rem;
            top:0.45rem;
        }
        p{
            font-size:0.5rem;
            font-weight: 500;
            text-align: left;
            padding-left:1.2rem;
        }
        .ellipsis-icon{
            position: absolute;
            right:0.4rem;
            width:0.6rem;
            height:0.6rem;
            top:00.4rem;
        }
    }
    .classify-nav{
        z-index:100;
        position: fixed;
        top:1.2rem;
        left: 0;
        border-bottom:0.01rem solid #DCDCDC;
        height:1.1rem;
        width: 10rem;
        background-color: white;
        span{
            display: block;
            color:#888;
            margin:0 0.45rem;
            height:100%;
            font-size:0.45rem;
           padding:0.2rem 0;
        }
        .active{
            font-weight: 800;
            color:#222;
            border-bottom: 0.05rem solid #222;
        }
    }
    .hot-movie{
        .clauses{
            padding:0.4rem 0;
            border-bottom: 0.02rem solid rgb(245,245,245)
        }
    }
    .wrapper, .comming-movie,.movie-guide{
        width:10rem;
        display: inline-block;
         height:calc(100vh - 2.4rem);
    }
    .comming-movie{
        position: relative;
        .week{
            font-size: 0.37rem;
            color:#888;
            width:10rem;
            line-height: 0.89rem;
            text-align: left;
            padding-left: 0.45rem;
            height:0.8rem;
            background-color: rgb(245,245,245);
        }
        .weekfixed{
            position: absolute;
            left: 0;
            top:1rem;
            z-index:10000;
        }
        .navv{
            height:0.89rem;
            position: relative;
        }
        .come-nav{
            position: absolute;
            left: -0.45rem;
            top:-0.32rem;
            width:10rem;
            padding:0.2rem 0.45rem 0 0.45rem;
            z-index:100;
            background-color: white;
            height:1.2rem;
            color:#444;
            .yingshi{
                text-align: left;
                span{
                    color:#888;
                }
            }
            .sort{
                overflow: hidden;
                text-align: center;
                border-radius: 1rem;
                position: relative;
                width:2.5rem;
                height:0.8rem;
                line-height: 0.8rem;
                background-color: rgb(240,240,240);
                span{
                    position: relative;
                    z-index:1000;
                    display: inline-block;     
                    height:70%;                                
                    width: 47%;
                    margin-top: 0.055rem;
                    font-size:0.3rem;
                } 
                .sort-index{
                    height:100%;
                    width:50%;
                     z-index:999;
                    background-color: rgb(252,252,252);
                    border:0.014rem solid rgb(195,195,195);
                    border-radius: 1rem;
                    position: absolute;
                    left: 0;
                    top:0;
                    transition: all 0.5s;
                }
            }
        }
        .come-nav > div{
            width:25%;
            height:100%;
            line-height: 0.95rem;
        }
        .wrapper{
           width:100%;
        }
        .clauses{
            //background-color: rgb(245,245,245);
            // height:3.8rem;
            position: relative;
            .week{
                // font-size: 0.37rem;
                // color:#888;
                position: absolute;
                left: -0.45rem;
               // width:10rem;
                line-height: 0.89rem;
                text-align: left;
                padding-left: 0.45rem;
                height:0.8rem;
                background-color: rgb(245,245,245);
            }
            .cinema{
                padding-top:0.8rem;
                .cinema-movie{
                     padding:0.4rem 0;
                }
            }
        }
    }
    .big-box{
        width:10rem;
        position: absolute;
        left: 0;
        top:2.4rem;
        height:calc(100vh - 2.4rem);
        overflow: hidden;
        .big-box-width{
            position: absolute;
            left: 0;
            top:0;
            width:30rem;
            height:100%;
            text-align: left;
            transition: all 0.5s;
        }
        .loading{
            position: absolute;
            left: 0;
            top:0;
            width:100%;
            height:100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: white;
        }
        
    }
    .type2 {
        transform: translate(-10rem,0rem); 
    }
    .type1{
         transform: translate(0rem,0rem); 
    }
    .type3{
         transform: translate(-20rem,0rem); 
    }
    .cometype0{
         transform: translate(0rem,0rem); 
    }
    .cometype1{
         transform: translate(1.2rem,0rem); 
    }
    .loading{
        position: absolute;
        left: 0;
        top:0;
    }
}
</style>