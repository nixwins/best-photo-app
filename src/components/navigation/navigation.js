import React from 'react'

import './navigation.css';

export default class Navigation extends React.Component {
    render() {
        return (
            <nav>
                <a href="/films">Home</a>
                <a href="/films">Film</a>
                <a href="/wallpapers">Wallpapers</a>
            </nav>
        );
    }
}