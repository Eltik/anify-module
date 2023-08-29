async function logic(payload) {
    const data = await sendRequest(payload.query, {});

    const titles = {
        primary: data.titles.english ?? data.titles.romaji ?? data.titles.native ?? "",
        secondary: data.titles.native ?? data.titles.romaji ?? data.titles.english ?? ""
    };

    const description = data.description;
    const poster = data.coverImage;

    const status = data.status;

    let totalMediaCount = data.totalEpisodes ?? 0;
    let seasons = [];

    let nextUrl = "https://api.anify.tv/episodes/" + data.id + "?apikey=a29078ed5ace232f708c0f2851530a61";

    sendResult({
        result: {
            id: "",
            titles: titles,
            epListURLs: [
                nextUrl
            ],
            altTitles: [],
            description: description,
            poster: poster,
            status: status,
            totalMediaCount: parseInt(totalMediaCount),
            mediaType: "Episodes",
            seasons: seasons,
            mediaList: []
        },
        action: "metadata",
    });
}


async function getEpList(payload) {
    const data = await sendRequest(payload.query, {});

    const results = [];

    data.map((provider) => {
        results.push({
            title: provider.providerId,
            list: (provider.episodes ?? []).map((e) => {
                    return {
                        url:
                            `https://api.anify.tv/sources?providerId=${provider.providerId}&watchId=${e.id}&episode=${e.episode}&id=${payload.query.split("/episodes/")[1].split("&apikey=")[0]}&subType=${"sub"}&apikey=a29078ed5ace232f708c0f2851530a61`,
                        title: e.title,
                        number: e.number,
                    };
                }
            ),
        });
    })

    sendResult({
        result: results,
        action: "eplist"
    }, true);
}
