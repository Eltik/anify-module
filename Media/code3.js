var removeScripts = false;
var allowExternalScripts = true;
var usesApi = true;
var imports = ["https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"];

function logic() {
    const myElement = document.getElementById("json-result");
    const myJsonString = myElement.getAttribute("data-json");
    const myJsonObject = JSON.parse(myJsonString.replaceAll("'", '"'));
    if (myJsonObject["encrypted"] == true) {
        function getFile(url) {
            var request = new XMLHttpRequest();
            request.open("GET", url, false);
            request.send(null);
            if (request.status === 200) {
                return request.responseText;
            } else {
                return null;
            }
        }
        let base64 = myJsonObject["sources"];
        let key = getFile("https://raw.githubusercontent.com/enimax-anime/key/e6/key.txt");
        decryptedSources = CryptoJS.AES.decrypt(base64, key).toString(CryptoJS.enc.Utf8);
        let choutenDiv = document.getElementById("chouten");
        let resultElement = document.createElement("p");
        resultElement.innerText = JSON.stringify({
            result: {
                skips:
                    myJsonObject["intro"] != null
                        ? [
                              {
                                  start: myJsonObject["intro"]["start"],
                                  end: myJsonObject["intro"]["end"],
                                  type: "Opening",
                              },
                              {
                                  start: myJsonObject["outro"]["start"],
                                  end: myJsonObject["outro"]["end"],
                                  type: "Ending",
                              },
                          ]
                        : [],
                sources: JSON.parse(decryptedSources),
                subtitles: myJsonObject["tracks"]
                    .map((element) => {
                        if (element["kind"] == "captions") {
                            return {
                                url: element["file"],
                                language: element["label"],
                            };
                        }
                    })
                    .filter((elements) => {
                        return elements != null && elements !== undefined && elements !== "";
                    }),
            },
            nextUrl: null,
        });
        choutenDiv.appendChild(resultElement);
    } else {
        let choutenDiv = document.getElementById("chouten");
        let resultElement = document.createElement("p");
        resultElement.innerText = JSON.stringify({
            result: {
                skips:
                    myJsonObject["intro"] != null
                        ? [
                              {
                                  start: myJsonObject["intro"]["start"],
                                  end: myJsonObject["intro"]["end"],
                                  type: "Opening",
                              },
                              {
                                  start: myJsonObject["outro"]["start"],
                                  end: myJsonObject["outro"]["end"],
                                  type: "Ending",
                              },
                          ]
                        : [],
                sources: myJsonObject["sources"],
                subtitles: myJsonObject["tracks"]
                    .map((element) => {
                        if (element["kind"] == "captions") {
                            return {
                                url: element["file"],
                                language: element["label"],
                            };
                        }
                    })
                    .filter((elements) => {
                        return elements != null && elements !== undefined && elements !== "";
                    }),
            },
            nextUrl: null,
        });
        choutenDiv.appendChild(resultElement);
    }
}
