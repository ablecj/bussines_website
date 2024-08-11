$(document).ready(function() {
    includeHTML(function() {
        // Reinitialize the navbar toggler functionality after loading HTML
        $('.navbar-toggler').click(function() {
            console.log('Button click!!');
            $('#navbarNav').toggleClass('show');
        });
    });
});

// Function for including HTML
function includeHTML(callback) {
    var elements = document.getElementsByTagName("*");
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var file = element.getAttribute("include-html");
        if (file) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) { 
                        element.innerHTML = this.responseText;
                        element.removeAttribute("include-html");
                        if (typeof callback === 'function') callback(); // Call the callback function
                    }
                    if (this.status == 404) { element.innerHTML = "Page not found."; }
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

// function for sending mail 
function sendMail(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
  
    let params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
    //   subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };
  
    if (validateName(name) && validateEmail(email)) {
      emailjs.send("service_fdf827a", "template_nml1v37", params).then(
        function (response) {
          alert("Message sent successfully!");
          location.reload();
        },
        function (error) {
          alert("Failed to send message. Please try again.");
        }
      );
    } else {
      if (validateName(name)) {
        alert("Please enter a valid email address.");
      } else {
        alert("Please enter a valid name.");
      }
    }
    
  }
  
  function validateName(name) {
    const namePattern = /^[A-Za-z\s]+$/;
    return namePattern.test(name);
  }
  
  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  
  document.getElementById("contactForm").addEventListener("submit", sendMail);