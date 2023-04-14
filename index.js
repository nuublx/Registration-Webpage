"use strict";
// function that handles the submission of the form using ajax request
//TODO
/*
1)
make phone input take + in the first character
and allow spaces between numbers maximum one space between two digits
2) show a notification if the user already exist
or the user has registered successfully.
*/
const fullName = document.getElementById("full_name");
const phoneNumber = document.getElementById("phone");
const emailAddress = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm_password");

const switchButton = function (choice) {
  const myButton = document.getElementById("submit");
  if (choice == 1) {
    myButton.disabled = false;
    myButton.style.backgroundColor = '#4caf50';
  }

  if (choice == 0) {
    myButton.disabled = true;
    myButton.style.backgroundColor = 'grey';

  };
};

const check_fullName = function () {
  const fullName = document.getElementById("full_name").value;
  let name_is_spaces = true;
  for (let i = 0; i < fullName.length; i++) {
    if (fullName[i] == " ") continue;

    const charCode = fullName.charCodeAt(i);

    if (
      !(charCode > 64 && charCode < 91) &&
      !(charCode > 96 && charCode < 123)
    ) {
      return false;
    }

    // if the fullname was all spaces execution won't reach here
    name_is_spaces = false;
  }

  if (name_is_spaces) {
    return false;
  }

  return true;
};

const birthValidation = function () {
  const birthdate = document.getElementById("birthdate").value;
  if (birthdate.trim() === "") {
    return false;
  }
  return true;
};

const check_phoneNumber = function () {
  const phoneNumber = document.getElementById("phone").value;
  let response = 1;
  if (phoneNumber.length < 11 || phoneNumber.length > 15) response = -1;

  if ((phoneNumber[0] != "+" && phoneNumber[0] < "0") || phoneNumber[0] > "9") {
    response = -2;
  }

  for (let i = 1; i < phoneNumber.length; i++) {
    if (phoneNumber[i] < "0" || phoneNumber[i] > "9") {
      response = -2;
      break;
    }
  }

  return response;
};

const validateEmail = function () {
  const emailAddress = document.getElementById("email").value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(emailAddress);
};

const submitForm = function () {
  const form = document.getElementById("my-form");
  event.preventDefault(); // prevent the form from submitting normally
  // create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  debugger;
  // configure the request
  xhr.open("POST", "formController.php");
  // set the callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      let resp = JSON.parse(xhr.response);
      let notify = document.getElementById("notify");
      if (resp["error"] == null) {
        notify.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert" style="width:22%;z-index:2;">User registered successfully!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
      } else
        notify.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert" style="width:22%; z-index:2;">Username already exist!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;

      // do something with the response
    }
    window.scrollTo(0, 0);

  };

  // send the request with the form data
  xhr.send(new FormData(form));
};

const getActors = function () {
  //debugger
  event.preventDefault(); // prevent the form from submitting normally

  var xhttp = new XMLHttpRequest();

  if (birthValidation()) {
    if (document.getElementById("birthDate_error")) {
      document.getElementById("birthDate_error").remove();
    }

    const birthdate = document.getElementById("birthdate").value;
    // Create a new Date object using the date string
    var date = new Date(birthdate);

    // Extract the month, and day values from the Date object
    var month = date.getMonth() + 1; // Add 1 because getMonth() returns values from 0 to 11
    var day = date.getDate();
    console.log(month);

    var url = "API_Ops.php?month=" + month + "&day=" + day;

    let path = "popup.html";
    let HTMLurl = window.location.href + path;
    let popup = window.open(
      HTMLurl,
      "Actors Born on that day",
      "width=400,height=600"
    );

    // debugger;
    xhttp.open("GET", url, true);
    xhttp.send();

    xhttp.onload = function () {
      if (xhttp.status === 200) {
        let resp = JSON.parse(xhttp.response);

        let myList = popup.document.getElementById("myList");
        let array = resp["Actors' names"];
        for (let i = 0; i < array.length; i++) {
          let listItem = document.createElement("li");
          listItem.textContent = array[i];
          myList.appendChild(listItem);
        }
      }
    };
  } else {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "BirthDate is required!";
    errorMessage.style.color = "red";
    errorMessage.style.font = "14px";
    // check if an error message already appeared
    if (document.getElementById("birthDate_error")) {
      document.getElementById("birthDate_error").remove();
    }

    errorMessage.id = "birthDate_error";
    document
      .getElementById("birthDate")
      .insertBefore(errorMessage, birthdate.previousSibling);
  }
};

// validating phone number

