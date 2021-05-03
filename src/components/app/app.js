import React, { Component } from 'react';
import PhotoList from '../photo-list';
import SearchPanel from '../search-panel/search-panel';
import UnSplashApiService from '../../services/unsplash-api-service';
import AppHeader from '../heder/app-header';
import Navigation from '../navigation';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';
import Modal from "../modal";

export default class App extends Component {

    _unsplashApiService = new UnSplashApiService();
    _accessToken = localStorage.getItem("accessToken");

    state = {
        photoList: [],
        collectionList: [],
        selectedPhoto: '',
        isOpenModal: false,
        isAdded: false
    }

    componentDidMount() {
        this._unsplashApiService
            .getAllPhoto()
            .then((result) => {
                this.setState({ photoList: result })
            });
    }

    onSearch = (query) => {

        if (query) {
            this._unsplashApiService
                .searchPhoto(query)
                .then((results) => {
                    this.setState({ photoList: results })
                })
        }
    };

    onLogin = (code) => {
        if (code) {
            this._unsplashApiService.auth(code).then((r) => {
                localStorage.setItem("accessToken", r.access_token);
                // this.setState({ code, accessToken: r.access_token });
                window.location.href = "/"
            });
        }
    }

    onSelectedPhoto = (photoId) => {
        this.setState({ selectedPhoto: photoId });

        if (photoId && this._accessToken) {
            this._unsplashApiService
                .getMe(this._accessToken)
                .then((user) => {

                    this.setCollection(user.username);
                });
        } else {
            alert("Login please")
        }
    }

    onAddPhotoCollection = (collectionId) => {

        if (collectionId && this._accessToken) {
            const { selectedPhoto } = this.state;
            this._unsplashApiService
                .addPhotoCollection(collectionId, selectedPhoto)
                .then((result) => {
                    this.setState({ isAdded: true, isOpenModel: true })
                })
        }
    }

    setCollection = (username) => {

        this._unsplashApiService
            .getCollection(username, this._accessToken)
            .then((collectionList) => {
                this.setState({ collectionList, isOpenModal: true });

            });

    };

    closeModal = () => {
        this.setState({ isOpenModal: false })
    }

    render() {

        const { photoList, collectionList, photoToAddId, isOpenModal } = this.state;

        return (
            <div className="app">

                <AppHeader onLogin={this.onLogin} />
                <Modal
                    visble={isOpenModal}
                    collectionList={collectionList}
                    onPhotoAddCollection={this.onAddPhotoCollection}
                    isAdded={this.state.isAdded}
                    closeModal={this.closeModal} />
                <SearchPanel onSearch={this.onSearch} />
                <Navigation />
                <PhotoList photoList={photoList} onSelectedPhoto={this.onSelectedPhoto} />

            </div>
        );
    }
}