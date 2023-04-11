"use strict";

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
