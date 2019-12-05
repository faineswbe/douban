<template>
    <div class="search" :class="['search'+search,{'focus':state}]"  >
       <div class="input" v-if="state==true">
           <svg class="icon search-icon" aria-hidden="true" >
                <use xlink:href="#iconsousuo"></use>
            </svg>
            <input type="text" v-model="searchInput"  placeholder="城市里的地下通道" v-focus >
       </div>
        <div class="input" v-else>
           <svg class="icon search-icon" aria-hidden="true" >
                <use xlink:href="#iconsousuo"></use>
            </svg>
            <input type="text" placeholder="城市里的地下通道"   @click="linkto()">
             <svg class="icon scan-icon" aria-hidden="true" >
                <use xlink:href="#iconsaoma"></use>
            </svg>
       </div>
        <svg class="icon message-icon" aria-hidden="true" v-if="state==false">
            <use xlink:href="#icontubiao209"></use>
        </svg>
        <span :class="{'span':search==0}" v-else @click="back()">取消</span>
    </div>
</template>
<script>
export default {
    props:['search','state'],
    data(){
        return{
            searchInput:''
        }
    },
    methods:{
        linkto(){
            this.$router.push("/query?type="+this.search);
        },
        back(){
            this.$router.go(-1);
        }
    },
    watch:{
        searchInput:{
            handler(newVal,oldVal){
                this.$emit('getInput',newVal);
            },
            deep:true
        }
      
    },
    mounted(){
        // console.log(this.state);
    },
    directives: {
         focus: {
             inserted:function(el){
                 el.focus();
             }
         }
    }
}
</script>
<style lang="scss" scoped>
.search{
    width: 10rem;
    height:1.6rem;
    padding:0.4rem 0.5rem 0.2rem 0.5rem;
    position: fixed;
    top:0;
    left:0;
    
    .message-icon{
        position: absolute;
        right: 0.55rem;
        top:0.5rem;
        font-weight: 600; 
        color:white;
        width:0.8rem;
        height:0.8rem;
    }
    .input{
        padding:0.05rem;
        background-color: white;
        border-radius: 18px;
        position: relative;
        width: 7.6rem;
        text-align: left;
        .search-icon{
            color:#515151;
            position: absolute;
            left: 0.3rem;
            top:0.2rem;
            font-weight: 800;
        }
        .scan-icon{
            color:#515151;
            position: absolute;
            right: 0.3rem;
            top:0.2rem;
            font-weight: 800;
        }
        input{
            margin-left: 1rem;
            height:0.8rem;
            width:5.6rem;
            cursor: pointer;
            font-size:0.35rem;
        }
    }
}
.search0{
    background-color: $color;
}
.search1,.search2{
    background-color: white;
     .message-icon{
          color:#999;
          font-weight: 300;
     }
    .input{
        .icon{
            color:#666;
        }
        background-color:#F5F5F5;
        input{
            background-color:#F5F5F5;
        }
    }
}

.focus{
    span{
        position: absolute;
        right:0.32rem;
        top:0.59rem;
        color:$color;
        font-size:0.4rem;
    }
    .span{
         color:white;
    }
    border-bottom:0.01rem solid rgb(242, 242, 242);;
    .input{
         width: 8rem;
         input{
            width:6.5rem;
            caret-color:$color;
         }
       
    }
}
</style>
