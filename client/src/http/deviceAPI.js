import { $authHost, $host } from "./index";

export async function createItem(api, item){
    const {data} = await $authHost.post(api, item)
    return data
}

export async function deleteteItem(api){
    const {data} = await $authHost.delete(api)
    return data
}

export async function fetchItems(api){
    const {data} = await $host.get(api)
    return data
}

export async function fetchDevices(api, typeId, brandId, page, limit=5){
    const {data} = await $host.get(api, {params: {
        typeId, brandId, page, limit
        }})
    return data
}

export async function fetchOneItem(api, id){
    const {data} = await $host.get(api + id)
    return data
}

