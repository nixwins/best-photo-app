import  React from 'react';
import './modal.css'

export default class Modal extends  React.Component{

    render() {
        const {collectionList, onPhotoAddCollection, visble, isAdded, closeModal} = this.props;

        const clazzCollection = visble ? 'collections show-collections' : 'collections ';

        const collectionItems = collectionList.map((item) => {
            return (<li
                    className="list-group-item"
                    key={item.id}
                    onClick={() => onPhotoAddCollection(item.id)}>
                    {item.title}
                </li>
            );
        })

        const message = isAdded ? "Доаблено" : null;

        return(
            <div className={clazzCollection}>
                <div className="collection-modal-container">
                    <button
                            className="btn btn-danger close-modal-btn"
                            onClick={()=>closeModal()}
                            >x</button>
                    <ul className="collection-modal list-group">
                        {collectionItems}
                        <span className="success">{message}</span>
                    </ul>

                </div>

            </div>
        )
    }
}