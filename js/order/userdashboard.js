const rowdata = document.getElementById("row_data");

fetch(
  `https://seend34.herokuapp.com/api/v2/users/${localStorage.user_id}/parcels`,
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.token
    },
    method: "GET"
  }
)
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
      ahref.setAttribute("href", `edit.html?id=${order.id}`);

      const icon1 = document.createElement("i");
      icon1.className = "fa fa-pencil btn-accept";

      const history__item7 = document.createElement("div");
      history__item7.className = "history__item";

      const icon2 = document.createElement("i");
      icon2.className = "fa fa-times-circle btn-reject";

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
      rows.appendChild(history__item7);
      history__item7.appendChild(icon2);
    });
  });
