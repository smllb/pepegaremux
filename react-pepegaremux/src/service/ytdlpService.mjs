import { ytdlpRepository } from "../repository/ytdlpRepository.mjs";

const sendVideoMetadataToVideoList = async (url, socket) => {
    
    let metadata = await ytdlpRepository.getYoutubeMetadata(url)
    console.log("Sending " + metadata + " to server.")    
    socket.emit('add-yt', metadata)

};

export { sendVideoMetadataToVideoList }