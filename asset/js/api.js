import DataSource from "../js/data-source.js";
import {
  getAll,
  getById,
  deleteById
} from "../js/db.js";

const getAllCompetitions = async () => {
  try {
    const standings = DataSource.getAllStandings();
    const table = await standings;
    let articles = document.getElementById("articles");
    let articlesHTML = "";
    table.forEach((article) => {
      const {
        position,
        playedGames,
        won,
        draw,
        points,
        team
      } = article;
      articlesHTML += `
            <div class="col s12 m3">
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
            </div>
            `;
    });
    articles.innerHTML = articlesHTML;
  } catch (err) {
    return;
  }
};

const getTeamById = async () => {
  try {
    const results = DataSource.getArticleById();
    const team = await results;
    let container = document.getElementById("body-content");
    let articleHTML = "";
    let {
      address,
      crestUrl,
      email,
      founded,
      name,
      phone,
      website
    } = team;
    articleHTML += `<div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img id="imgThumb" style="height: 500px" class="activator" src="${crestUrl}">
    </div>
    <div class="card-content">
      <span id="teamName" class="card-title activator grey-text text-darken-4">${name}</span>
      <p><a id="teamWebsite" href="#">${website}</a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${name}<i class="material-icons right">close</i></span>
      <p id="teamAddress">address : ${address}</p>
      <p id="teamEmail">email : ${email}</p>
      <p id="teamFounded">founded : ${founded}</p>
      <p id="teamPhone">phone : ${phone}</p>
    </div>
  </div>`
    container.innerHTML = articleHTML;
    return Promise.resolve(team);
  } catch (err) {
    console.log(err);
  }
}

const getSavedArticles = async () => {
  try {
    let results = getAll();
    let teams = await results;
    let articles = document.getElementById("articles-saved");
    let articlesHTML = "";
    teams.forEach(team => {
      let {
        id,
        crestUrl,
        name,
      } = team;
      articlesHTML += `<div class="col s12 m3">
      <div class="card">
      <a href="./pages/article.html?id=${id}&saved=true">
      <div class="card-image waves-effect waves-block waves-light">
          <img class="img-cover" src="${crestUrl}" alt="img" />
      </div>
      </a>
      <div class="card-content">
      <span class="card-title truncate">${name}</span>
      <button id="${id}" class="waves-effect waves-light btn">Delete</button>
      </div>
      </div>
  </div>`
    });
    articles.innerHTML = articlesHTML;
    let removeButtons = document.querySelectorAll(".btn");
    removeButtons.forEach(button => {
      button.addEventListener("click", event => {
        let id = event.target.id;
        deleteById(id).then(() => {
          getSavedArticles();
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
}

const getSavedArticleById = async () => {
  let urlParams = new URLSearchParams(window.location.search);
  let id = parseInt(urlParams.get("id"));
  try {
    let result = getById(id);
    let team = await result;
    let articles = document.getElementById("body-content");
    let {
      address,
      crestUrl,
      email,
      founded,
      name,
      phone,
      website
    } = team;

    let articlesHTML = `<div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img id="imgThumb" style="height: 500px" class="activator" src="${crestUrl}">
    </div>
    <div class="card-content">
      <span id="teamName" class="card-title activator grey-text text-darken-4">${name}</span>
      <p><a id="teamWebsite" href="#">${website}</a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">${name}<i class="material-icons right">close</i></span>
      <p id="teamAddress">address : ${address}</p>
      <p id="teamEmail">email : ${email}</p>
      <p id="teamFounded">founded : ${founded}</p>
      <p id="teamPhone">phone : ${phone}</p>
    </div>
  </div>`
    articles.innerHTML = articlesHTML;
  } catch (err) {
    console.log(err);
  }
}

export {
  getAllCompetitions,
  getTeamById,
  getSavedArticles,
  getSavedArticleById
};