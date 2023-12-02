
import api from '../static/api.json' 
const BASE_URL = api.base.url+api.base.port;
const appraise = api.base.endpoints.appraise;

const appraiseUrl = async (url) => {

    const APPRAISE_URL = new URL(BASE_URL + appraise.base + appraise.children.link);
    APPRAISE_URL.searchParams.append('url', url);
    return await fetch(APPRAISE_URL.toString(), {
        method: 'GET',
        
    })
    .then(response => {
        return response.text()
    })
    .then(body => {
        return body
    })

}

export default appraiseUrl;