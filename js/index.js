{
  /* <li class="active"><a href="userdashboard.html">user DASHBOARD</a></li>
<li><a href="book.html">Place order</a></li>
<li>
  <a href="user.html"
    ><i class="fa fa-user-circle" aria-hidden="true"></i>LOGOUT</a
  >
</li> */
}

function navlinks(url) {
  const ul = document.getElementById("navigationlinks");
  const li = document.createElement("li");
  const a = document.createElement("a");
  const i = document.createElement("i");

  a.setAttribute("href", url.href);
  a.className = url.classname;
  a.innerHTML = url.text;

  i.className = "fa " + url.icon;
  i.setAttribute("aria-hidden", "true");

  ul.appendChild(li);
  li.appendChild(a);
  url.icon ? a.appendChild(i) : "";
}

function decodeToken(token) {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

if (localStorage.token && localStorage.user_id) {
  const decoded = decodeToken(localStorage.token);

  console.log(decoded);
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // Logout user
    // Remove token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    // Redirect to login
    window.location = window.location.origin + "/sendIT/user.html";
  }

  //    create url links
  navlinks({ href: "index.html", text: "Home" });
  navlinks({ href: "userdashboard.html", text: "DASHBOARD" });
  navlinks({ href: "book.html", text: "Place order" });
  if (decoded.identity === "AdminUser") {
    navlinks({ href: "", classname: "", text: "Admin Dashboard" });
  }
  navlinks({
    href: "logout.html",
    classname: "",
    icon: "fa-user-circle",
    text: "LOGOUT"
  });
} else {
  //    create url links
  navlinks({ href: "index.html", text: "Home" });
}

if (window.location.pathname !== "/sendIT/index.html" && !localStorage.token) {
  window.location = window.location.origin + "/sendIT/user.html";
}
