// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
  form.addEventListener('submit', event => {

    const ratingInput = form.querySelector('#ratingInput');

    // Only run this if ratingInput exists in THIS form
    if (ratingInput && !ratingInput.value) {
      ratingInput.classList.add("is-invalid");
      event.preventDefault();
      event.stopPropagation();
    }

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add('was-validated');

  }, false);
});
})()

const stars = document.querySelectorAll(".star");
const ratingInput = document.getElementById("ratingInput");
const ratingError = document.getElementById("ratingError");

stars.forEach(star => {
  star.addEventListener("click", () => {
    const value = star.getAttribute("data-value");
    ratingInput.value = value;

    stars.forEach(s => {
      s.classList.remove("fa-solid");
      s.classList.add("fa-regular");
    });

    for (let i = 0; i < value; i++) {
      stars[i].classList.remove("fa-regular");
      stars[i].classList.add("fa-solid");
    }

    ratingError.style.display = "none";
  });
});

