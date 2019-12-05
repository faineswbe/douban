<template>
    <div class="cinema-movie nav-space" v-if="hotstate||comestate">
        <div class="image" v-if="hotstate">
            <img :src="subject.images.small" alt="" >
        </div>
         <div class="image" v-if="comestate">
            <img :src="movie.images.small" alt="" >
        </div>
        <div class="detail" v-if="hotstate">
            <p class="title">{{subject.title}}</p>
            <p style="position: relative;">
                  <star :size="24" :score="subject.rating.average/2" v-if="subject.rating.average>0"></star>
                    <span class="score" v-if="subject.rating.average>0">{{subject.rating.average}}</span>
            </p>
                <p class="shortdesc">
                    <span> {{subject.year}}&nbsp;/</span>
                    <span>{{subject.countries[0]}}</span>
                    <span v-for="genres in subject.genres">{{genres}}&nbsp;/</span>
                    <span v-for="actor in subject.casts">{{actor.name}}&nbsp;/</span>
              </p>
        </div>
        <div class="buy-ticket" v-if="hotstate">
            <button>购票</button>
        </div>
         <div class="detail" v-if="comestate">
            <p class="title">{{movie.title}}</p>
            <p style="position: relative;">
                  <star :size="24" :score="movie.rating.average/2" v-if="movie.rating.average>0"></star>
                    <span class="score" v-if="movie.rating.average>0">{{movie.rating.average}}</span>
            </p>
                <p class="shortdesc">
                    <span> {{movie.year}} /</span>
                    <span>{{movie.countries[0]}} / </span>
                    <span v-for="genres in movie.genres">{{genres}} / </span>
                    <span v-for="(actor,index) in movie.casts" :key="index">{{actor.name}} / </span>
              </p>
        </div>
        <div class="buy-ticket" v-if="comestate">
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#iconguanzhu"></use>
            </svg>
            <p class="coral">想看</p>
            <p>{{movie.wish_count>10000?(movie.wish_count/10000).toFixed(1)+'万':movie.wish_count}}人想看</p>
        </div>
    </div>
</template>
<script>
import star from '@/components/main/book/star';
export default {
      components:{
        star,
    },
    props:['id','type'],
    data(){
        return{
            subject:'',
            movie:'',
            hotstate:false,
            comestate:false
        }
    },
    methods:{
        getmovie1(){
               this.$axios.get("movie/subject/"+this.id+"?apikey="+this.apikey) 
                .then(res => {
                    this.subject=res.data;
                    this.$nextTick(function(){
                        this.hotstate=true;
                        this.$emit("loadingok");
                    })
                })
                .catch(err => {
                    alert("数据接收失败");
                });
        },
        getmovie2(){
             this.$axios.get("movie/subject/"+this.id+"?apikey="+this.apikey) 
            .then(res => {
                this.movie=res.data;
                this.$nextTick(function(){
                    this.comestate=true;
                    this.$emit("loadingok");
                })
            })
            .catch(err => {
                alert("数据接收失败");
            });     
        }
    },
    mounted(){
        if(this.type==1){
            this.getmovie1();
        }else if(this.type==2){
            this.getmovie2();
        }
     
        
    },
    watch:{
        id:{
            handler(newV,oldV){
                //console.log(newV);
                this.id=newV;
                this.getmovie2();
            },
            deep:true
        }
    }
}
</script>
<style lang="scss" scoped>
.image{
    height:3rem;
    width:2.2rem;
    border-radius: 6px;
    img{
        height:3rem;
        width:2.2rem;
        border-radius: 6px;
    }
}
.week{
    height:0.8rem;
    display: block;
    width: 100%;
}
.cinema-movie{
    //   display: inline-flex;
    //     justify-content: space-between;
}
.detail{
    width:4rem;
    flex: auto;
    color:black;
    padding-left: 0.4rem;
    text-align: left;
    border-right:0.02rem dashed rgb(245,245,245);
    span{
        display: inline-block;
    }
    p{
        text-align: left;
    }
    .title{
        font-size:0.45rem;
        font-weight: 600;
        margin-bottom: 0.2rem;
    }
    .score{
        display: block;
        font-size:0.3rem;
        color:rgb(170, 170, 170);
        position: absolute;
        top:-0.02rem;
        left:1.65rem;
    }
    .shortdesc{
        position: relative;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;/*重点，不能用block等其他*/
        -webkit-line-clamp: 2;/*重点IE和火狐不支持*/
        -webkit-box-orient: vertical;/*重点*/
        width:100%;
        margin: 0.2rem 0;
        text-align: left;
        span{
            font-size:0.35rem;
            text-align: left;
        }
        font-size:0.35rem;
        color:rgb(170, 170, 170);
     
    }
}
.buy-ticket{
    width:2.2rem;
    padding:0.8rem 0 0 0.4rem;
    svg,.coral{
        color: rgb(255, 190, 70);
    }
    p:last-child{
        color:rgb(210,210,210);
        font-size:0.3rem;
        width:1.8rem;
    }
    button{
        background-color: white;
        line-height: 0.8rem;
        width:1.7rem;
        height:0.8rem;
        border-radius:0.1rem;
        font-weight: 800;
        color:rgb(253, 95, 127);
        border:0.04rem solid rgb(253, 95, 127);
    }
}
</style>