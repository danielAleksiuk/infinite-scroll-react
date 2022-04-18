import React, { useState } from 'react';
import { Image, OverlayProps } from '../types';
import './overlay.scss';

export const Overlay: React.FC<OverlayProps> = (props) => {
    const [ buttonStyle, setButtonStyle ] = useState(props.isFavourite ? 'button-outline favourite' : 'button-outline');

    const onFavouriteClick = () => {
        let favouriteImages = localStorage.getItem('favouriteImages') !== null 
            ? JSON.parse(localStorage.getItem('favouriteImages') as string)
            : [];

        if (!favouriteImages.find((image: Image) => image.id === props.id)) {
            favouriteImages = [...favouriteImages, {
                title: props.title,
                ownername: props.owner,
                id: props.id,
                server: props.server,
                secret: props.secret,
                isFavourite: true
            }];
            setButtonStyle('button-outline favourite');
            props.setIsFavourite(props.id, true);
        } else {
            favouriteImages = favouriteImages.filter((image: Image) => image.id !== props.id)
            setButtonStyle('button-outline');
            props.setIsFavourite(props.id, false);
        }

        localStorage.setItem('favouriteImages', JSON.stringify(favouriteImages));
    }

    return <div className='overlay'>
        <div 
            className='center'>
            <h3 
                className='title'>
                { props.title !== '' ? props.title : '(No title)' }
            </h3>
            <hr />
            <h3 
                className='owner'>
                    { props.owner }
            </h3>
            <button
                className={ buttonStyle }
                id={ 'button' + props.id }
                onClick={ onFavouriteClick }
            >
                Favourite
            </button>
        </div>
    </div>
}
