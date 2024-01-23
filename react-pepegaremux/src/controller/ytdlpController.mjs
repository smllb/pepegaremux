import * as  ytdlpRepository from "../repository/ytdlpRepository.mjs";

const appraiseUrlFromRequest = async (url) => {
    return await ytdlpRepository.appraiseUrl(url)

}

const getYoutubeMetadataFromUrl = async (url) => {
    return await ytdlpRepository.getYoutubeMetadata(url)

}

const sendVideoMetadataToVideoList = async (url, socket, urlType) => {
    console.log("inside sendVideoMetadataToVideoList " + url )
    let metadata = await ytdlpRepository.getYoutubeMetadata(url)
    console.log(metadata)
    //console.log(`Received metadata ${metadata}`)
    socket.emit('add-list', {metadata: metadata, urlType: urlType})
    //console.log(`Sent youtube entity with url ${url} to server.`)

};
const getGenericMetadataFromUrl = async (url) => {
    console.log('inside getGenericMetadataFromUrl')
    return await ytdlpRepository.getGenericMetadata(url)
}
const sendGenericVideoToVideoList = async (url, socket, urlType) => {
    let genericVideoMetadata = await ytdlpRepository.getGenericMetadata(url)
    socket.emit('add-list', { metadata: genericVideoMetadata, urlType: urlType })


}
export { appraiseUrlFromRequest, getYoutubeMetadataFromUrl, sendVideoMetadataToVideoList, sendGenericVideoToVideoList, getGenericMetadataFromUrl };

