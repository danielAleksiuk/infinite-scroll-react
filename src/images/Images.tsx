import React, { useState } from 'react';
import { Overlay } from '../overlay/Overlay';
import './images.scss';
import { Image, ImagesProps } from '../types';
import * as CONSTANTS from '../consts';

export const Images: React.FC<ImagesProps> = (props) => {
    const [hoveredImageId, setHoveredImageId] = useState<string | number | null>(null);

    return <React.Fragment>
        { props.isLoaded 
            ? props.images.map((photo: Image, index: number) => (
                <div 
                    className='container'
                    key={index}
                    onMouseOver={() => setHoveredImageId(photo.id)}
                    onMouseLeave={() => setHoveredImageId(null)}>
                    {   hoveredImageId === photo.id && (
                        <Overlay
                            title={photo.title}
                            owner={photo.ownername}
                            server={photo.server}
                            id={photo.id}
                            secret={photo.secret}
                            isFavourite={photo.isFavourite}
                            setIsFavourite={(photoId: string | number, value: boolean) => props.setIsFavourite(photoId, value)} 
                        />)
                    }
                    <img 
                        className='image'
                        src={`${CONSTANTS.IMG_URL}${photo.server}/${photo.id}_${photo.secret}_c.jpg`}
                        alt={photo.id as string}
                    />
                </div>
            )) 
            : <div className='center'><h1>Loading images...</h1></div>
        }
    </React.Fragment>
}
