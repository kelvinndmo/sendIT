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

  if (!data.username) {
    alert.className = "alert alert-success alert-dismissible fade show";
    alert.innerText = "Username field can not be blank";

    setTimeout(() => {
      alert.className = "alert alert-success alert-dismissible fade";
    }, 3000);
  } else if (!data.password) {
    alert.className = "alert alert-success alert-dismissible fade show";
    alert.innerText = "Password field can not be blank";

    setTimeout(() => {
      alert.className = "alert alert-success alert-dismissible fade";
    }, 3000);
  } else {
    fetch("https://seend34.herokuapp.com/api/v2/auth/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        const { token, id, message } = data;

        alert.className = "alert alert-success alert-dismissible fade show";
        alert.innerText = message;

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user_id", id);

          setTimeout(() => {
            alert.className = "alert alert-success alert-dismissible fade";

            if (localStorage.token) {
              window.location =
                window.location.origin + "/sendIT/userdashboard.html";
            }
          }, 1000);
        }
      })
      .catch(error => {
        alert.className = "alert alert-success alert-dismissible fade show";
        alert.innerText = error;

        setTimeout(() => {
          alert.className = "alert alert-success alert-dismissible fade";
        }, 3000);
      });
  }
});
