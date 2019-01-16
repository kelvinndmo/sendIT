const { origin, destination, weight } = document.forms.form_parcel.elements;

const alert = document.getElementById("alert");

send_parcel.addEventListener("click", e => {
  e.preventDefault();
  let data = {
    origin: origin.value,
    destination: destination.value,
    weight: weight.value
  };

  if (!data.weight) {
    alert.className = "alert alert-success alert-dismissible fade show";
    alert.innerText = "weight field can not be blank.";

    setTimeout(() => {
      alert.className = "alert alert-success alert-dismissible fade";
    }, 3000);
  } else {
    fetch("https://seend34.herokuapp.com/api/v2/parcels", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        alert.className = "alert alert-success alert-dismissible fade show";
        alert.innerText = data.message;

        setTimeout(() => {
          alert.className = "alert alert-success alert-dismissible fade";
        }, 3000);
      })
      .catch(error => {
        console.log(error);
      });
  }
});
