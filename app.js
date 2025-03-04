import countryList from "./codes.js";
const baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
const fromCurr =document.querySelector(".from select");
const toCurr =document.querySelector(".to select");
const btn=document.querySelector("button");
const msg=document.querySelector("#msg")
for(let select of dropdowns){   
    for (let currCode  in countryList){
    let newOption=document.createElement("option");
    newOption.value=currCode;
    newOption.innerText=currCode;
    select.append(newOption);
   }  
   select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);  
})
};

let updateFlag=(target)=>{
    let img=target.parentElement.querySelector("img");
    let countryCode=countryList[target.value]
    img.src=`https://flagsapi.com/${countryCode}/shiny/64.png/`;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate=async()=>{
    let amount=document.querySelector("form input");
    let amtVal=amount.value;
    if(amtVal==""||amtVal<1){
      amtVal=1;
      amount.value=1;
    }
 
    const url=`${baseUrl}/${(fromCurr.value).toLowerCase()}.min.json`;
         let response= await fetch(url);
         let data= await response.json();
         let fromCurrLow=(fromCurr.value).toLowerCase()
         let toCurrLow=(toCurr.value).toLowerCase()
         let TrasAmt=(data[fromCurrLow][toCurrLow])*amtVal;
         msg.innerText=`${amtVal} ${fromCurr.value}= ${TrasAmt} ${toCurr.value}`;
}

window.addEventListener("load",updateExchangeRate);



