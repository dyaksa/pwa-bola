import {
  getAllCompetitions,
  getSavedArticles
} from "./api.js";
import requestPermission from "./request-permission.js";
import registerServiceWorker from "./reg-sw.js";
import pushManager from "./push-manager.js";
const container = document.querySelector(".body-content");

function main() {
  const elems = document.querySelector(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  let page = window.location.hash.substr(1);
  if (page === "") page = "home";
  loadPage(page);

  if (!("serviceWorker" in navigator)) {
    console.log("service worker tidak didukung browser");
  } else {
    registerServiceWorker();
    requestPermission();
  }
  pushManager();
}

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
      if (page === "home") {
        getAllCompetitions();
      } else if (page === "saved") {
        getSavedArticles();
      }

      if (this.status == 200) {
        getAllCompetitions();
        container.innerHTML = xhr.responseText;
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

export default main();