// ? =============> Global ===============>
  const mode = document.getElementById("mode");
const links = document.querySelectorAll(".menu a");

// ! =============> When Start ===============>
getGames("mmorpg");
// * =============> Events ===============>

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (e) {
    document.querySelector(".nav-item .active").classList.remove("active");
    links[i].classList.add("active");
    const category = links[i].getAttribute("data-category");
    getGames(category);
  });
}

document.querySelector(".logout-btn").addEventListener("click", function () {
  localStorage.removeItem("userToken");
  location.href = "./index.html";
});

// ! =============> Functions ===============>


mode.addEventListener("click",function(){
  if(mode.classList.contains('fa-sun')){
    document.querySelector('html').setAttribute('data-theme','light')
    mode.classList.replace('fa-sun','fa-moon')
  } else {
    document.querySelector('html').setAttribute('data-theme','dark')
    mode.classList.replace('fa-moon','fa-sun')
  }
})

async function getGames(gameCategory) {
  const loadScreen = document.querySelector(".loading-screen");
  loadScreen.classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${gameCategory}`,
    options
  );
  const response = await api.json();
  displayData(response);
  loadScreen.classList.add("d-none");
}

async function displayData(gamesResponse) {
  let box = "";
  for (let i = 0; i < gamesResponse.length; i++) {
    let videoPath = gamesResponse[i].thumbnail.replace(
      "thumbnail.jpg",
      "videoplayback.webm"
    );
    box += `
           <div class="col">
      <div onmouseleave= "stopVideo(event)"  onmouseenter="startVideo(event)" onclick="showDetails(${gamesResponse[i].id})" class="card h-100 bg-transparent" role="button" >
         <div class="card-body">
            <figure class="position-relative">
               <img class="card-img-top object-fit-cover h-100" src="${gamesResponse[i].thumbnail}" />
                          <video muted="true" preload="none" loop   class="w-100  h-100 position-absolute top-0 start-0 z-3 d-none">
              <source src="${videoPath}">
              </video>
            </figure>
            <figcaption>
               <div class="hstack justify-content-between">
                  <h3 class="h6 small"> ${gamesResponse[i].title} </h3>
                  <span class="badge text-bg-primary p-2">Free</span>
               </div>
               <p class="card-text small text-center text-secondary py-3">
                  ${gamesResponse[i].short_description}
               </p>
            </figcaption>
         </div>
         <footer class="card-footer small hstack justify-content-between py-2">
            <span class="badge text-bg-secondary py-2">${gamesResponse[i].genre}</span>
            <span class="badge text-bg-secondary py-2">${gamesResponse[i].platform}</span>
         </footer>
      </div>
   </div>
      `;
  }
  document.getElementById("gameData").innerHTML = box;
}

function startVideo(event) {
  const video = event.target.querySelector("video");
  video.classList.remove("d-none");
  video.muted = true;
  video.play();
}
function stopVideo(event) {
  const video = event.target.querySelector("video");
  video.classList.add("d-none");
  video.muted = true;
  video.pause();
}

function showDetails(id) {
  location.href = `./details.html?id=${id}`;
}
