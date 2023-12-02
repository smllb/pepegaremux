import appraiseUrl from "../repository/AppraiseRepository.mjs"    

const appraiseFromUrl = async (url) => {
    return await appraiseUrl(url)

}

export default appraiseFromUrl;
