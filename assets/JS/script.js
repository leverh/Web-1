const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  })

  document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }))


  const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});


document.addEventListener("DOMContentLoaded", function() {
  var cookieMessage = document.getElementById("cookie-message");
  var acceptButton = document.getElementById("cookie-accept");
  var declineButton = document.getElementById("cookie-decline");

  acceptButton.addEventListener("click", function() {
    cookieMessage.style.display = "none";
    // Handle cookie acceptance
    // Store preference or take necessary action
    enableTrackingCookies();
    showConfirmationMessage("You have accepted cookies. Thank you!", "accept");
  });

  declineButton.addEventListener("click", function() {
    cookieMessage.style.display = "none";
    // Handle cookie decline
    // Take necessary action, e.g., disabling tracking or non-essential cookies
    disableTrackingCookies();
    showConfirmationMessage("You have declined cookies. Some features may be limited.", "decline");
  });

  cookieMessage.style.display = "block";
});

function enableTrackingCookies() {
  // Enable or load tracking cookies
  document.cookie = "trackingEnabled=true; path=/;";
}

function disableTrackingCookies() {
  // Disable or block tracking cookies
  // Example: Remove or block cookies named "trackingEnabled" and "analyticsCookie"
  document.cookie = "trackingEnabled=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  // Additional code to block scripts associated with tracking or non-essential cookies
}

function showConfirmationMessage(message, type) {
  var confirmationMessage = document.getElementById("confirmation-message");
  confirmationMessage.innerText = message;
  confirmationMessage.style.display = "block";
  confirmationMessage.classList.add(type);
}
