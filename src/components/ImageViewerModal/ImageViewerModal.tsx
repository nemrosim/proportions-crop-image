import React, { useContext, useEffect, useState } from "react";
import ImageView from 'react-viewer';
import { ImageViewerModalContext } from "./ImageViewerModalContext";
import { ApiImagesContext } from "../ImagesContext/ApiImagesContext";

export const ImageViewerModal: React.FC = () => {

    const {images, setImages, isModalVisible, setIsModalVisible} = useContext(ImageViewerModalContext);
    const {roomImages} = useContext(ApiImagesContext);

    const onCloseHandler = () => {
        setIsModalVisible(false);
        setImages([]);
    }

    useEffect(() => {
        if (images?.length === roomImages?.length) {
            setIsModalVisible(true);
        }
    }, [images, isModalVisible, JSON.stringify(roomImages)]);

    return (
        <ImageView
            visible={isModalVisible}
            onClose={onCloseHandler}
            images={images}
        />
    )
}
