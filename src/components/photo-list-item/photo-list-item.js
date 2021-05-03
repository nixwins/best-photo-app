import React from 'react';
import './photo-list-item.css'

export default class PhotoListItem extends React.Component {

    onItemAdd = (e) => {
        const photoId = e.currentTarget.nextElementSibling.dataset.id;
        this.props.onSelectedPhoto(photoId)
    }

    render() {

        const { photo } = this.props;

        return (
            <>
                <div className="photo-list-item">
                    <button
                        className="add-collection-btn btn btn-success"
                        onClick={this.onItemAdd}>
                        +
                    </button>
                    <img className="photo" src={photo.imageUrl} alt={photo.alt} data-id={photo.id} />
                    <div className="photo-caption">
                        <img className="profile-image" src={photo.user.profile_image.small} alt="user profile" />
                        <span className="author-name">{photo.user.name}</span>
                    </div>
                </div>

            </>

        );
    }
}