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
    let allEpInfo = data[0].episodes.map((e) => {
        return {
            url: "https://api.anify.tv/sources/" + encodeURIComponent(data[0].providerId) + "/" + encodeURIComponent(e.id) + "/" + encodeURIComponent(e.number) + "/" + encodeURIComponent("original_id_here") + "/" + encodeURIComponent("sub") + "/" + encodeURIComponent("serverhere"),
            title: e.title,
            number: Number(e.number),
            description: "No description",
            image: e.img,
        };
    });
    let choutenDiv = document.getElementById("chouten");
    let resultElement = document.createElement("p");
    resultElement.innerText = JSON.stringify(allEpInfo);
    choutenDiv.appendChild(resultElement);
}
