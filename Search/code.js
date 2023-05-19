var Request = {
    url: "https://api.anify.tv/search/anime/<query>",
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

    for (let i = 0; i < data.length; i++) {
        titles.push({
            url: `https://api.anify.tv/info/${data[i].id}`,
            img: data[i].coverImage,
            title: data[i].title.english ?? data[i].title.romaji ?? data[i].title.native,
            indicatorText: `${data[i].averageRating ?? "N/A"}`,
            currentCount: data[i].currentEpisode ?? 0,
            totalCount: data[i].totalEpisodes ?? 0,
        });
    }
    let choutenDiv = document.getElementById("chouten");
    let resultElement = document.createElement("p");
    resultElement.innerText = JSON.stringify(titles);
    choutenDiv.appendChild(resultElement);
}
