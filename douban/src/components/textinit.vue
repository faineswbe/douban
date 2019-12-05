<template>
    <div class="con"  @click="openclose($event)">
        <span>{{text.substring(0,this.len)}}</span>
        <i>{{text.length>len?"... 展开":""}}</i>
    </div>
</template>
<script>
export default {
    props:['text','len'],
    methods:{
        init(){
            let con=document.createElement("div");
            let span = document.createElement("span");     //创建<span>元素
            let i = document.createElement("i");           //创建<a>元素
            span.innerHTML = this.text.substring(0,this.len);     //span的内容就是con的前len个字符
            i.innerHTML = this.text.length>this.len?"... 展开":""; //判断显示的字数是否大于默认显示的字数    来设置a的显示
            con.appendChild(span);
            con.appendChild(i);
            return con.innerHTML;
        },
        openclose(e){
             e.currentTarget.firstElementChild.innerHTML=this.text;
              e.currentTarget.lastElementChild.innerHTML='';
        }
    },
}
</script>
<style lang="scss" scoped>
.con{
    text-align: left;
    font-size:0.35rem;
    span{
        width:6rem;;
        font-size:0.4rem;
    }
    i{
         font-size:0.4rem;
         color:rgb(220,220,220);
        font-style: normal;
    }
}
// .con>div{
//     text-align: left;
// }
</style>