phoneNumber.addEventListener("blur", function () {
  debugger;
  let result = check_phoneNumber();

  const errorMessage = document.createElement("p");

  if (result == -1) {
    errorMessage.textContent =
      "Input must be at least 11 characters long and at most 15 characters long";
    errorMessage.style.color = "red";
    errorMessage.style.font = "14px";
  } else if (result == -2) {
    errorMessage.textContent = "Input must be digits only";
    errorMessage.style.color = "red";
    errorMessage.style.font = "14px";
  }
  // check if an error message already appeared
  if (document.getElementById("phone_error")) {
    document.getElementById("phone_error").remove();
  }

  if (result != 1) {
    switchButton(0);
    errorMessage.id = "phone_error";
    document
      .getElementById("phoneNumber")
      .insertBefore(errorMessage, phoneNumber.previousSibling);
  } else switchButton(1);
});

// validating full name

fullName.addEventListener("blur", function () {
  const userInput = fullName.value;
  //debugger;
  if (!check_fullName(userInput)) {
    const errorMessage = document.createElement("p");
    errorMessage.style.color = "red";
    errorMessage.style.font = "14px";
    errorMessage.textContent = "Input must be all alphabet letters";
    switchButton(0);

    // check if an error message already appeared
    if (document.getElementById("full_name_error")) {
      document.getElementById("full_name_error").remove();
    }

    errorMessage.id = "full_name_error";
    document
      .getElementById("fullName")
      .insertBefore(errorMessage, fullName.previousSibling);
  } else {
    switchButton(1);
    // check if an error message already appeared
    if (document.getElementById("full_name_error")) {
      document.getElementById("full_name_error").remove();
    }
  }
});

emailAddress.addEventListener("blur", function () {
  debugger;
  if (!validateEmail()) {
    switchButton(0);
    const errorMessage = document.createElement("p");
    errorMessage.style.color = "red";
    errorMessage.style.font = "14px";
    errorMessage.textContent = "Email is invalid";

    // check if an error message already appeared
    if (document.getElementById("email_error")) {
      document.getElementById("email_error").remove();
    }

    errorMessage.id = "email_error";
    document
      .getElementById("Email")
      .insertBefore(errorMessage, emailAddress.previousSibling);
  } else {
    switchButton(1);

    // check if an error message already appeared
    if (document.getElementById("email_error")) {
      document.getElementById("email_error").remove();
    }
  }
});

birthdate.addEventListener("blur", function () {
  debugger;
  if (!birthValidation()) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "BirthDate is required!";
    errorMessage.style.color = "red";
    errorMessage.style.font = "14px";
    // check if an error message already appeared
    if (document.getElementById("birthDate_error")) {
      document.getElementById("birthDate_error").remove();
    }

    errorMessage.id = "birthDate_error";
    document
      .getElementById("birthDate")
      .insertBefore(errorMessage, birthdate.previousSibling);

    switchButton(0);
  } else {
    // birthdate is correct enable button and remove error
    switchButton(1);
    if (document.getElementById("birthDate_error")) {
      document.getElementById("birthDate_error").remove();
    }
  }
});



// validate password 
function validatePassword() {

  var flag = true;

  const passwordLengthCheck = document.getElementById("password_length_check");
  const passwordNumberCheck = document.getElementById("password_number_check");
  const passwordSpecialCheck = document.getElementById("password_special_check");
  const passwordMatchCheck = document.getElementById("password_match_check");

  // Password is at least 8 characters long
  if (password.value.length < 8) {
    passwordLengthCheck.innerHTML = '&#x2718;';
    passwordLengthCheck.style.color = "red";
    flag = false;
  } else {
    passwordLengthCheck.innerHTML = '&#x2714;';
    passwordLengthCheck.style.color = "green";
  }


  // Password includes at least one digit
  var digitRegex = /(?=.*\d)/;
  if (!digitRegex.test(password.value)) {
    passwordNumberCheck.innerHTML = '&#x2718;';
    passwordNumberCheck.style.color = "red";
    flag = false;
  } else {
    passwordNumberCheck.innerHTML = '&#x2714;';
    passwordNumberCheck.style.color = "green";
  }

  // Password includes at least one special character
  var sRegex = /(?=.*[!@#$%^&*_/])/;
  if (!sRegex.test(password.value)) {
    passwordSpecialCheck.innerHTML = '&#x2718;';
    passwordSpecialCheck.style.color = "red";
    flag = false;
  } else {
    passwordSpecialCheck.innerHTML = '&#x2714;';
    passwordSpecialCheck.style.color = "green";
  }


  if ((password.value !== confirm_password.value) || password.value.length == 0) {
    passwordMatchCheck.innerHTML = '&#x2718;';
    passwordMatchCheck.style.color = "red";
    flag = false;
  } else {
    passwordMatchCheck.innerHTML = '&#x2714;';
    passwordMatchCheck.style.color = "green";
  }

  // Password is valid
  return flag;
}

password.addEventListener("blur", function () {
  if (validatePassword()) {
    switchButton(1);
  } else {
    switchButton(0);
  }
});

confirm_password.addEventListener("blur", function () {
  if (validatePassword()) {
    switchButton(1);
  } else {
    switchButton(0);
  }
});
