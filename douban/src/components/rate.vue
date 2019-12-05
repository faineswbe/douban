<template>
    <div class="rate">
        <div class="row"  v-for="(rate,index) in rateArray" :key="index">
            <div class="star">
                    <svg class="icon" aria-hidden="true" v-for="num in index+1">
                        <use xlink:href="#iconicon"></use>
                    </svg>
                 </div>
             <div class="rate-back">
                <div class="rate" :style="{width:rateWidth(rate)}"></div>
            </div>
        </div>   
        <div class="count-rate">
            {{people}}人评分
        </div> 
    </div>
</template>
<script>
export default {
    props:['array','people'],
    methods:{
        rateWidth(rate){
            let width=rate*3.5+'rem';
            return width;
        }
    },
    computed:{
        total(){
            let sum=0;
            for(let i=1;i<=5;i++){
                sum+=this.array[i];
            }
             return sum;
        },
        rateArray(){
            let array=[];
            for(let i=1;i<=5;i++){
                array.push((this.array[i]/this.total).toFixed(2))
            }
            return array;
        },
    }
}
</script>
<style lang="scss" scoped>
.rate{
    position: relative;
    display: flex;
    flex-direction:column-reverse;
    align-items: center;
    .count-rate{
        position: absolute;
        bottom: -0.4rem;
        right:0;
        font-size:0.24rem;
        color:rgba(210,210, 210,0.6);
    }
    .row{
         height:0.2rem;
        margin-bottom: 0.07rem;
    }
     .star{
        margin-right: 0.07rem;
        text-align: right;
        width:1.2rem;
        display: inline-block;
        height:0.3rem;
        svg{
            height:0.2rem;
            width:0.2rem;
            color:rgba(210,210, 210,0.9)
        }
    }
    .rate-back{
        display: inline-block;
        height:0.17rem;
        width:3.5rem;
        background-color: rgba(50, 50, 50, 0.2);
        margin-bottom: 0.04rem;
        border-radius:0.04rem;
        overflow: hidden;
        .rate{
            height:100%;
            border-radius:0.04rem;
            background-color: rgb(255, 175, 0);
        }
       
    }
}
</style>