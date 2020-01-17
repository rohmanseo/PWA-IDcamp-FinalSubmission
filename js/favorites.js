document.addEventListener("DOMContentLoaded", function() {
  function readAllFavorites() {
    dbReadAllFav().then(favourites => {
      let listFavouritesInText = "";
      favourites.forEach(fav => {
        listFavouritesInText += `
            <tr>
              <td class="valign-wrapper">
                <img src="${fav.teamImage}" width="10%" height="10%" class="img-responsive circle mr-2" > ${fav.teamName}
              </td>
              <td class="center">
                <button class="waves-effect waves-light btn"><a class="white-text" href="detail.html?id=${fav.teamId}"><i class="material-icons">remove_red_eye</i></a></button>
                <button id="${fav.favId}" class="waves-effect waves-light btn pink buttonHapus"><i class="material-icons">clear</i></button>
              </td>
            </tr>
            `;
      });
      document.getElementById('clubs').innerHTML = listFavouritesInText;

      let removeButtons = document.querySelectorAll(".buttonHapus");
      for (let button of removeButtons) {
        button.addEventListener("click", function(event) {
          let favId = event.target.id;
          dbHapusFav(favId).then(() => {
            readAllFavorites();
          });
        });
      }
    });
  }

  readAllFavorites();
});
