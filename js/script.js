/*---------------------------
      Global Variables
---------------------------*/

const cvvNumberElement = document.querySelector("#cvv");
const paymentMenu = document.getElementById("payment").value;
const activitiesClass = document.querySelectorAll(".activities input");
const formElement = document.querySelector("form");

/*---------------------------
        On page load
---------------------------*/

function pageLoad() {
    //Sets focus to Name input
    const name = document.getElementById("name");
    name.focus();
}
pageLoad();

/*---------------------------
          Job Role
---------------------------*/

function showJobRole() {
    //Selectors
    const otherJobRole = document.getElementById("other-job-role");
    const titleJobRole = document.getElementById("title");
    otherJobRole.style.display = "none";

    //Event hadler displays textarea only when other job role is selected
    //hides the textarea for all other selections
    titleJobRole.addEventListener("input", (e) => {
        let role = e.target;
        
        if (role.value === "other") {
            otherJobRole.style.display = "";
        } else {
            otherJobRole.style.display = "none";
        }
    });
}
showJobRole();

/*---------------------------
        T-Shirt Info
---------------------------*/

//manipulates the color menu options based on user input
function shirtInfo() {
    const designSelect = document.getElementById("design");
    const colorSelect = document.getElementById("color");
    colorSelect.disabled = true;
    
    designSelect.addEventListener("change", (e) => {
        const theme = e.target.value;
        colorSelect.disabled = false;
        const colorChildren = colorSelect.children;

        //loops through option elements in order to show/hide available
        //options to user based on their input
        for (let i = 1; i < colorChildren.length; i++) {
            const colorOption = colorChildren[i].getAttribute("data-theme");

            if (theme === colorOption) {
                colorChildren[i].hidden = false;
                colorChildren[i].setAttribute("selected", true);
            } else {
                colorChildren[i].hidden = true;
                colorChildren[i].removeAttribute("selected", false);
            }
        }
    });
}
shirtInfo();

/*---------------------------
       Activities Cost
---------------------------*/

function registration() {
    const activities = document.getElementById("activities");
    
    //Event handler tabulates $ amount of selected activites to display
    //to the user
    activities.addEventListener("input", (e) => {     
        let totalCost = 0;  
        const activityOptions = document.getElementById("activities-box").children;

        for (let i = 0; i < activityOptions.length; i++) {
            const inputActivity = activityOptions[i].querySelector("input");
            
            if (inputActivity.checked) {
                const costPerSeminarString = inputActivity.getAttribute("data-cost");
                costPerSeminar = +costPerSeminarString;
                totalCost += costPerSeminar;
            }
        }
        const totalCostSelection = document.getElementById("activities-cost");
        totalCostSelection.textContent = `Total: $${totalCost}`;
    });
}
registration();

/*---------------------------
   Registration Activities
---------------------------*/

function activities() {
    //Handler show/hides selected activities that have a time conflict
    document.querySelector(".activities").addEventListener("change", (e) => {
        const clicked = e.target;
        const clickedType = clicked.getAttribute("data-day-and-time");

        for (let i = 1; i < activitiesClass.length; i++) {
            checkboxType = activitiesClass[i].getAttribute("data-day-and-time");

            //enable/disables conflicting activities
            if (clickedType === checkboxType && clicked !== activitiesClass[i]) {
                if (clicked.checked) {
                    activitiesClass[i].disabled = true;
                } else {
                    activitiesClass[i].disabled = false;
                }
            }
        } //Helper function that bubbles in order to add/remove cllass
        [...activitiesClass].forEach(checkbox => (checkbox.disabled) ? checkbox.parentElement.classList.add("disabled") : checkbox.parentElement.classList.remove("disabled"));
    });
}
activities();

/*---------------------------
           Payment
---------------------------*/

//toggles payment otpions and shows/hides selected payment choice and 
//any further options that pertain to payment type
function paymentMethod() {
    const paymentMenu = document.getElementById("payment");
    const creditCardPayment = document.getElementById("credit-card");
    const paypalPayment = document.getElementById("paypal");
    const bitcoinPayment = document.getElementById("bitcoin");

    //sets payment type to credit card on page load
    paymentMenu.children[1].selected = true;
    paypalPayment.style.display = "none";
    bitcoinPayment.style.display = "none";

    paymentMenu.addEventListener("change", (e) => {
        const clickedPayment = e.target.value;
        
        if (clickedPayment === "paypal") {
            creditCardPayment.style.display = "none";
            paypalPayment.style.display = "";
            bitcoinPayment.style.display = "none";
        } else if (clickedPayment === "bitcoin") {
            creditCardPayment.style.display = "none";
            paypalPayment.style.display = "none";
            bitcoinPayment.style.display = "";
        } else {
            creditCardPayment.style.display = "";
            paypalPayment.style.display = "none";
            bitcoinPayment.style.display = "none";
        }
    }); 
}
paymentMethod();

