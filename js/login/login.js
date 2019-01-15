// login a user

const {
  log_username,
  log_pass,
  log_submit
} = document.forms.form_login.elements;

log_submit.addEventListener("click", e => {
  e.preventDefault();
  let data = {
    username: log_username.value,
    password: log_pass.value
  };

  console.log("Submiting.......");
  console.log(data);
  fetch("https://seend34.herokuapp.com/api/v2/auth/login", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      const { token, id } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", id);
      if (localStorage.token) {
        window.location = window.location.origin + "/sendIT/book.html";
      }
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
});
