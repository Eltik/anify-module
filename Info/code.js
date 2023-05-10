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
  let poster = data.image;
  const banner = data.cover ?? "";
  let status = data.status ?? "TDD";
  let totalMediaCount = data.totalEpisodes ?? 0;
  let seasons = [
    {
      name: "Gogoanime",
      url: "https://c.delusionz.xyz/meta/anilist/info/" + data.id,
    },
    {
      name: "Zoro",
      url:
        "https://c.delusionz.xyz/meta/anilist/info/" +
        data.id +
        "?provider=zoro",
    },
    {
      name: "Enime",
      url:
        "https://c.delusionz.xyz/meta/anilist/info/" +
        data.id +
        "?provider=enime",
    },
  ];
  const allEpInfo = data.episodes.map((e) => {
    return {
      url:
        "https://c.delusionz.xyz/meta/anilist/watch/" +
        e.id +
        "?provider=" +
        (dataUrl.includes("?provider=")
          ? dataUrl.split("?provider=")[1]
          : "gogoanime"),
      title: e.title,
      number: Number(e.number),
      description: e.description,
      image: e.image,
    };
  });
  let choutenDiv = document.getElementById("chouten");
  let resultElement = document.createElement("p");
  resultElement.innerText = JSON.stringify({
    result: {
      id: "",
      titles: titles,
      altTitles: [],
      description: description,
      poster: poster,
      banner: banner,
      status: status,
      totalMediaCount: Number(totalMediaCount),
      mediaType: "Episodes",
      seasons: seasons,
      mediaList: [allEpInfo],
    },
    nextUrl: null,
  });
  choutenDiv.appendChild(resultElement);
}
