const compare=(propertyName,type)=>{
    if(type==='desc'){
        return function(object1,object2){
            let value1=object1[propertyName];
            let value2=object2[propertyName];
            if(value2<value1){
                return 1;
            }else if(value2>value1){
                return -1;
            }else{
                return 0;
            }
        }
    }else if(type==='asc'){
        return function(object1,object2){
            let value1=object1[propertyName];
            let value2=object2[propertyName];
            if(value2>value1){
                return 1;
            }else if(value2<value1){
                return -1;
            }else{
                return 0;
            }
        }
    }
}
export default compare;