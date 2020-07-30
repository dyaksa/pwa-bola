import {
  getTeamById,
  getSavedArticleById
} from "./api.js";

import {
  saveForLater
} from "./db.js";

document.addEventListener("DOMContentLoaded", function () {
  let urlParams = new URLSearchParams(window.location.search);
  let isFromSaved = urlParams.get("saved");
  let save = document.getElementById("save");
  if (isFromSaved) {
    save.style.display = "none";
    getSavedArticleById();
  } else {
    getTeamById();
  }

  save.addEventListener("click", () => {
    let results = getTeamById();
    results.then(result => {
      saveForLater(result);
    })
  });
});