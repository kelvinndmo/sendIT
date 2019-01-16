const { adminlocation, adminstatus } = document.forms.admineditform.elements;
const alert = document.getElementById("alert");
const modal = document.querySelector("#modal");
const modalOverlay = document.querySelector("#modal-overlay");
const closeButton = document.querySelector("#close-button");
const openButton = document.querySelector("#open-button");

const rowdata = document.getElementById("row_data");

fetch(`https://seend34.herokuapp.com/api/v2/parcels`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.token
  },
  method: "GET"
})
  .then(response => {
    return response.json();
  })
  .then(data => {
    Object.values(data.orders).map(order => {
      const rows = document.createElement("div");
      rows.className = "rows";

      const history__item = document.createElement("div");
      history__item.className = "history__item";

      const icon = document.createElement("i");
      icon.className = "fa fa-user-circle";
      icon.setAttribute("aria-hidden", "true");
      icon.innerText = order.sender;

      const history__item1 = document.createElement("div");
      history__item1.className = "history__item";
      history__item1.innerText = order.destination;

      const history__item2 = document.createElement("div");
      history__item2.className = "history__item";
      history__item2.innerText = order.origin;

      const history__item3 = document.createElement("div");
      history__item3.className = "history__item";
      history__item3.innerText = order.weight;

      const history__item4 = document.createElement("div");
      history__item4.className = "history__item";
      history__item4.innerText = order.status;

      const history__item5 = document.createElement("div");
      history__item5.className = "history__item";
      const history__item6 = document.createElement("div");
      history__item6.className = "history__item";

      const accept_order = document.createElement("div");
      accept_order.className = "accept_order";

      const ahref = document.createElement("a");

      const icon1 = document.createElement("i");
      icon1.className = "fa fa-pencil btn-accept";
      icon1.setAttribute("onclick", `editIncidentRecord(${order.id})`);

      rowdata.appendChild(rows);
      rows.appendChild(history__item);
      history__item.appendChild(icon);
      rows.appendChild(history__item1);
      rows.appendChild(history__item2);
      rows.appendChild(history__item3);
      rows.appendChild(history__item4);
      rows.appendChild(history__item5);
      history__item5.appendChild(history__item6);
      history__item6.appendChild(accept_order);
      accept_order.appendChild(ahref);
      ahref.appendChild(icon1);
    });
  });

adminlocation.addEventListener("change", e => {
  console.log("changing admin location");
});

adminstatus.addEventListener("change", e => {
  let newStatus = e.target.value;

  let newUrl =
    newStatus === "completed"
      ? "completed"
      : newStatus === "In Transit"
      ? "intransit"
      : newStatus === "accepted"
      ? "approved"
      : newStatus === "declined"
      ? "declined"
      : "";

  fetch(
    `https://seend34.herokuapp.com/api/v2/parcels/${
      localStorage.edit_id
    }/${newUrl}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.token
      },
      method: "PUT"
    }
  )
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      alert.className = "alert alert-warning alert-dismissible fade show";
      alert.innerText = data.message;

      setTimeout(() => {
        alert.className = "alert alert-warning alert-dismissible fade";
      }, 3000);
    })
    .catch(error => {
      alert.className = "alert alert-danger alert-dismissible fade show";
      alert.innerText = error;

      setTimeout(() => {
        alert.className = "alert alert-danger alert-dismissible fade";
      }, 3000);
    });
});

closeButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

function editIncidentRecord(id) {
  console.log(id);
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");

  localStorage.setItem("edit_id", id);

  if (id) {
    fetch(`https://seend34.herokuapp.com/api/v2/parcels/${id}`, {
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
        adminlocation.value = data.order.current_location;
        adminstatus.value = data.order.status;

        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
