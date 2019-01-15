const { origin, destination, weight } = document.forms.form_parcel.elements;

send_parcel.addEventListener("click", e => {
  e.preventDefault();
  let data = {
    origin: origin.value,
    destination: destination.value,
    weight: weight.value
  };

  console.log("Submiting.......");
  console.log(data);
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
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
});
