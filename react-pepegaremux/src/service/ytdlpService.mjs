import appraiseUrl from "../repository/ytdlpRepository.mjs"    

const appraiseFromUrl = async (url) => {
    return await appraiseUrl(url)

}

export default appraiseFromUrl;