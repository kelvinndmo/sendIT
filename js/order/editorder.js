function getUrlVars = () => {
  let vars = {};
  let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
};

const number = this.getUrlVars()["id"];
const { origin, weight, destination } = document.forms.order_edit.elements;
if (number > 0) {
  fetch(`https://seend34.herokuapp.com/api/v2/parcels/${number}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.token
    },
    method: "GET"
  })
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      const username = document.getElementById("username");
      username.innerText = data.order.sender;

      origin.value = data.order.origin;
      weight.value = data.order.weight;
      destination.value = data.order.destination;
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });

  // Update Destination
  destination.addEventListener("change", e => {
    console.log(e.target.value);
    fetch(
      `https://seend34.herokuapp.com/api/v2/parcels/${number}/destination`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.token
        },
        method: "PUT",
        body: JSON.stringify({ destination: e.target.value })
      }
    )
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

  // Update origin
  origin.addEventListener("change", e => {
    console.log(e.target.value);
    fetch(`https://seend34.herokuapp.com/api/v2/parcels/${number}/origin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token
      },
      method: "PUT",
      body: JSON.stringify({ origin: e.target.value })
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

  // Update weight
  weight.addEventListener("change", e => {
    console.log(e.target.value);
    fetch(`https://seend34.herokuapp.com/api/v2/parcels/${number}/weight`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token
      },
      method: "PUT",
      body: JSON.stringify({ weight: e.target.value })
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
}
