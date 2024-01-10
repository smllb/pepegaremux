import * as  ytdlpRepository from "../repository/ytdlpRepository.mjs";

const appraiseUrlFromRequest = async (url) => {
    return await ytdlpRepository.appraiseUrl(url)

}

const getYoutubeMetadataFromUrl = async (url) => {
    return await ytdlpRepository.getYoutubeMetadata(url)

}

const sendVideoMetadataToVideoList = async (url, socket) => {
    let metadata = await ytdlpRepository.getYoutubeMetadata(url)
    //console.log(`Received metadata ${metadata}`)
    socket.emit('add-list', metadata)
    //console.log(`Sent youtube entity with url ${url} to server.`)

};

const sendGenericVideoToVideoList = async (url, socket) => {
    socket.emit('add-list', {id: url})
    //console.log(`Sent generic video with url ${url} to server.`)

}
export { appraiseUrlFromRequest, getYoutubeMetadataFromUrl, sendVideoMetadataToVideoList, sendGenericVideoToVideoList };

