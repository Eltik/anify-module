var Request = {
  url: "https://c.delusionz.xyz/meta/anilist/<query>",
  method: "GET",
  headers: [],
  body: null,
};
var removeScripts = false;
var allowExternalScripts = true;
var usesApi = true;

function logic() {
  const titles = [];
  const myElement = document.getElementById("json-result");
  const myJsonString = myElement.getAttribute("data-json");
  const data = JSON.parse(myJsonString.replaceAll("'", '"'));
  alert(data);
  for (let i = 0; i < data.results.length; i++) {
    titles.push({
      url: `https://c.delusionz.xyz/meta/anilist/info/${data.results[i].id}`,
      img: data.results[i].image ?? data.results[i].cover ?? "",
      title:
        data.results[i].title.english ??
        data.results[i].title.romaji ??
        data.results[i].title.native,
      indicatorText: `${
        data.results[i].rating ? data.results[i].rating / 10 : "N/A"
      }`,
      currentCount: data.results[i].currentEpisodeCount ?? 0,
      totalCount: data.results[i].totalEpisodes ?? 0,
    });
  }
  let choutenDiv = document.getElementById("chouten");
  let resultElement = document.createElement("p");
  resultElement.innerText = JSON.stringify(titles);
  choutenDiv.appendChild(resultElement);
}
