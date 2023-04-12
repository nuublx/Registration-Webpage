"use strict";
// function that handles the submission of the form using ajax request

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
      if (resp["error"] == null) {
        console.log(resp["message"]);
      }
      else console.log(resp["error"]);
      // do something with the response
    }
  };

  // send the request with the form data
  xhr.send(new FormData(form));
};

const getActors = function () {
  var xhttp = new XMLHttpRequest();

  let birthdate = document.getElementById("birthdate").value;
  let errorMessage = document.getElementById("birthdate-error");

  if (birthdate.trim() === '') {
    errorMessage.style.color = "red";
    errorMessage.style.font = "14px";
    errorMessage.textContent = "Birthdate is required";
    setTimeout(function () {
      errorMessage.innerHTML = "";
    }, 3000); // 5000 milliseconds = 5 seconds

  } else {
    // Create a new Date object using the date string
    var date = new Date(birthdate);

    // Extract the month, and day values from the Date object
    var month = date.getMonth() + 1; // Add 1 because getMonth() returns values from 0 to 11
    var day = date.getDate();
    console.log(month);

    var url = "API_Ops.php?month=" + month + "&day=" + day;

    let path = "popup.html";
    let HTMLurl = window.location.href + path;
    let popup = window.open(HTMLurl, "Actors Born on that day", "width=400,height=600");

    debugger;
    xhttp.open("GET", url, true);
    xhttp.send();

    xhttp.onload = function () {
      if (xhttp.status === 200) {
        let resp = JSON.parse(xhttp.response);

        let myList = popup.document.getElementById('myList');
        let array = resp["Actors' names"];
        for (let i = 0; i < array.length; i++) {
          let listItem = document.createElement('li');
          listItem.textContent = array[i];
          myList.appendChild(listItem);
        }
      };
    };
  };
};

// validating phone number

const phoneNumber = document.getElementById("phone");

const check_phoneNumber = function (phoneNumber) {
  let response = 1;
  if (phoneNumber.length < 11 || phoneNumber.length > 15) response = -1;

  for (let i = 0; i < phoneNumber.length; i++) {
    if (phoneNumber[i] < "0" || phoneNumber > "9") {
      response = -2;
      break;
    }
  }

  return response;
};

phoneNumber.addEventListener("blur", function () {
  const userInput = phoneNumber.value;
  // debugger;
  let result = check_phoneNumber(userInput);

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
    errorMessage.id = "phone_error";
    document
      .getElementById("phoneNumber")
      .insertBefore(errorMessage, phoneNumber.previousSibling);
  }
});

// validating full name

const fullName = document.getElementById("full_name");

const check_fullName = function (fullName) {
  for (let i = 0; i < fullName.length; i++) {
    if (fullName[i] == " ") continue;
    const charCode = fullName.charCodeAt(i);
    if (
      !(charCode > 64 && charCode < 91) &&
      !(charCode > 96 && charCode < 123)
    ) {
      return false;
    }
  }
  return true;
};

fullName.addEventListener("blur", function () {
  const userInput = fullName.value;
  //debugger;
  if (!check_fullName(userInput)) {
    const errorMessage = document.createElement("p");
    errorMessage.style.color = "red";
    errorMessage.style.font = "14px";
    errorMessage.textContent = "Input must be all alphabet letters";

    // check if an error message already appeared
    if (document.getElementById("full_name_error")) {
      document.getElementById("full_name_error").remove();
    }

    errorMessage.id = "full_name_error";
    document
      .getElementById("fullName")
      .insertBefore(errorMessage, fullName.previousSibling);
  } else {
    // check if an error message already appeared
    if (document.getElementById("full_name_error")) {
      document.getElementById("full_name_error").remove();
    }
  }
});

// validate email address

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const emailAddress = document.getElementById("email");

emailAddress.addEventListener("blur", function () {
  const userInput = emailAddress.value;
  //debugger;
  if (!validateEmail(userInput)) {
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
    // check if an error message already appeared
    if (document.getElementById("email_error")) {
      document.getElementById("email_error").remove();
    }
  }
});