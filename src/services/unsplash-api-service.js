import { createApi } from 'unsplash-js';

export default class UnSplashApiService {

    _apiBase = 'https://api.unsplash.com';
    _authUrl = "https://unsplash.com/oauth/authorize";
    _clientId = "U4yoNJ-VsoYXfEdYVpxy4IlchcZBZRNfXjK6z7uskKs";
    _clientS = "rtyb5f-s1-G3gE2xGNYe7wC-yUtB7g25nt3JMVJZdQg";
    _unsplash = createApi({
        accessKey: this._clientId,
    });

    auth = async (code) => {

        const data = {
            client_id: this._clientId,
            client_secret: this._clientS,
            redirect_uri: "http://localhost:3000",
            code: code,
            grant_type: "authorization_code"
        };

        const formBody = [];
        for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        const formBodyStr = formBody.join("&");

        return await fetch('https://unsplash.com/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBodyStr
        }).then((response) => response.json());

    };

    getAuthUrl = () => {
        const redirectUri = 'http%3A%2F%2Flocalhost%3A3000';
        const scope = 'public+read_collections+write_collections';

        return `${this._authUrl}?client_id=${this._clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    };

    getPhoto = async (id) => {

        return await this._unsplash
            .photos.list()
            .then((resp) => resp.response);
    };

    getAllPhoto = async (page) => {

        const body = await this._unsplash.photos.list();
        return body.response.results.map(this._transformPhoto)
    };

    getMe = async (accessToken) => {

        return await fetch("https://api.unsplash.com/me", {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }).then((response) => response.json());
    }

    getCollection = async (username, accessToken) => {

        return await fetch(`${this._apiBase}/users/${username}/collections`, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }).then((response) => response.json());
    }

    searchPhoto = async (q) => {
        const body = await this._unsplash.search.getPhotos({ query: q });
        // console.log(body)
        return body.response.results.map(this._transformPhoto);
    };

    addPhotoCollection = async (collectionId, photoId) => {

        const data = {
            collection_id: collectionId,
            photo_id: photoId
        }

        const formBody = [];
        for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        const formBodyStr = formBody.join("&");

        return await fetch(`${this._apiBase}/collections/${collectionId}/add`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("accessToken"),
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBodyStr
        }).then((response) => response.json());

    }

    _transformPhoto = (photo) => {

        return {
            id: photo.id,
            imageUrl: photo.urls.small,
            alt: photo.alt_description,
            user: photo.user

        }

    };
}


