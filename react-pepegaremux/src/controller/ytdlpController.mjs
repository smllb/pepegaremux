import appraiseFromUrl from "../service/ytdlpService.mjs"

const appraiseUrlFromRequest = async (url) => {
    return await appraiseFromUrl(url);

}

export default appraiseUrlFromRequest;

