import React, { Dispatch, SetStateAction } from "react";

export interface WallpaperImage {
    original: string,
    blackAndWhite: string,
    sepia: string
}

export interface RoomImage {
    url: string,
    width: number,
    height: number,
    cropCoordinates: {
        ax: number,
        ay: number,
        bx: number,
        by: number,
        cx: number,
        cy: number,
        dx: number,
        dy: number,
    },
}

interface ApiImagesContextProps {
    // wallpaper images
    wallpaperImage?: WallpaperImage,
    setWallpaperImage: Dispatch<SetStateAction<WallpaperImage>>,
    isWallpaperImagesLoading: boolean,
    setIsWallpaperImagesLoading: Dispatch<SetStateAction<boolean>>

    // room images
    roomImages?: Array<RoomImage>,
    setRoomImages: Dispatch<SetStateAction<Array<WallpaperImage>>>,
    isRoomImagesLoading: boolean,
    setIsRoomImagesLoading: Dispatch<SetStateAction<boolean>>
}

const defaultValues = {
    // wallpaper images
    wallpaperImage: undefined,
    setWallpaperImage: () => undefined,
    isWallpaperImagesLoading: false,
    setIsWallpaperImagesLoading: () => undefined,

    // room images
    roomImages: undefined,
    setRoomImages: () => undefined,
    isRoomImagesLoading: false,
    setIsRoomImagesLoading: () => undefined,
} as ApiImagesContextProps;

export const ApiImagesContext = React.createContext<ApiImagesContextProps>(defaultValues);
