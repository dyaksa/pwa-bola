import "./db.js";

const BASE_URL = "https://api.football-data.org";
const API_KEY = "f9ad9efc2e824018a5c3e637dc298fd9";

class DataSource {
  static getAllStandings() {
    if ("caches" in window) {
      caches
        .match(`${BASE_URL}/v2/competitions/2015/standings`)
        .then((response) => {
          if (response) {
            response.json().then((data) => {
              let bodyContainer = document.getElementById("articles");
              let articlesHTML = "";
              const articles = data.standings[0].table;
              articles.forEach((article) => {
                let {
                  position,
                  team,
                  playedGames,
                  won,
                  draw,
                  points,
                } = article;
                articlesHTML += `<div class="col s12 m3">
                <div class="card">
                <a href="./pages/article.html?id=${team.id}">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="img-cover" src="${team.crestUrl}" alt="img" />
                </div>
                </a>
                <div class="card-content">
                <span class="card-title truncate">${team.name}</span>
                <p>Position : ${position}</p>
                <p>Points : ${points} </p>
                <p>Won : ${won}</p>
                <p>Draw : ${draw}</p>
                </div>
                </div>
            </div>`;
              });
              bodyContainer.innerHTML = articlesHTML;
            });
          }
        });
    }
    return fetch(`${BASE_URL}/v2/competitions/2015/standings`, {
        method: "GET",
        headers: {
          "X-Auth-Token": API_KEY,
        },
      })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        return Promise.resolve(results.standings[0].table);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  static getArticleById() {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    if ("caches" in window) {
      caches.match(`${BASE_URL}/v2/teams/${id}`).then(response => {
        if (response) {
          response.json().then(data => {
            let {
              address,
              crestUrl,
              email,
              founded,
              name,
              phone,
              website
            } = data;
            let articleHTML = `
            <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img style="height: 500px" class="activator" src="${crestUrl}">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">${name}</span>
              <p><a href="#">${website}</a></p>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">${name}<i class="material-icons right">close</i></span>
              <p>address : ${address}</p>
              <p>email : ${email}</p>
              <p>founded : ${founded}</p>
              <p>phone : ${phone}</p>
            </div>
          </div>
            `
            document.getElementById("body-content").innerHTML = articleHTML;
            Promise.resolve(data);
          })
        }
      })
    }
    return fetch(`${BASE_URL}/v2/teams/${id}`, {
      method: "GET",
      headers: {
        "X-Auth-Token": API_KEY
      }
    }).then(response => {
      return response.json();
    }).then(results => {
      return Promise.resolve(results);
    }).catch(err => {
      return Promise.reject(err);
    })
  }
}

export default DataSource;