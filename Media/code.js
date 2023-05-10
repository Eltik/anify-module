var removeScripts = true;
var allowExternalScripts = false;
var usesApi = true;

function logic() {
  const myElement = document.getElementById("json-result");
  const myJsonString = myElement.getAttribute("data-json");
  const data = JSON.parse(myJsonString.replaceAll("'", '"'));
  let choutenDiv = document.getElementById("chouten");
  let resultElement = document.createElement("p");
  resultElement.innerText = JSON.stringify({
    result: {
      skips:
        data.skipTimes != null
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
      sources: data.sources
        .sort((a, b) => {
          if (a.quality === "auto" || a.quality === "default") {
            return -1; // move a to the front of the array
          } else if (b.quality === "auto" || b.quality === "default") {
            return 1; // move b to the front of the array
          } else {
            return b.quality.localeCompare(a.quality); // sort by quality in descending order
          }
        })
        .map((source) => {
          return {
            file: source.url,
            type: source.isM3U8 ? "hls" : "mp4",
            quality: source.quality,
          };
        }),

      subtitles:
        data.subtitles != null
          ? data.subtitles
              .map((element) => {
                if (element.lang != "Thumbnails") {
                  return {
                    url: element.url,
                    language: element.lang,
                  };
                }
              })
              .filter((elements) => {
                return (
                  elements != null && elements !== undefined && elements !== ""
                );
              })
          : [],
    },
    nextUrl: null,
  });
  choutenDiv.appendChild(resultElement);
}
