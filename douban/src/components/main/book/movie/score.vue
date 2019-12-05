<template>
    <div class="score">
        <div class="title">
            <span>
                豆瓣评分
            </span>
            <em>TM</em>
             <svg class="icon right-icon" aria-hidden="true">
                            <use xlink:href="#iconyou"></use>
            </svg>
        </div>
        <div class="averageScore">
            <div class="left">
                <h2>{{subject.rating.average}}</h2>
                 <star :size="24" :score="subject.rating.average/2" v-if="subject.rating.average>0"></star>
            </div>
            <div class="right">
                <rate :array="JSON.parse(JSON.stringify(subject.rating.details))" :people="subject.ratings_count"></rate>
            </div>
        </div>
        <div class="score-foot">
             <div>{{(subject.collect_count/10000).toFixed(1)}}万人看过</div>
             <div>{{(subject.wish_count/10000).toFixed(1)}}万人想看</div>
        </div>
    </div>
</template>
<script>
import rate from '../../../rate';
import star from '../star';
export default {
    components:{
        star,
        rate
    },
    props:['subject'],
    // data(){
    //     return{
    //         subject:''
    //     }
    // },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>
.score{
    padding:0.2rem 0.3rem;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.2);
    .title{
        position: relative;
        color:rgb(240,240,240);
        text-align: left;
        margin-bottom: 0.2rem;
        em{
            position: absolute;
            font-style: normal;
            left:1.5rem;
            top:0.05rem;
            font-size:0.23rem;
        }
        .right-icon{
            position: absolute;
            right:0rem;
            top:0.1rem;
            width:0.45rem;
            height:0.45rem;
        }
    }
    .averageScore{
         color:rgb(240,240,240);
         text-align: left;
        .left{
            width:1.8rem;
            margin-left: 0.8rem;
            h2{
                font-size:0.8rem; 
                font-weight: 500;
                margin-bottom: 0.2rem;
            }
        }
        .left,.right{
            display: inline-block;
        }
    }
    .score-foot{
        height:0.6rem;
        margin-top:0.5rem;
        border-top:0.02rem solid rgba(250,250,250,0.2);
        padding:0.15rem 0;
        display: flex;
        justify-content:flex-end;
        color:rgba(240,240,240,0.7);
        div{
            font-size:0.3rem;
            margin-left:0.2rem;
        }
    }
}
</style>