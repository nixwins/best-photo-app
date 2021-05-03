import React from 'react';
import PhotoListItem from '../photo-list-item';


import './photo-list.css';

const PhotoList = ({photoList, onSelectedPhoto}) => {

    const list = photoList.map((item) => {
        return <PhotoListItem
            photo={item}
            key={item.id}
            onSelectedPhoto={onSelectedPhoto} />
    });

    return (
        <section className="photo-list">
            {list}
        </section>
    );
}

export default  PhotoList;