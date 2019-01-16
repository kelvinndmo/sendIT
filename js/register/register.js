// Register a user
const {
  username,
  email,
  password,
  submit_reg
} = document.forms.registration_form.elements;
const alert = document.getElementById("alert");

submit_reg.addEventListener("click", e => {
  e.preventDefault();
  let data = {
    username: username.value,
    email: email.value,
    password: password.value
  };
  fetch("https://seend34.herokuapp.com/api/v2/auth/signup", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      if (data.message) {
        alert.className = "alert alert-success alert-dismissible fade show";
        alert.innerText = data.message;

        setTimeout(() => {
          alert.className = "alert alert-success alert-dismissible fade";

          window.location = window.location.origin + "/sendIT/user.html";
        }, 3000);
      }
    })
    .catch(error => {
      alert.className = "alert alert-success alert-dismissible fade show";
      alert.innerText = error;

      setTimeout(() => {
        alert.className = "alert alert-success alert-dismissible fade";
      }, 3000);
    });
});
