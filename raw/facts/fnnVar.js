function sayHi(varName) {
    // address access
    console.log(varName);
    //  addres access and exceute the code inside that fn 
    varName();
}
// fn could passed as parameter
sayHi(function inner(){
    console.log("inner");
})
// sayHi("sdf");
// // sayHi([1,2,3,4]);
// // sayHi({"name":"Jasbir"});
// // functions are variable 
// // we can perform three operations on variable
// //  assignment 
// let a = [10, 20, 30];
// let b = a;
// // console.log(a);
// // functions are variable ;
let newVar = sayHi;
// console.log("````````````````````````");
// console.log(newVar)
// newVar("sdf");
// // var can be passed as a parameter
// console.log("````````````````````````");
// sayHi(1);





