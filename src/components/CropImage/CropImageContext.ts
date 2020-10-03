import React, { Dispatch, SetStateAction } from "react";
import { IMAGE_TYPES } from "../../constants/ImageTypes";

interface CropImageContextProps {
    imageWidth: number,
    setImageWidth: Dispatch<SetStateAction<number>>,
    imageHeight: number,
    setImageHeight: Dispatch<SetStateAction<number>>
    imageType: IMAGE_TYPES,
    setImageType: Dispatch<SetStateAction<IMAGE_TYPES>>
    cropperInstance: any,
    setCropperInstance: Dispatch<SetStateAction<any>>

    /**
     * Functions the returns base64 string image representation of the cropped image
     */
    getCroppedImagedBase64String: () => string | undefined
}

const defaultValues = {
    imageWidth: 600,
    setImageWidth: () => undefined,
    imageHeight: 400,
    setImageHeight: () => undefined,
    imageType: IMAGE_TYPES.ORIGINAL,
    setImageType: ()=>undefined,
    cropperInstance: 400,
    setCropperInstance: () => undefined,
    getCroppedImagedBase64String: () => undefined,
} as CropImageContextProps;

export const CropImageContext = React.createContext<CropImageContextProps>(defaultValues);
