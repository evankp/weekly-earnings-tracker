import * as env from '../env-variables';
import {Toast} from 'native-base';

function handleAPIError(res) {
    const data = res.json();

    if (data.error) throw data.error;

    return data;
}

function errorHandle(err) {
    Toast.show({
        text: `Error: ${err}`,
        buttonText: 'Close',
        duration: 8000
    });
}

const API_URL = 'https://us-central1-weekly-earnings-backend.cloudfunctions.net/api';

export function getAPIData(user, errorCallback) {
    return fetch(`${API_URL}/${user}/data`, {
        headers: {
            Authorization: `Basic ${env.BACKEND_TOKEN}`
        }
    })
        .then(handleAPIError)
        .catch(err => {
            errorHandle(err);
            if (errorCallback) errorCallback(err);
        });
}

export function overWriteAPIData(data, user, errorCallback) {
    Toast.show({text: 'Posting data'});
    return fetch(`${API_URL}/${user}/init`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${env.BACKEND_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: data})
    })
        .then(handleAPIError)
        .then(() => Toast.show({text: 'Data posted'}))
        .catch(err => {
            errorHandle(err);
            if (errorCallback) errorCallback(err);
        });
}

export function addToDatabase(category, data, user, errorCallback) {
    return fetch(`${API_URL}/${user}/add/${category}`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${env.BACKEND_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: data})
    })
        .then(handleAPIError)
        .catch(err => {
            errorHandle(err);
            if (errorCallback) errorCallback(err);
        });
}

export function removeFromDatabase(category, id, user, errorCallback) {
    return fetch(`${API_URL}/${user}/remove/${category}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Basic ${env.BACKEND_TOKEN}`,
        }
    })
        .then(handleAPIError)
        .catch(err => {
            errorHandle(err);
            if (errorCallback) errorCallback(err);
        });
}