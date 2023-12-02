import appraiseFromUrl from "../service/AppraiseService.mjs"
const appraiseUrlFromRequest = async (url) => {
    return await appraiseFromUrl(url);

}

export default appraiseUrlFromRequest;

