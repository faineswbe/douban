<template>
        <div class="lds-roller">
                <div class="lds1"></div>
                <div class="lds1"></div>
                <div class="lds1"></div>
                <div class="lds2"></div>
                <div class="lds2"></div> 
                <div class="lds2"></div>
                <div class="lds2"></div>
                <div  class="lds3"></div>
                <div  class="lds3"></div>
                <div  class="lds3"></div>
                <div  class="lds3"></div>
                <div  class="lds3"></div> 
                <div  class="lds3"></div> 
                <div  class="lds3"></div>
                <div  class="lds3"></div> 
            <!--<div  class="lds3"></div>  -->
           </div>
</template>
<style lang="scss" scoped>
.lds-roller {
  display: inline-block;
  position: relative;
  width:100px;
  height: 120px;
}
.lds-roller .lds1 {
      animation: lds-roller1 0.6s cubic-bezier(0,0, 1, 1) infinite;
}
.lds-roller .lds2 {
    opacity: 0;
      animation: lds-roller2 0.8s cubic-bezier(0,0, 1, 1) infinite;
}
.lds-roller .lds3 {
    opacity: 0;
      animation: lds-roller3 1.6s cubic-bezier(0,0, 1, 1) infinite;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
 
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {  
    transform-origin:50px 40px;
    animation-delay: 0s;
  
}
.lds-roller div:nth-child(1):after {
    top:40px;left:40px;
     background: red;
}

.lds-roller div:nth-child(2) {  
    transform-origin:50px 40px;
    animation-delay: 0.2s;
}
.lds-roller div:nth-child(2):after {
    top:40px;left:40px;
     background: blue;
}
.lds-roller div:nth-child(3) {  
    transform-origin:50px 40px;
    animation-delay: 0.4s;
}
.lds-roller div:nth-child(3):after {
    top:40px;left:40px;
    background: green;
}
.lds-roller div:nth-child(4) {
   transform-origin:40px 40px;  
   animation-delay:0.4s;

}
.lds-roller div:nth-child(4):after {
    top:40px;left:60px;
      background: red;
     
}
.lds-roller div:nth-child(5) {
   transform-origin:40px 40px;  
   animation-delay:0.6s;
}
.lds-roller div:nth-child(5):after {
    top:40px;left:60px;
     background: blue;
}
.lds-roller div:nth-child(6) {
   transform-origin:40px 40px;  
   animation-delay:0.8s;
  
}
.lds-roller div:nth-child(6):after {
    top:40px;left:60px;
     background: green;
}
.lds-roller div:nth-child(7) {
   transform-origin:40px 40px;  
   animation-delay:1.0s;
}
.lds-roller div:nth-child(7):after {
    top:40px;left:60px;
     background: blue; 
}
.lds-roller div:nth-child(8) {
   transform-origin:50px 40px;  
   animation-delay:1.0s;
}
.lds-roller div:nth-child(8):after {
    top:40px;left:20px;
    background: red;
}
.lds-roller div:nth-child(9) {
   transform-origin:50px 40px;  
   animation-delay:1.2s;
}
.lds-roller div:nth-child(9):after {
    top:40px;left:20px;
     background: blue; 
}
.lds-roller div:nth-child(10) {
   transform-origin:50px 40px;  
   animation-delay:1.4s;
}
.lds-roller div:nth-child(10):after {
    top:40px;left:20px;
    background: green;
}
.lds-roller div:nth-child(11) {
   transform-origin:50px 40px;  
   animation-delay:1.6s;
}
.lds-roller div:nth-child(11):after {
    top:40px;left:20px;
    background: red;
}
.lds-roller div:nth-child(12) {
   transform-origin:50px 40px;  
   animation-delay:1.8s;
}
.lds-roller div:nth-child(12):after {
    top:40px;left:20px;
    background: blue; 
}
.lds-roller div:nth-child(13) {
   transform-origin:50px 40px;  
   animation-delay:2s;
}
.lds-roller div:nth-child(13):after {
    top:40px;left:20px;
    background: green;
}
.lds-roller div:nth-child(14) {
   transform-origin:50px 40px;  
   animation-delay:2.2s;
}
.lds-roller div:nth-child(14):after {
    top:40px;left:20px;
    background: red;
}
.lds-roller div:nth-child(15) {
   transform-origin:50px 40px;  
   animation-delay:2.4s;
}
.lds-roller div:nth-child(15):after {
    top:40px;left:20px;
    background: blue; 
}


@keyframes lds-roller1 {
  0% {
      transform: rotate(0deg);
      opacity: 0;
  }
  30%{
    opacity: 1;
  }
    99%{
        opacity: 1;
    }
  100% {
    opacity: 0;
    transform: rotate(180deg);
  }
}
@keyframes lds-roller2 {
  0% {
      transform: rotate(0deg);
      opacity: 0;
  }
  1%{
    opacity: 1;
  }
    99%{
        opacity: 1;
    }
  100% {
    opacity: 0;
    transform: rotate(180deg);
  }
}
@keyframes lds-roller3 {
  0% {
      transform: rotate(0deg);
      opacity: 0;
  }
  1%{
    opacity: 1;
  }
    60%{
        opacity: 1;
    }
  100% {
    opacity: 0;
    transform: rotate(270deg);
  }
}

</style>