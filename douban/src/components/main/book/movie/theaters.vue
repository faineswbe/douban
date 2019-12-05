<template>
    <div class="theaters">
        <div class="nav nav-space">
            <div class="left">
                <span :class="index==0?'active':''" @click="change(0)">影院热映</span> 
                <span :class="index==1?'active':''"  @click="change(1)">即将上映</span> 
            </div>
            <router-link tag="div" :to="'/cinema/'+index" class="right">
                <span>全部
                    <em>{{total}}</em>
                    <em>></em>
                </span>
            </router-link>
        </div>
        <!-- 电影列表 -->
        <div class="hot-movie">
            <router-link tag="div" :to="'/subject/'+movie.id" class="movie-list" v-for="(movie,index) in subject" :key="index" v-if="index<6"> 
                <img :src="movie.images.small" alt="">  
                <p>{{movie.title}}</p>
                <star :size="24" :score="movie.rating.average/2" v-if="movie.rating.average>0"></star>
                <span class="comming" v-else>{{movie.mainland_pubdate}}</span>
               <span class="score" v-if="movie.rating.average>0">{{movie.rating.average}}</span>
            </router-link>
        </div>
        <div class="loading" v-if="state">
            <loading></loading>
        </div>
        <!-- 豆瓣热门 -->
        <!-- <div class="nav nav-space">
            <div class="left">
                <span :class="index==0?'active':''" >豆瓣热门</span> 
            </div>
            <router-link tag="div" to="/book" class="right">
                <span>全部
                    <em>500</em>
                    <em>></em>
                </span>
            </router-link>
        </div>
        <div class="hot-movie">
            <div class="movie-list" v-for="(movie,index) in subject" :key="index" v-if="index<6"> 
                <img :src="movie.images.small" alt="">  
                <p>{{movie.title}}</p>
                <star :size="24" :score="movie.rating.average/2" v-if="movie.rating.average>0"></star>
                <span class="comming" v-else>{{movie.mainland_pubdate}}</span>
               <span class="score" v-if="movie.rating.average>0">{{movie.rating.average}}</span>
            </div>
        </div> -->
    </div>
</template>
<script>
import star from '../star';
import loading from '../../../loading';
export default {
    components:{
        star,
        loading
    },
    data(){
        return{
            index:0,
            subject:'',
            total:0,
            state:true
        }
    },
    methods:{
        change(index){
            this.index=index;
            if(index==0){
                  this.getmovie1();
            }else{
                 this.getmovie2();
            }
        },
        getmovie1(){
            this.state=true;
            this.$axios.get("movie/in_theaters?apikey="+this.apikey) 
            .then(res => {
                this.subject=res.data.subjects;
                this.total=res.data.total;
                this.state=false;                
            })
            .catch(err => {
                alert("数据接收失败");
                //console.log(1)
            });
        },
        getmovie2(){
            this.state=true;
            this.$axios.get("movie/coming_soon?apikey="+this.apikey) 
            .then(res => {
                this.subject=res.data.subjects;
                this.total=res.data.total;
                 this.state=false;
            })
            .catch(err => {
                alert("数据接收失败");
            });
        },
    },
    mounted(){
        this.getmovie1();
    }
}
</script>
<style lang="scss" scoped>
$fontColor:#222;
.theaters{
    width:9.2rem;
    margin:auto;
    margin-top: 0.2rem;
    .loading{
        background-color: #fff;
        position: absolute;
        top: 6.5rem;
        left: 0;
        width: 10rem;
        height: calc( 100vh - 6.5rem);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .nav{
         border-bottom:0.01rem solid #DCDCDC;
         height:1.1rem;
         .left{
            span{
                display: inline-block;
                color:#888;
                width:2.3rem;
                margin-right:0.2rem;
                height:100%;
                font-size:0.55rem;
             }
            .active{
                font-weight: 800;
                color:#222;
                border-bottom: 0.05rem solid #222;
            }
         }
         .right{
             line-height: 200%;
             span,em{
                  font-size:0.37rem;
                  color:$fontColor;
                  font-weight: 800;
             }
         }
        
    }
    .hot-movie{
        display: flex;
        justify-content: space-between;
        flex-wrap:wrap;
        .movie-list{
            height:5rem;
            width:2.8rem;
            margin-top:0.4rem;
            position: relative;
            text-align: left;
            .comming{
                display: block;
                width: 100%;;
                text-align: left;
                font-size:0.35rem;
                color:#FA8072;
            }
             img{
                height:3.7rem;
                width:2.8rem;
                border-radius: 5px;
            }
            p{
                font-size:0.35rem;
                text-align: left;
                font-weight: 700;
                margin-bottom: 0.2rem;
            }
            .score{
                font-size:0.3rem;
                color:#666;
                position: absolute;
                bottom: 0.16rem;
                left:1.6rem;
            }
        }
       
    }
}
</style>