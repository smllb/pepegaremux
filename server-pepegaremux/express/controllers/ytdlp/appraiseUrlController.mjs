const appraiseUrl = async (req, res) => {
    
    const url = decodeURIComponent(req)
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