import axios from "axios"

export interface IMetadataInfo {
    description: string;
    image: string;
    name: string;
    external_url: string;
}
export const getMetaData = async (tokenId: string) => {
    if(!tokenId){
        console.log('get metadata not tokenid')
    }
    const res = await axios.get(`https://api-ape-stage.ccian.cc/game/v1/metadata/${tokenId}/en-US`)
    const data = res.data.data as IMetadataInfo
    return data
}