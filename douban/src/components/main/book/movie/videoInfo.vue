<template>
<scroll :pulldown='false' >
    <div  class="video">  
            <div>
                 <div class="close" >
                <svg class="icon" aria-hidden="true" @click="close()" >
                    <use xlink:href="#iconguanbi"></use>
                </svg>
                </div>
                <div class="title">
                    <h1>影片信息</h1>
                </div>
                <div class="detail">
                    <ul>
                        <li>
                            <span class="span1">片名:</span><div class="span2"><span>{{subject.title}}</span></div>
                        </li>
                        <li>
                            <span class="span1">原名:</span><div class="span2"><span>{{subject.original_title}}</span></div>
                        </li>
                        <li>
                            <span class="span1">又名:</span><div class="span2"><span v-for="(aka,index) in subject.aka">{{aka}}&nbsp;<i v-if="index<subject.aka.length-1">/ &nbsp;</i></span></div>
                        </li>
                        <li>
                            <span class="span1">导演:</span><div class="span2"><span  v-for="(director,index) in subject.directors ">{{director.name}}&nbsp;<i v-if="index<subject.directors.length-1">/ &nbsp;</i></span></div>
                        </li>
                        <li>
                            <span class="span1">编剧:</span> <div class="span2"><span v-for="(writers,index) in subject.writers ">{{writers.name}}&nbsp;<i v-if="index<subject.writers.length-1">/ &nbsp;</i></span></div>
                        </li>
                                        <li>
                            <span class="span1">主演:</span><div class="span2"><span v-for="(casts,index) in subject.casts ">{{casts.name}}&nbsp;<i v-if="index<subject.casts.length-1">/ &nbsp;</i></span></div>
                        </li>
                                        <li>
                            <span class="span1">上映:</span><div class="span2"> <span v-for="(pubdates,index) in subject.pubdates ">{{pubdates}}&nbsp;<i v-if="index<subject.pubdates.length-1">/ &nbsp;</i></span></div>
                        </li>
                                        <li>
                            <span class="span1">类型:</span><div class="span2"><span  v-for="(genres,index) in subject.genres ">{{genres}}&nbsp;<i v-if="index<subject.genres.length-1">/ &nbsp;</i></span></div>
                        </li>
                                        <li>
                            <span class="span1">片长:</span><div class="span2"><span v-for="(durations,index) in subject.durations ">{{durations}}&nbsp;<i v-if="index<subject.durations.length-1">/ &nbsp;</i></span></div>
                        </li>
                                        <li>
                            <span class="span1">地区:</span><div class="span2"><span  v-for="(countries,index) in subject.countries ">{{countries}}<i v-if="index<subject.countries.length-1">/ &nbsp;</i></span></div>
                        </li>
                                        <li>
                            <span class="span1">语言:</span><div class="span2"><span  v-for="(languages,index) in subject.languages ">{{languages}}&nbsp;<i v-if="index<subject.languages.length-1">/ &nbsp;</i></span></div>
                        </li>
                                        <!-- <li>
                            <span class="span1">IMDb:</span><span  class="span" v-for="(durations,index) in subject.durations ">{{durations}}&nbsp;<i v-if="index<subject.durations.length-1">/ &nbsp;</i></span>
                        </li> -->
                    </ul>
                </div>
            </div> 
        
    </div>
    </scroll>
</template>
<script>
import scroll from '@/components/betterScroll'
export default {
    components:{
        scroll
    },
    props:['id'],
    data(){
        return{
            subject:''
        }
    },
    methods:{
        close(){
            this.$emit('sendclose');
        }
    },
    mounted(){
        this.$axios.get("movie/subject/"+this.id+"?apikey="+this.apikey) 
        .then(res => {
           this.subject=res.data;
        })
        .catch(err => {
            alert("数据接收失败");
        });
    }
}
</script>
<style lang="scss" scoped>
.video{
    height:100vh;
    width:10rem;
    background-color: white;
    padding:0.2rem 0.45rem 0 0.45rem;
    .close{
        text-align: left;
        margin-bottom: 0.8rem;
    }
    .title{
        h1{
            font-size:0.7rem;
            font-weight:510;
            text-align: left;
        }
        margin-bottom: 0.6rem;
    }
    .detail{
        li{
            display: inline-flex;
            width:100%;
            margin-bottom: 0.1rem;
            i{
                font-style: normal;
            }
            text-align: left;
            .span1{
                display: inline-block;
                width:1rem;
                font-size:0.4rem;
                color:rgb(150,150,150);
                margin-right:0.2rem;
            }
            span{
                    font-size:0.4rem;
                    color:rgb(80,80,80);
            }
            .span2{   
                display: inline-block;
                width: 7.7rem;
                text-align: left;
            }
        }
    }
}
</style>