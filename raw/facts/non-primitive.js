//  array ,object , functions
function sayHi(varName) {
    console.log("Hi from " + varName);
    return undefined;
    // return "returned from sayHI";
}

// address of fn 

// console.log(sayHI);
// let rVal = sayHi("Steve");
// console.log(rVal);

//  int arr[]=[1,2,3];
// array is collection of anything
let array = [
    1,
    2, "sajmdfhvda",
    null,
    function () {
        console.log("fn inside arr")
        return "some val from fn";
    },
    { name: "Jasbir" },
    false,
    [1, 2, 3, 4]
];
console.log(array[array.length-1][2]);
console.log(array[5]);
array[4]();
// addLast => push
// removeLast=> pop
// addFirst => unshift
// removeFirst=> shift
// console.log("```````````````````````````");
// console.log(array[4]());



// objects
// ****************Objects*******************
// key :value pair
// String: anything
// JSON=>  Javascript object notation

{/* <name>Jasbir</name> */}
let cap = {
    name: "Steve",
    lastName: "Rogers",
    age: 40,
    movies: ["Winter soldier", "civil war", "avenges"],
    isAvenger: false,
    sayHi: function () {
        console.log("cap says Hi")}
}

// get
console.log(cap.name);
// update
// cap.isAvenger=true;

// set 
// cap.friends=["peter","bruce","tony"];
// delete
delete cap.age;
// print
// console.log(cap);
// loop
for (let prop in cap) {
    // template literals
    // console.log(`${key} : ${cap[key]}`);
    // java version
    // get from object as a variable
    console.log(cap[prop]);
    console.log(prop + " " + cap[prop]);
}
// literally  matching
console.log(cap.prop);



