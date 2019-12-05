<template>
     <div ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    props:{
        data:{
            type:Number,
            default:0
        },
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        pullup: {
            type: Boolean,
            default: false
        },
        startY:{
            type: Number,
            default: 0
        },
        scrollX: {
            type: Boolean,
            default: false
        },
        listenScroll: {
            type: Boolean,
            default: false
        },
        pulldown: {
            type: Boolean,
            default: false
        },
        scrollY: {
            type: Boolean,
            default: true
        },
        refreshDelay: {
            type: Number,
            default: 20
        },
        stopPropagation:{
             type: Boolean,
            default: false
        },
        preventDefault:{
            type: Boolean,
            default: true
        },
        stop:{
            type: Boolean,
            default: false
        },
        destroy:{
            type: Boolean,
            default: false
        },
        bounce: {
            type:[Object,Array],
            default:()=>(
                {
                top: true,
                botom: true,
                left: true,
                right: true
             }
            ) 
        },
       enable:{
            type: Boolean,
            default: true
       },
        disable:{
             type: Boolean,
            default: false
        }
    },
    data(){
        return{
            d_scrollY:this.scrollY,
            d_stopPropagation:this.stopPropagation,
            d_enable:this.enable,
            d_disable:this.disable
        }
    },
    methods: {
         _initScroll(){
            if (!this.$refs.wrapper) {
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper,{
                probeType: this.probeType,
                click: this.click,
                scrollX:this.scrollX,
                scrollY:this.d_scrollY,
                pulldown:this.pulldown,
                pullup:this.pullup,
                stopPropagation:this.stopPropagation,
                preventDefault:this.preventDefault,
                bounce:this.bounce

            });
            //  this.$emit('scrollHeight',this.scroll.y);
            this.scroll.on('scroll', (pos) => { // 折叠的高度
                   this.$emit('scrollHeight',pos.y);
            })
            if (this.pullup) {
                this.scroll.on('scrollEnd', () => { // 滚动到底部               
                    if (this.scroll.y <=(this.scroll.maxScrollY+50)) {
                        this.$emit('scrollToEnd')
                    }
                })
             }
            if (this.pulldown) {
                this.scroll.on('touchEnd', (pos) => { // 下拉动作
                    if (pos.y > 50) {
                    this.$emit('pulldown');
                    }
                })
            }
                // 
             if(this.stop){
                console.log('stop');
                 this.stopscroll();
             }
            if(this.destroy){
                console.log('destroy');
                 this.destroyscroll();
             }
            if(this. d_enable){
             // console.log('enable');
                 this.enablescroll();
             }
            if(this.d_disable){
              // console.log('disable');
                 this.disablescroll();
             }
        // 是否派发顶部下拉事件，用于下拉刷新
          },
        disablescroll() {
        // 代理better-scroll的disable方法
            this.scroll && this.scroll.disable()
        },
        destroyscroll(){
            this.scroll && this.scroll.destroy()
        },
        stopscroll() {
            // 代理better-scroll的enable方法
            this.scroll && this.scroll.stop()
        },
        enablescroll() {
            // 代理better-scroll的enable方法
            this.scroll && this.scroll.enable()
        },
        refresh() {
            // 代理better-scroll的refresh方法
            this.scroll && this.scroll.refresh()
        },
        scrollTo() {
            // 代理better-scroll的scrollTo方法
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            // 代理better-scroll的scrollToElement方法
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
    },
    mounted(){
        // 保证在DOM渲染完毕后初始化better-scroll
         this._initScroll();
        // setTimeout(() => {
        //     this._initScroll();
        // }, 20)    
    },
    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      },
      stop:{
          handler(newVal,oldVal){
            this._initScroll();
          }
      },
      d_disable(){
         // console.log(this.d_disable);
          if(this.d_disable){
               this.scroll && this.scroll.disable();
               //this._initScroll();
               //this.scroll.startY=0;
          }else{      
               this.scroll && this.scroll.enable();
              // this._initScroll();
                console.log(this.scroll)
            // this.scroll.distY=0;
          }
          
      },
    }

}
</script>
<style lang="scss" scoped>

</style>