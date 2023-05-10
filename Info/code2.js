var removeScripts = false;
var allowExternalScripts = true;
var usesApi = true;

function logic() {
  const myElement = document.getElementById("json-result");
  const myJsonString = myElement.getAttribute("data-json");
  const myJsonObject = JSON.parse(myJsonString.replaceAll("'", '"'));
  const modified = document.createElement("div");
  modified.innerHTML = myJsonObject["html"];
  document.body.appendChild(modified);
  let allEpInfo = data.episodes.map((e) => {
    return {
      url: "https://c.delusionz.xyz/meta/anilist/servers/" + e.id,
      title: e.title,
      number: Number(e.number),
      description: e.description,
      image: e.image,
    };
  });
  let choutenDiv = document.getElementById("chouten");
  let resultElement = document.createElement("p");
  resultElement.innerText = JSON.stringify(allEpInfo);
  choutenDiv.appendChild(resultElement);
}
