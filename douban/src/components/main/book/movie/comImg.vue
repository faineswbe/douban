<template>
    <div class="comImg nav-space">
        <img :src="photo.thumb" alt="" v-for="photo in random">
    </div>
</template>
<script>
export default {
    props:['photo'],
    computed:{
        random(){
            let array=[];
            for(let i=0;i<3;i++){
                 let index=Math.floor(Math.random()*this.photo.length);
                 array.push(this.photo[index]);
                 this.photo.splice(index,1);
            }
            return array;
        }
    }
}
</script>
<style lang="scss" scoped>
.comImg{
    img{
        width:3rem;
        height:2rem;
    }
}
</style>