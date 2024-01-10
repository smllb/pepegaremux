import api from '../static/api.json' 
const BASE_URL = api.base.url+api.base.port;
const ytdlp = api.base.endpoints.ytdlp;

const appraiseUrl = async (url) => {

    const APPRAISE_URL = `${BASE_URL}${ytdlp.base}${ytdlp.children.appraise}/${encodeURIComponent(url)}`;
    return await fetch(APPRAISE_URL, {
        method: 'GET',
        
    })
    .then(response => {
        return response.text()
    })
    .then(body => {
        return body
    })

}


const getYoutubeMetadata = async (url) => {
    const YOUTUBE_METADATA_URL = `${BASE_URL}${ytdlp.base}${ytdlp.children.metadata}${ytdlp.source.youtube}/${encodeURIComponent(url)}`

    return await fetch(YOUTUBE_METADATA_URL, { method: 'GET'})
        .then(response => {
            return response.text()
        })
        .then(body => {
            const data = JSON.parse(body)
            //console.log(data)
            return JSON.stringify(data)
        })

}

export { appraiseUrl, getYoutubeMetadata };