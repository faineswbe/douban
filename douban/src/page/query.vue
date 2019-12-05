<template>
<scroll class="wrapper">
    <div class="query">
        <search :search='this.$route.query.type' :state='true' @getInput="getInput"></search>
        <div class="content" v-if="state">
            <p class="title">热门书影音</p>
            <div class="hot">
                <div class="movie-list" v-for="movie in subject">
                    <div class="img">
                         <img :src="movie.subject.images.small" alt="">
                    </div>
                   <div class="detail">
                       <p>{{movie.subject.title}}</p>
                       <star :size="24" :score="movie.subject.rating.average/2" v-if="movie.subject.rating.average>0"></star>
                       <span class="score" v-if="movie.subject.rating.average>0">{{movie.subject.rating.average}}</span>
                       <p class="type">电影</p>
                   </div>
                </div>
            </div>
        </div>
         <div class="loading" v-if="loading">
            <loading></loading>
        </div>
    </div>
</scroll>
</template>
<script>
import scroll from '@/components/betterScroll'
import search from '../components/search.vue';
import star from '../components/main/book/star';
import loading from '../components/loading'
export default {
    components:{
        scroll,
        search,
        star,
        loading
    },
    data(){
        return{
            subject:'',
            state:false,
            loading:true
        }
    },
    methods:{
        gethot(){
            this.$axios.get("movie/weekly?apikey="+this.apikey) 
            .then(res => {
                this.state=true;
                this.subject=res.data.subjects;
                this.loading=false;
            })
            .catch(err => {
                alert("数据接收失败");
            });
        },
        getInput(data){
           this.$axios.get("movie/search?apikey=0b2bdeda43b5688921839c8ecb20399b&q="+data) 
            .then(res => {
             
            })
            .catch(err => {
                alert("数据接收失败");
            });
        }
    },
    mounted(){
        this.gethot();
    }
}
</script>
<style lang="scss" scoped>
.wrapper{
    height:100vh;
}
.query{
    .loading{
        background-color: #fff;
        position: absolute;
        top: 1.7rem;
        left: 0;
        width: 10rem;
        height: calc( 100vh - 1.7rem);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .content{ 
        padding-top: 1.5rem;
        &::before{
            content:'';
            display: block;
            height:0.2rem;
            width:10rem;
            margin-top:0.5rem;
            background-color: 	#F5F5F5;
        }
        .title{
            margin:0.3rem 0.4rem 0 0.4rem;;
            text-align: left;
            font-size:0.35rem;
            color:#455;
            font-weight: 700;
        }
        .hot{
            padding:0 0.4rem;
            .movie-list:nth-child(even){
                .img{   
                     width: 1.5rem;
                    padding-left:0.3rem;
                    border-left:0.04rem solid rgb(245, 245, 248);
                }
            }
            .movie-list{
                text-align: left;
                display: inline-flex;
                justify-content: space-between;
                width: 50%;
                padding:0.2rem 0;
                border-bottom: 0.04rem solid rgb(245, 245, 248);
                img{
                    width: 1.2rem;
                    height:1.8rem;
                    border-radius: 6px;
                }
                .img{
                    width: 1.2rem;
                    height:1.8rem;
                }
               
                .detail{
                    flex:auto;
                    padding:0.1rem 0 0.1rem 0.4rem;
                    text-align: left;
                    position: relative;
                    margin-right: 0.3rem;
                    height:1.5rem;
                    p{
                        display: block;
                        width: 2.8rem;
                        text-align: left;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        margin-bottom: 0.1rem;
                    }
                    .type{
                        display: block;
                        color:#888;
                        font-size:0.3rem;
                    }
                    .score{
                         color:#666;
                         font-size:0.3rem;
                         position: absolute;
                         left:2rem;
                         top:0.7rem;
                    }
                }
            }
        }
    }
}
</style>