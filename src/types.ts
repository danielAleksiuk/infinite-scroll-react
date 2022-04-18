export interface Image {
    farm: number;
    id: number | string;
    isfamily: number;
    isfriend: number;
    ispublic: number;
    owner: string;
    ownername: string;
    secret: string;
    server: string;
    title: string;
    isFavourite: boolean;
}

export interface ImagesProps {
    images: Image[]
    isLoaded: boolean
    setIsFavourite: (imageId: string | number, value: boolean) => void
}

export interface OverlayProps {
    title: string
    owner: string
    server: string
    id: number | string
    secret: string
    isFavourite: boolean
    setIsFavourite: (imageId: number | string, value: boolean) => void
}

export interface InfinityScrollState {
	prevY: number
	page: number
	images: Image[]
	isLoaded: boolean
	favouriteImages: Image[]
}