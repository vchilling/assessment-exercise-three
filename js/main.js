var currentTab = 0;
showTab(currentTab);

var termsOfUse = document.querySelector('#terms-of-use');
var isCheckedTermsOfUse = termsOfUse.checked;
var bonusCodeCheckbox = document.querySelector('#bonus-code');
var isCheckedBonusCode = bonusCodeCheckbox.checked;
var bonusCodeInput = document.querySelector('#bonus-code-input');
var submitRegForm = document.querySelector('#submit-button');
var continueRegistration = document.querySelector('#continue-registration');
var finishRegistration = document.querySelector('#submit-button-finish');

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
}

termsOfUse.addEventListener('click', function(e) {
    if (isCheckedTermsOfUse == false) {
        isCheckedTermsOfUse = true;
    } else {
        isCheckedTermsOfUse = false;
    }
});

bonusCodeCheckbox.addEventListener('click', function(e) {
    if (isCheckedBonusCode == false) {
        isCheckedBonusCode = true;
        bonusCodeInput.classList.toggle("hidden");
        bonusCodeInput.required = true;
    } else {
        isCheckedBonusCode = false;
        bonusCodeInput.classList.toggle("hidden");
        bonusCodeInput.required = false;
    }
});

submitRegForm.addEventListener('click', function(e) {
    var isFormValid = validateRegForm();
    if (!isFormValid) {
        return false;
    }   
    $('reg-form').submit(function() {
        $.post($(this).attr('action'), $(this).serialize(), function(response) {

        }, 'json');
        return false;
    });
    nextStep();
});

continueRegistration.addEventListener('click', function(e) {
   nextStep();
});

finishRegistration.addEventListener('click', function(e) {
	var isFormValid = validateDetailedRegForm();
	if (!isFormValid) {
        return false;
    }
    $('detail-form').submit(function() {
        $.post($(this).attr('action'), $(this).serialize(), function(response) {

        }, 'json');
        return false;
    });
    nextStep();
});

function nextStep() {
    var x = document.getElementsByClassName("tab");    
    x[currentTab].style.display = "none";
    currentTab = currentTab + 1;
    showTab(currentTab);
}

function validateRegForm() {
    var regForm, regFormInputs, i, valid = true;
    regForm = document.querySelector('#reg-form');
    regFormInputs = regForm.getElementsByTagName("input");
    var pword = document.querySelector('#pword'); 
    for (i = 0; i < regFormInputs.length; i++) {
        if (regFormInputs[i].value == "") {
            regFormInputs[i].className += " invalid";
            valid = false;
        } else {
        	if (regFormInputs[i].type == "email") {
    			if ( !regFormInputs[i].checkValidity() ) {
			        regFormInputs[i].className += " invalid";
            		valid = false;
			    } 
    		} 
    		if (regFormInputs[i].name == "uname") {
    			if ( !regFormInputs[i].checkValidity() ) {
			        regFormInputs[i].className += " invalid";
            		valid = false;
			    } 
    		}
    		if (regFormInputs[i].type == "password") {
    			var isPassValid = false;
    			var passValue = regFormInputs[i].value; 
				if ( (passValue.length > 6) && (passValue.length < 12) && (passValue.match(/[a-z]/)) && (passValue.match(/[A-Z]/)) && (passValue.match(/\d+/)) && (passValue.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) ) {
			    	isPassValid = true;
			    }
			    if (!isPassValid) {
			        regFormInputs[i].className += " invalid";
            		valid = false;
			    }
    		}
    		if (regFormInputs[i].name == "pwordconf") {
    			if (regFormInputs[i].value !== pword.value) {
			    	regFormInputs[i].className += " invalid";
					valid = false;
			    }  
    		}    		
        }         
    }  	
    	
	if (isCheckedTermsOfUse == false) {
		var termsOfUsePlaceholder = document.getElementById("terms-of-use-placeholder");
    	termsOfUsePlaceholder.classList.add("mandatory");
        return false;
    }
    return valid; 
}

function validateDetailedRegForm() {
   var regForm, regFormInputs, i, valid = true;
   regForm = document.querySelector('#detail-form');
   regFormInputs = regForm.getElementsByTagName("input");
   for (i = 0; i < regFormInputs.length; i++) {
        if ((regFormInputs[i].required) && (regFormInputs[i].value == "")) {
            regFormInputs[i].className += " invalid";
            valid = false;    		
        }         
    }  	
    return valid; 
}