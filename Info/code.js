var removeScripts = true;
var allowExternalScripts = false;
var usesApi = true;

function logic() {
    const myElement = document.getElementById("json-result");
    const myJsonString = myElement.getAttribute("data-json");
    const data = JSON.parse(myJsonString.replaceAll("'", '"'));
    const dataUrl = myElement.getAttribute("data-url");
    let titles = {
        primary: data.title.english ?? data.title.romaji ?? data.title.native,
        secondary: data.title.romaji ?? data.title.english ?? data.title.native,
    };
    let description = data.description ?? "No description provided";
    let poster = data.coverImage;
    const banner = data.bannerImage ?? "";
    let status = data.status ?? "TDD";
    let totalMediaCount = data.totalEpisodes ?? 0;

    let seasons = [...document.querySelectorAll(".os-list > a")].map((season) => {
        return { name: season.innerText.trim(), url: `https://zoro.to${season.getAttribute("href")}` };
    });

    let choutenDiv = document.getElementById("chouten");
    let resultElement = document.createElement("p");
    let nextUrl = "https://api.anify.tv/episodes/" + data.id;
    resultElement.innerText = JSON.stringify({
        result: {
            id: "",
            titles: titles,
            altTitles: [],
            description: description,
            poster: poster,
            status: status,
            totalMediaCount: parseInt(totalMediaCount),
            mediaType: "Episodes",
            seasons: seasons,
            mediaList: [[]],
        },
        nextUrl: nextUrl,
    });
    choutenDiv.appendChild(resultElement);
}
