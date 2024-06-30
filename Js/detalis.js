// ! =============> When Start ===============>
const mode = document.getElementById("mode");
const searchPrams = location.search;
const prams = new URLSearchParams(searchPrams);
const id = prams.get("id");

// ! =============> Functions ===============>

mode.addEventListener("click", function () {
  if (mode.classList.contains("fa-sun")) {
    document.querySelector("html").setAttribute("data-theme", "light");
    mode.classList.replace("fa-sun", "fa-moon");
  } else {
    document.querySelector("html").setAttribute("data-theme", "dark");
    mode.classList.replace("fa-moon", "fa-sun");
  }
});

(async function () {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  const response = await api.json();
  displayData(response);
})();

function displayData(gameDetails) {
  let box = ` <div class="col-md-4">
   <figure>
      <img src="${gameDetails.thumbnail}" class="w-100" alt="details image" />
   </figure>
</div>
<div class="col-md-8">
   <div>
      <nav aria-label="breadcrumb">
         <ol class="breadcrumb" class="text-light">
            <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
            <li class="breadcrumb-item text-info" aria-current="page">${gameDetails.title}</li>
         </ol>
      </nav>
      <h1>${gameDetails.title}</h1>
      <h3>About ${gameDetails.title}</h3>
      <p>${gameDetails.description}</p>
      
   </div>
</div>`;
  document.getElementById("detailsData").innerHTML = box;
  const backgroundImage = gameDetails.thumbnail.replace(
    "thumbnail",
    "background"
  );
  document.body.style.cssText = `
   background-image: linear-gradient(rgba(0, 0, 0, 0.596) 0% 100%), url('${backgroundImage}');
   background-position: center;
   background-size: cover;
    `;
}
