$(document).ready(function() {
  // Toggle navbar on hamburger icon click
  $('.fa-bars').click(function() {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  // Change header style on scroll
  $(window).on('load scroll', function() {
    $('.fa-bars').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if ($(window).scrollTop() > 30) {
      $('.header').css({ 'background': '#6C5CE7', 'box-shadow': '0 .2rem .5rem rgba(0,0,0,.4)' });
    } else {
      $('.header').css({ 'background': 'none', 'box-shadow': 'none' });
    }
  });

  // Accordion functionality
  $('.accordion-header').click(function() {
    $('.accordion .accordion-body').slideUp();
    $(this).next('.accordion-body').slideDown();
    $('.accordion .accordion-header span').text('+');
    $(this).children('span').text('-');
  });

  // Preloader functionality
  var loader = document.getElementById("preloader");
  if (loader) {
    window.addEventListener("load", function() {
      loader.style.display = "none";
    });
  }

  // Popup functionality
  const main = document.querySelector('.main');
  const popup = document.querySelector('.popup');
  const close = document.querySelector('.close');
  const click = document.querySelector('.click');

  // Ensure main and popup exist before trying to manipulate them
  if (popup && main) {
    window.onload = function() {
      setTimeout(() => {
        popup.style.display = "block";
        main.style.filter = "blur(2px)";
      }, 2000);
    }

    if (close) {
      close.addEventListener('click', () => {
        popup.style.display = "none";
        main.style.filter = "blur(0px)";
      });
    }

    if (click) {
      click.addEventListener('click', () => {
        popup.style.display = "none";
        main.style.filter = "blur(0px)";
      });
    }
  }

  // Login form submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting the default way

      const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      };

      fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {

          alert('Login successful! Redirecting...');
            
            // Close the popup
            
            window.location.href = 'index1.html'; 
        } else {
          alert(data.message || 'Login failed.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  }

  // Scroll to top button functionality
  const to_top = document.querySelector(".to-top");
  if (to_top) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        to_top.classList.add("active");
      } else {
        to_top.classList.remove("active");
      }
    });

    to_top.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