/*---------------------------
         Validators
---------------------------*/

//validates name field is letter based up to three names and not
//an empty field
const nameValidator = () => {
    const nameElement = document.querySelector("#name").value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameElement);

    return nameIsValid;
}

//email must have username followed by @ followed by domain name followed
//by domain name extension
const emailValidator = () => {
    const emailElement = document.querySelector("#email").value;
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailElement);

    return emailIsValid;
}

//at least one activity must be selected
const activitiesValidator = () => {
    const totalChecked = document.querySelectorAll(".activities input:checked").length;
    const activitiesIsValid = totalChecked > 0;

    return activitiesIsValid;
}

//only number length of 13 - 16 digits
const ccNumberValidator = () => {
    const ccNumberElement = document.querySelector("#cc-num").value;
    const ccNumberIsValid = /^\d{13,16}$/.test(ccNumberElement);

    return ccNumberIsValid;
}

//only 5 digit number
const ccZipValidator = () => {
    const ccZipElement = document.querySelector("#zip").value;
    const ccZipIsValid = /^\d{5}$/.test(ccZipElement);

    return ccZipIsValid;
}

//only 3 digit number
const cvvNumberValidator = () => {
    const cvvNumberIsValid = /^\d{3}$/.test(cvvNumberElement.value);

    return cvvNumberIsValid;
}

/*---------------------------
       Form Validation
---------------------------*/

//Allows validation of required fields. Displays error message based 
//on regex validators.
const formValidationMessage = (id, class1, class2, display = "") => {
    const labelToAppend = document.getElementById(id).parentElement;
    labelToAppend.classList.remove(class1);
    labelToAppend.classList.add(class2);
    labelToAppend.lastElementChild.style.display = display;
}

//conditional manages required fields and if corresponding user action
//required
const formValdiation = (e) => {
        
    if (!nameValidator()) {
        e.preventDefault();
        formValidationMessage("name", "valid", "not-valid", "block");
    } else {
        formValidationMessage("name", "not-valid", "valid");
    }

    if (!emailValidator()) {
        e.preventDefault();
        formValidationMessage("email", "valid", "not-valid", "block");
    } else {
        formValidationMessage("email", "not-valid", "valid");
    }

    if (!activitiesValidator()) {
        e.preventDefault();
        formValidationMessage("activities-box", "valid", "not-valid", "block");
    } else {
        formValidationMessage("activities-box", "not-valid", "valid");
    }

    //only validates when credit card is selected as payment type
    if (paymentMenu === "credit-card") {
        
        if (!ccNumberValidator()) {
            e.preventDefault();
            formValidationMessage("cc-num", "valid", "not-valid", "block");
        } else {
            formValidationMessage("cc-num", "not-valid", "valid");
        }

        if (!ccZipValidator()) {
            e.preventDefault();
            formValidationMessage("zip", "valid", "not-valid", "block");
        } else {
            formValidationMessage("zip", "not-valid", "valid");
        }
    }
}

/*---------------------------
        Focus / Blur
---------------------------*/

function focusBlur () {
    //handler changes focus and blur based on user input for all
    //"checkbox" Elements, bubble to control class addition/removal with
    //spread method for DRY coding
    [...activitiesClass].forEach((checkbox) => {
        checkbox.addEventListener("focus", (e) => checkbox.parentElement.classList.add("focus"));

        checkbox.addEventListener("blur", (e) => {
        const status = document.querySelector(".focus");

        if (status) status.classList.remove("focus");
        })
    });
}
focusBlur();

/*---------------------------
    Live CVV Error Handler
---------------------------*/

//chose input rather than keyup because of some potential issues with
//keyup method. Also removed CVV validator from Form Validation
//conditional for DRY
cvvNumberElement.addEventListener("input", (e) => {
    const cvvNum = e.target.value;
    
    if (!cvvNumberValidator()) {
        formValidationMessage("cvv", "valid", "not-valid", "block");
        //realtime validation of user entered digits
        cvvNumberElement.nextElementSibling.textContent = `You have entered ${cvvNum}. CVV must be 3 digits only`;
    } else {
        formValidationMessage("cvv", "not-valid", "valid");
    }
});
//handles validation upon submit. If user info passes, form submits;
//otherwise, error message in corresponding required field
formElement.addEventListener("submit", formValdiation);