const appraiseUrl = async (req, res) => {
    
    const url = decodeURIComponent(req)

    let youtubeEmptyUrls = [
        "https://www.youtube.com/",
        "https://youtube.com/",
        "https://www.youtube.com",
        "https://youtube.com",
        "https://youtu.be/",
        "https://youtu.be"
    ];
    if (youtubeEmptyUrls.includes(url)) return 'EMPTY'
    console.log(`${url} being appraised.`);
    if (url.includes("www.youtube") || 
        url.includes("list=") || 
        url.includes("/playlist?List=") ||
        url.includes("watch?v=") ||
        url.includes("/v/") ||
        url.includes("youtu.be")) {
        return 'YOUTUBE' 
    } 
    return 'GENERIC'
}

export default  appraiseUrl