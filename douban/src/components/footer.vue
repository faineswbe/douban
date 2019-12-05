<template>
    <div class="footer nav-space">
        <router-link tag="div" 
        :to="{name:nav.path}"
        class="footer-nav" 
        v-for="(nav,index) in nav" 
        :key="index">
             <svg class="icon" aria-hidden="true">
                <use :xlink:href='nav.icon'></use>
            </svg> 
            <p>{{nav.text}}</p>
        </router-link>
    </div>
</template>
<script>
export default {
    data(){
        return{
            nav:[
                {
                    path:'home',
                    icon:'#iconshouye',
                    text:'首页'
                },
                {
                    path:'book',
                    icon:'#iconwenti-shuben',
                    text:'书影音'
                },
                 {
                    path:'group',
                    icon:'#iconquanqiu',
                    text:'小组'
                },
                 {
                    path:'fair',
                    icon:'#iconshangdian',
                    text:'市集'
                },
                 {
                    path:'center',
                    icon:'#iconwo1',
                    text:'我的'
                }
            ]
        }
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped>
$color:#00B51D;
.footer{
    background-color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 10rem;
    height:1.6rem;
    border-top:0.01rem solid #DCDCDC;
    .footer-nav{
        padding:0.15rem 0.5rem 0.05rem 0.5rem;
        color:#999;
         p{
            font-size:0.25rem;
            max-height:99999px;
        }
        &.router-link-active{
            color:$color;
            svg{
                color:$color;
            }
        }
    }
    svg{
        width:0.7rem;
        height:0.7rem;
        color:#DCDCDC;
    }
}
</style>