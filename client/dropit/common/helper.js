import { BASE_API_URL } from './const'
import { Constants, Location, Permissions } from 'expo';

function stringifyParams(params) {
    const keys = Object.keys(params)
    if (keys.length == 0) {
        return ""
    }

    const q = keys.reduce((acc, key) => {
        acc += `&${key}=${params[key]}`
        return acc
    }, "")

    return q.substring(1)
}

export function getRequest(urlPath, params={}) {
    const queryString = stringifyParams(params)
    console.log(`${BASE_API_URL}/${urlPath}?${queryString}`)

    return new Promise((resolve, reject) => {
        fetch(`${BASE_API_URL}/${urlPath}?${queryString}`, { 
            method: 'GET'
        })
            .then(res => {
                resolve(res.json())
            })
    })
}

export function postRequest(urlPath, data) {
    console.log(data)
    console.log(urlPath)
    return new Promise((resolve, reject) => {
        fetch(`${BASE_API_URL}/${urlPath}`, { 
            method: 'POST',
            headers: {
                'Accet': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                resolve(res.json())
            })
            .catch(r => {
                console.log(r.message)
            })
    })
}

 export async function getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        return {
            success: false,
            message: 'Permission to access location was denied'
        }
    }

    let location = await Location.getCurrentPositionAsync({});
    return {
        success: true,
        location: location
    }
}