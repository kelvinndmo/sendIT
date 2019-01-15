// Register a user
const {
  username,
  email,
  password,
  submit_reg
} = document.forms.registration_form.elements;

submit_reg.addEventListener("click", e => {
  e.preventDefault();
  let data = {
    username: username.value,
    email: email.value,
    password: password.value
  };

  console.log("Submiting.......");
  console.log(data);
  fetch("https://seend34.herokuapp.com/api/v2/auth/signup", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
});
