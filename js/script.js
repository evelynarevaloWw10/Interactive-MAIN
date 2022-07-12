//Global variables
const nameBtn = document.getElementById("name");
const jobRole = document.getElementById("title"); 
const otherJobRole = document.getElementById("other-job-role");
const design=document.getElementById('design');
const color=document.getElementById('color');
const colorOption= color.children;
const activities = document.getElementById("activities");
const costOfActivites = document.getElementById("activities-cost"); 
const checkBox = document.querySelectorAll('[type="checkbox"]');
 let  totalActivityCosts = 0
const payment =document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal=document.getElementById('paypal');
const bitcoin=document.getElementById('bitcoin');
const payOptions = payment.children
const prefferedpayment = payOptions[1].setAttribute('selected','selected');

nameBtn.focus(); // Focuses on the name field when first loaded

// Section 4 event listner for otherJob role display to block or not 
jobRole.addEventListener('change', (e) => {
      if (e.target.value ==='other'){
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    }
});
// Section 5 event listner attacted to design variable that is linked to html that will hide or not based on trigger
 color.disabled=true;
 design.addEventListener('change', (e)=>{
    color.disabled=false;
   for(let i=0; i< colorOption.length; i++){
        const target=e.target.value;
        const dataTheme=colorOption[i].getAttribute('data-theme');
        // if statement for loop to add conditions on how to execute 
        if (dataTheme === target){
     
          colorOption[i].hidden=false;
          colorOption[i].setAttribute('selected','selected');
    
         }else{
          colorOption[i].hidden= true;
          colorOption[i].removeAttribute('selected');
    }
   }
});
//Section 6
/*Event listner to check if activites var was selected, new variable costOfActivities 
works as counter and var dataCost converts string to number
*/
activities.addEventListener("change", (e) => { 
const click = e.target;
const dataCost = parseInt(click.getAttribute("data-cost"));
        click.checked ?totalActivityCosts += dataCost:totalCostActivities -= dataCost;
        costOfActivites.innerHTML=`Total: $${ totalActivityCosts}`;


});

//Section 7
// Event listner on payment element with loop and switch function that has paypal, bitcoin and default(credit card)option
paypal.style.display = 'none';
bitcoin.style.display = 'none';

payment.addEventListener("change", (e) => {
    for(let i = 0; i< payOptions.length; i++){
    const target = e.target.value;
   
    switch(target){
        case 'paypal':
            creditCard.style.display ='none';
            paypal.style.display ='block';
            bitcoin.style.display ='none';
            break;
        case 'bitcoin':
                creditCard.style.display ='none';
                paypal.style.display ='none';
                bitcoin.style.display ='block';
                break;
        default:
                    creditCard.style.display ='block';
                    paypal.style.display ='none';
                    bitcoin.style.display ='none';
                    break;
    }
  }
}); 
// Section 8
// Form validation with regex & classList

const email = document.getElementById("email"); 
const cardNumber = document.getElementById("cc-num"); 
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const form = document.querySelector("form");

// veifies if an input is valid and removes error message upon validation 
function validationPass(e) {
    const parent = e.parentElement;
    parent.classList.add('valid');
    parent.classList.remove('not-valid');
    parent.lastElementChild.style.display = 'none';
}
function validationFail(e) {
    const parent = e.parentElement;
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    parent.lastElementChild.style.display = 'block';
}

function validName(){
const nameValue = nameBtn.value;
const nameValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue)
nameValid ? validationPass (nameBtn) : validationFail(nameBtn);
        return nameValid;
}

function emailValid(){
 const emailValue = email.value;
 const emailValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
 const emailEmpty = /^\s*$/.test(email.value);
    
        if (emailValid) {
     validationPass(email);
         } else if (emailEmpty) {
     email.nextElementSibling.textContent = 'Email address field cannot be blank';
     validationFail(email);
         } else {
     validationFail(email);
         }
        return emailValid;
}
function  activitiesValid(){
    const activityElementValid = totalActivityCosts > 0;
    if (activityElementValid){ 
        activities.classList.add('valid');
        activities.classList.remove('not-valid');
        activities.lastElementChild.style.display ='none';
 } else {
    activities.classList.add('not-valid');
    activities.classList.remove('valid');
    activities.lastElementChild.style.display ='block';
     }
 return activityElementValid;

}

function creditCardValid(){
    const creditCardValue = cardNumber.value;
    const cardValid =  /^\d{13,16}$/.test(creditCardValue);
    cardValid ? validationPass (cardNumber) : validationFail(cardNumber);
        return cardValid; 
       
    
}
function zipCodeValid(){
    const zipCodeValue = zipCode.value;
    const zipCodeNumberValid =  /^\d{5}$/.test(zipCodeValue);
    zipCodeNumberValid ? validationPass (zipCode) : validationFail(zipCode);  
        return zipCodeNumberValid;
 }

function cvvValid(){
    let cvvElement = cvv.value;
    let cvvNumberValid = /^\d{3}$/.test(cvvElement);
    cvvNumberValid ? validationPass (cvv) : validationFail(cvv);
        return cvvNumberValid;
 }

form.addEventListener('submit', e => {
    if (!validName()) { 
        e.preventDefault(); 
    }
    if (!emailValid()) { 
        e.preventDefault(); 
    }
    if (!activitiesValid()) { 
        e.preventDefault(); 
    }
    if (payment.value === 'credit-card') {
        if (!creditCardValid()) {
            e.preventDefault();
        }
        if (!zipCodeValid()) {
            e.preventDefault();
        }
        if (!cvvValid()) {
            e.preventDefault();
        }
    }
});

// Section 9
//accessibilty checkbox var w/ for loop checking checkbox event and acitivty triggers to either focus or blur
for ( let i =0; i < checkBox.length; i++ ) {
    checkBox[i].addEventListener('focus', e => {
        e.target.parentElement.classList.add('focus');
    });
    checkBox[i].addEventListener('blur', e => {
        e.target.parentElement.classList.remove('focus');
    });
}


