import React, { useEffect, useState } from "react";
import { ApiImagesContext } from "./ApiImagesContext";
import { axiosInstance } from "../../api/axios";
import { ENDPOINTS } from "../../constants/endpoints";

export const ApiImagesContextProvider: React.FC = ({children}) => {

    const [wallpaperImage, setWallpaperImage] = useState();
    const [isWallpaperImagesLoading, setIsWallpaperImagesLoading] = useState(true);

    const [roomImages, setRoomImages] = useState();
    const [isRoomImagesLoading, setIsRoomImagesLoading] = useState(true);

    const downloadImages = () => {
        setIsWallpaperImagesLoading(true);
        axiosInstance.get(ENDPOINTS.GET_IMAGE).then(({data})=>{

            setWallpaperImage(data);
            setIsWallpaperImagesLoading(false);
        });

        setIsRoomImagesLoading(true);
        axiosInstance.get(ENDPOINTS.GET_IMAGE_CHILDREN_ROOMS).then(({data})=>{

            setRoomImages(data);
            setIsRoomImagesLoading(false)
        })

    };

    useEffect(()=>{
        downloadImages();
    },[])

    return (
        <ApiImagesContext.Provider value={{
            wallpaperImage,
            setWallpaperImage,
            isWallpaperImagesLoading,
            setIsWallpaperImagesLoading,
            roomImages,
            setRoomImages,
            isRoomImagesLoading,
            setIsRoomImagesLoading,
        }}>
            {children}
        </ApiImagesContext.Provider>
    )
}
