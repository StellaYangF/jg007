let a = 100;  
let obj = {
    a:1,
    say(){
        setTimeout(function(){
            console.log(this.a); 
        }, 1000);
    }
}
obj.say(); 


let a = 100;  
let obj = {
    a:1,
    say(){
        setTimeout( ( )=>{
            console.log(this.a); 
        }, 1000);
    }
}
obj.say(); 


let a = 100;  
let obj = {
    a:1,
    say:()=>{
        setTimeout(() => {
            console.log(this.a); 
        }, 1000);
    }
}
obj.say(); 

var a = 2;
let res = [1,2,3].map(val => val * this.a);
let res2 = [1,2,3].map(function(val){ 
  return val * this.a;
})
console.log(res, res2);