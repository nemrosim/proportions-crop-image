import React, { Dispatch, SetStateAction, useState } from "react";
import { ImageDecorator } from "react-viewer/lib/ViewerProps";

interface ImageViewerContextProps {
    images?: ImageDecorator[],
    setImages: Dispatch<SetStateAction<ImageDecorator[]>>,
    isModalVisible: boolean,
    setIsModalVisible: Dispatch<SetStateAction<boolean>>,
}

const defaultValues = {
    images: undefined,
    setImages: () => undefined,
    isModalVisible: false,
    setIsModalVisible: () => undefined
} as ImageViewerContextProps;

export const ImageViewerModalContext = React.createContext<ImageViewerContextProps>(defaultValues);

export const ImageViewerModalProvider: React.FC = ({children}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    /*
        Images that will be shown in the modal window
     */
    const [images, setImages] = useState<ImageDecorator[]>([]);


    return (
        <ImageViewerModalContext.Provider value={{
            images,
            setImages,
            isModalVisible,
            setIsModalVisible,
        }}>
            {children}
        </ImageViewerModalContext.Provider>
    )
};
