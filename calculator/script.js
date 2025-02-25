
const buttons = document.querySelectorAll('button');
const screen = document.querySelector(".screen");


// console.log(screen);
// console.log(buttons);

let keys=[]
let keysvalue

buttons.forEach((button) => button.addEventListener("click", calculate));


function calculate(event) {
  const value =event.target.textContent
  if (value==="clear"){
    keys=[]
    screen.textContent="."
  }else if(value==="="){
        screen.textContent=eval(keysvalue)
  }else{
      keys.push(event.target.textContent)
      keysvalue=keys.join("")
      console.log(keysvalue); 
      screen.textContent=keysvalue
  }
}

