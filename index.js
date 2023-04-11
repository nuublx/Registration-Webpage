"use strict";
// function that handles the submission of the form using ajax request

const submitForm = function () {
  const form = document.getElementById("my-form");
  event.preventDefault(); // prevent the form from submitting normally
  // create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  debugger;
  // configure the request
  xhr.open("POST", "submit-form.php");
  // set the callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      let resp = JSON.parse(xhr.response);
      if (resp["error"] == null) console.log(resp["message"]);
      else console.log(resp["error"]);
      // do something with the response
    }
  };

  // send the request with the form data
  xhr.send(new FormData(form));
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
  debugger;
  let result = check_phoneNumber(userInput);

  const errorMessage = document.createElement("p");

  if (result == -1) {
    errorMessage.textContent =
      "Input must be at least 11 characters long and at most 15 characters long.";
    errorMessage.style.color = "red";
    errorMessage.style.font = "14px";
  } else if (result == -2) {
    errorMessage.textContent = "Input must be digits only.";
    errorMessage.style.color = "red";
    errorMessage.style.font = "14px";
  }
  if (result != 1) {
    // check if an error message already appeared
    if (document.getElementById("phone_error")) {
      document.getElementById("phone_error").remove();
    }

    errorMessage.id = "phone_error";
    document
      .getElementById("phoneNumber")
      .insertBefore(errorMessage, phoneNumber.previousSibling);
  }
});
