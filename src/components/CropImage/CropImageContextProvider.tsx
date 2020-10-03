import React, { useState } from "react";
import { CropImageContext } from "./CropImageContext";
import { IMAGE_TYPES } from "../../constants/ImageTypes";

export const CropImageContextProvider: React.FC = ({children}) => {
    const [imageType, setImageType] = useState<IMAGE_TYPES>(IMAGE_TYPES.ORIGINAL);

    const [imageWidth, setImageWidth] = useState<number>(600);
    const [imageHeight, setImageHeight] = useState<number>(400);

    const [cropperInstance, setCropperInstance] = useState();

    const getCroppedImagedBase64String = (): string | undefined => {
        const croppedCanvas: HTMLCanvasElement = cropperInstance.getCroppedCanvas({
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'low',
        });

        if (croppedCanvas) {
            return croppedCanvas.toDataURL('image/png');
        } else {
            return undefined;
        }
    };

    return (
        <CropImageContext.Provider value={{
            imageType,
            setImageType,
            imageWidth,
            setImageWidth,
            imageHeight,
            setImageHeight,
            cropperInstance,
            setCropperInstance,
            getCroppedImagedBase64String,
        }}>
            {children}
        </CropImageContext.Provider>
    )
}
