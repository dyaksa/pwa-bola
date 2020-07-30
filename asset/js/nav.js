import { getAllCompetitions } from "./api.js";
const container = document.querySelector(".body-content");

function loadNav() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status != 200) return;

      document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
        elm.innerHTML = xhr.responseText;
      });
      document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
        elm.addEventListener("click", (event) => {
          const sidenav = document.querySelector(".sidenav");
          M.Sidenav.getInstance(sidenav).close();

          const page = event.target.getAttribute("href").substr(1);
          loadPage(page);
        });
      });
    }
  };
  xhr.open("GET", "nav.html", true);
  xhr.send();
}

function loadPage(page) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        container.innerHTML = xhr.responseText;
        getAllCompetitions();
      } else if (this.status == 404) {
        container.innerHTML = "<p>Halaman tidak ditemukan</p>";
      } else {
        container.innerHTML = "<p>Halaman tidak bisa diakses</p>";
      }
    }
  };

  xhr.open("GET", `pages/${page}.html`, true);
  xhr.send();
}

export { loadNav, loadPage };
