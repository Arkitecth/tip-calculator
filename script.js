// Select Elements 
const bill = document.querySelector("#Bill"); 
const customTip = document.querySelector("input.custom"); 
const tips = document.querySelectorAll(".tip-button"); 
const numPeople = document.querySelector("#people-entry"); 
const tipAmount = document.querySelector(".tip .amount");
const totalAmount = document.querySelector(".total .amount");
const billErrorMessage = document.querySelector(".bill-entry .error-message"); 
const peopleEntryErrorMessage = document.querySelector(".people-entry .error-message")
const resetButton = document.querySelector(".reset-button")

Number.prototype.toFixedNoRound = function(precision = 2) {
    const factor = Math.pow(10, precision); 
    return Math.floor(this * factor)  / factor
}


function calculateTip(bill, tipPercentage, numPeople) {
    let result = (Number(bill) * (Number(tipPercentage)  / 100) / numPeople); 
    return result
}

function updateElement(billValue,tipPercentage) {
    numPeople.addEventListener("focusout", ()=> {
        let numPeopleValue = numPeople.value
        if (numPeopleValue <= 0) {
            peopleEntryErrorMessage.style.display = "inline"
        } else {
            peopleEntryErrorMessage.style.display = "none"; 
            tipAmountValue =  calculateTip(billValue, tipPercentage, numPeopleValue);
            tipAmount.textContent = "$" + tipAmountValue.toFixedNoRound(2);
            totalAmount.textContent = "$" + Number(Number(billValue / numPeopleValue) + Number(tipAmountValue)).toFixedNoRound(2)
        }
    })
}

function reset() {
    location.reload();
}



resetButton.addEventListener("click", ()=> {
    reset();
})

//Collect Input 
bill.addEventListener("focusout", ()=> {
    let billValue = bill.value; 
    if (billValue < 0) {
        billValue = 0;
        billErrorMessage.style.display = "inline"
    } else {
        billErrorMessage.style.display = "none"; 
        for(const button of tips) {
            button.addEventListener("click", () => {
            let tipPercentage = button.value.slice(0, -1); 
               updateElement(billValue, tipPercentage);
            }); 
            customTip.addEventListener("focusout", ()=> {
                let tipPercentage = customTip.value;
                if (tipPercentage.includes("%")) {
                    tipPercentage = tipPercentage.substring(0, tipPercentage.indexOf("%")) 
                }
                console.log(tipPercentage);
                updateElement(billValue, tipPercentage)
            })
        }
   
    }
})