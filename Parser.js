const between = require("./Between").getFromBetween


Array.prototype.insert = function (index, item) {
 this.splice(index, 0, item);
};

function repeating(strArray) {
 let counting = {};
 let ar = []
 strArray.forEach(function (str) {
  counting[str] = (counting[str] || 0) + 1;
 });

 if (Object.keys(counting).length !== strArray.length) {
  let str;
  for (str in counting) {
   if (counting.hasOwnProperty(str)) {
    if (counting[str] > 1) {
     ar.push({
      "item": str,
      "count": counting[str]
     })
    }
   }
  }
 }
 return ar
}


 module.exports = {
  parse: function (formula) {
   let parantNums = []
   let parants = []
   let els = []
   let elsNums = []
   let elsStart = []
   if (!formula) throw new Error("Specify a formula to parse")
   formula = formula.replaceAll(" ", "")
   let build = formula
   let build2;
   let checkForParant = between.get(formula, "(", ")")
   if (checkForParant.length !== 0) {
    checkForParant.forEach(el => {
     let index = build.indexOf("(" + el + ")") + el.length + 2
     if (!isNaN(build[index])) { //sayıysa
      let indexStore = index
      let numStore = ""
      numStore += build[index]
      while (!isNaN(build[indexStore + 1])) { //sayıysa
       numStore += build[indexStore + 1]
       indexStore++
      }
      build = build.replace("(" + el + `)${numStore}`, "")
      parants.push(el)
      parantNums.push(Number(numStore))
     } else {
      parantNums.push(1)
      parants.push(el)
      build = build.replace("(" + el + `)`, "")
     }
    })
    parantNums.forEach((el, i) => {
     for (let index = 0; index < el; index++) {
      build += parants[i]
     }
    })
   }
   build2 = build
   let element = ""
   let arr = build2.split("")
   let arr2 = new Array()
   arr.forEach(el => {
    arr2.push(el)
   })
   let pushed = 0
   arr.forEach((el, i) => {
    if (!isNaN(el)) {
     try {
      if (isNaN(build2[i + 1])) {
       arr2.insert(i + 1 + pushed, "|")
       pushed++
      }
     } catch (e) {}
    }
   })
   if (arr2[arr2.length - 1] === "|") {
    arr2.pop()
   }
   arr2 = arr2.join().replaceAll(",", "")
   arr2 = arr2.split("|")
   arr2.forEach(el => {
    let splitpls = el.split("")
    let splitpls2 = new Array()
    splitpls.forEach(el2 => {
     splitpls2.push(el2)
    })
    //console.log(splitpls)
    splitpls.forEach((elem, i) => {
   
    })
   console.log(splitpls2.join().replaceAll(",", ""))
   })
   return parantNums + " " + parants

  }
 }