async function logic(payload: BasePayload) {
    const data = await sendRequest("https://api.anify.tv/seasonal?type=anime&apikey=a29078ed5ace232f708c0f2851530a61", {});

    console.log(JSON.stringify(data));

    let spotlight_data: Array<HompageData> = []
    for (let i = 0; i < data.seasonal.length; i++) {
        let item = data.seasonal[i];

        spotlight_data.push(
            {
                url: `https://api.anify.tv/info/${item.id}?apikey=a29078ed5ace232f708c0f2851530a61`,
                titles: {
                    primary: item.title.english ?? item.title.romaji ?? item.title.native ?? "",
                    secondary: item.title.native ?? item.title.romaji ?? item.title.english ?? ""
                },
                image: item.coverImage,
                subtitle: item.description,
                subtitleValue: [],
                buttonText: "Watch Now",
                iconText: item.season,
                showIcon: false,
                indicator: "Spotlight"
            }
        )
    }

    const recents = await sendRequest("https://api.anify.tv/recent?type=anime&apikey=a29078ed5ace232f708c0f2851530a61", {});

    let recents_data: Array<HompageData> = [];

    for (let i = 0; i < recents?.length; i++) {
        let item = recents[i];

        recents_data.push(
            {
                url: `https://api.anify.tv/info/${item.id}?apikey=a29078ed5ace232f708c0f2851530a61`,
                titles: {
                    primary: item.title.english ?? item.title.romaji ?? item.title.native ?? "",
                    secondary: item.title.native ?? item.title.romaji ?? item.title.english ?? ""
                },
                image: item.coverImage,
                subtitle: "",
                subtitleValue: [],
                showIcon: false,
                buttonText: "",
                indicator: item.season,
                current: String(item.episodes.latest?.latestEpisode ?? 0),
                total: String(item.episodes.latest?.totalEpisodes ?? 0)
            }
        )
    }
    

    let new_data: Array<HompageData> = [];
    for (let i = 0; i < data.trending?.length; i++) {
        let item = data.trending[i];

        new_data.push(
            {
                url: `https://api.anify.tv/info/${item.id}?apikey=a29078ed5ace232f708c0f2851530a61`,
                titles: {
                    primary: item.title.english ?? item.title.romaji ?? item.title.native ?? "",
                    secondary: item.title.native ?? item.title.romaji ?? item.title.english ?? ""
                },
                image: item.coverImage,
                subtitle: "",
                subtitleValue: [],
                showIcon: false,
                buttonText: "",
                indicator: item.season,
                current: String(item.episodes.latest?.latestEpisode ?? 0),
                total: String(item.episodes.latest?.totalEpisodes ?? 0)
            }
        )
    }

    // #main-content > section:nth-child(8)
    let upcoming_list = await sendRequest("https://api.anify.tv/schedule?apikey=a29078ed5ace232f708c0f2851530a61", {});

    let upcoming_data: Array<HompageData> = [];

    for (let i = 0; i < upcoming_list?.length; i++) {
        let item = upcoming_list[i];

        upcoming_data.push(
            {
                url: `https://api.anify.tv/info/${item.id}?apikey=a29078ed5ace232f708c0f2851530a61`,
                titles: {
                    primary: item.title.english ?? item.title.romaji ?? item.title.native ?? "",
                    secondary: item.title.native ?? item.title.romaji ?? item.title.english ?? ""
                },
                image: item.coverImage,
                subtitle: "",
                subtitleValue: [],
                showIcon: false,
                buttonText: "",
                indicator: item.season,
                current: String(item.episodes.latest?.latestEpisode ?? 0),
                total: String(item.episodes.latest?.totalEpisodes ?? 0)
            }
        )
    }


    let top_viewed_data: Array<HompageData> = [];
    for (let i = 0; i < data.top?.length; i++) {
        let item = data.top[i];

        top_viewed_data.push(
            {
                url: `https://api.anify.tv/info/${item.id}?apikey=a29078ed5ace232f708c0f2851530a61`,
                titles: {
                    primary: item.title.english ?? item.title.romaji ?? item.title.native ?? "",
                    secondary: item.title.native ?? item.title.romaji ?? item.title.english ?? ""
                },
                image: item.coverImage,
                subtitle: "",
                subtitleValue: [],
                showIcon: false,
                buttonText: "",
                indicator: item.season,
                current: String(item.episodes.latest?.latestEpisode ?? 0),
                total: String(item.episodes.latest?.totalEpisodes ?? 0)
            }
        )
    }

    const result = [
        {
            type: "Carousel",
            title: "Spotlight",
            data: spotlight_data
        },
        {
            type: "list",
            title: "Recently Released",
            data: recents_data
        },
        {
            type: "grid_2x",
            title: "Now on Zoro",
            data: new_data
        },
        {
            type: "list",
            title: "Top Upcoming",
            data: upcoming_data
        },
        {
            type: "grid_3x",
            title: "Most Viewed",
            data: top_viewed_data
        },
    ];
    
    sendResult({
        action: "homepage",
        result
    }, true);
}
