const appraiseUrl = async (req, res) => {
    console.log("url");
    const url = decodeURIComponent(req)
    if (url.includes("www.youtube") || 
        url.includes("list=") || 
        url.includes("/playlist?List=" ||
        url.includes("watch?v=" ||
        url.includes("/v/")))) {
        return 'YOUTUBE' 
    } 
    return 'GENERIC'
}

export default  appraiseUrl