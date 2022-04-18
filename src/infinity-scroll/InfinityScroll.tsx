import React, { useState, useEffect } from 'react';
import * as API_CONSTANTS from '../consts';
import { Images } from '../images/Images';
import { Image, InfinityScrollState } from '../types';
import './infinityScroll.scss';

export const InfinityScroll: React.FC = () => {
	const [ state, setState ] = useState<InfinityScrollState>({
		images: [],
		favouriteImages: [],
		isLoaded: false,
		page: 0,
		prevY: 0
	});
	const [ isBottom, setIsBottom ] = useState(false);

	const handleScroll = () => {
		const scrollTop = (document.documentElement
			&& document.documentElement.scrollTop)
			|| document.body.scrollTop;
		const scrollHeight = (document.documentElement
			&& document.documentElement.scrollHeight)
			|| document.body.scrollHeight;
		if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
			setIsBottom(true);
		}
	}

	useEffect(() => {
		const favouriteImages = localStorage.getItem('favouriteImages') !== null 
			? JSON.parse(localStorage.getItem('favouriteImages') as string)
			: [];
		setState((prevState: InfinityScrollState) => ({ ...prevState, favouriteImages }));
		setState((prevState: InfinityScrollState) => ({ ...prevState, images: [...prevState.images, ...prevState.favouriteImages] }));

		getImages();

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		if (isBottom) {
			getImages();
		}
	}, [isBottom]);

	const getImages = () => {
		const url = `${API_CONSTANTS.API_BASE_URL}${API_CONSTANTS.API_URL_FILTER}${API_CONSTANTS.API_KEY}${API_CONSTANTS.API_FLICKR_METHOD}&pages=${state.page}`;

		fetch(url)
			.then(response => response.json())
			.then(
				(response) => {
					setState((prevState: InfinityScrollState) => ({
						...prevState,
						isLoaded: true,
						images: [
							...prevState.images,
							...response.photos.photo.filter((o: Image) => !prevState.favouriteImages.find((x: Image) => x.id === o.id))],
						page: prevState.page + 1
					}));
					setIsBottom(false);
				})
			.catch((error) => console.log(error));
	}

	const setFavourite = (imageId: string | number, value: boolean) => {
		setState((prevState: InfinityScrollState) => ({
			...prevState,
			photos: state.images.map((image: Image) =>
				image.id === imageId ? { ...image, isFavourite: value } : image)
		}));
	}

	return <div className='row'>
		<Images 
			isLoaded={ state.isLoaded } 
			images={ state.images }
			setIsFavourite={ (imageId: string | number, value: boolean) => setFavourite(imageId, value) } 
		/>
	</div>;
};

export default InfinityScroll;