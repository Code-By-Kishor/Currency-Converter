// for(code in countryList){
//     console.log(code,countryList[code])
// }
// const BASE_URL ='https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';
const BASE_URL ='https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';
const dropdowns = document.querySelectorAll(".dropdown select")
const btn=document.querySelector("form button")
 console.log(btn);
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg= document.querySelector(".msg");
const updateText = document.querySelector("#lastUpdate")
//console.log(updateText);


const updateExchangeRate=async  ()=>{
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    //console.log(amount.value);
    if (amtValue==="" || amtValue < 1){
        amtValue=1;
        amount.value=1;
    }
    //console.log(fromCurr.value,toCurr.value);
    const URL =`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    //console.log(URL)
    let response = await fetch(URL);
    let data = await response.json();
    //console.log(data);
    // let data1=data["usd"];
    // let currRate = data1[toCurr.value.toLowerCase()];
    let currRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    //console.log(currRate);

    let finalAmount = amtValue*currRate;
    msg.innerText=`${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
    let newupdateText = data.date;
    console.log(newupdateText);
    lastUpdate.innerText=`lastUpdated on ${newupdateText}`

}


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        // console.log(newOption)
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === 'from' && currCode === 'USD') {
            newOption.selected = "selected";
        } else if (select.name === 'to' && currCode === 'INR') {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}

const updateFlag=(element) => {
    let currCode = element.value;
    let countryCode =countryList[currCode];
    //console.log(currCode)
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img");
    // console.log(img);
    img.src=newSrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault(); // page won't refresh
    updateExchangeRate();
    
})

window.document.addEventListener("DOMContentLoaded",()=>{
    updateExchangeRate();
})