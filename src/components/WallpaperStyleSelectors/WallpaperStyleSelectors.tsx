import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { IMAGE_TYPES } from "../../constants/ImageTypes";
import { ButtonGroup } from "@material-ui/core";
import { ApiImagesContext } from "../ImagesContext";
import { CropImageContext } from "../CropImage";

export const WallpaperStyleSelectors: React.FC = () => {

    const {cropperInstance, imageType , setImageType} = useContext(CropImageContext);
    const {wallpaperImage} = useContext(ApiImagesContext);

    /**
     * Action that will happen after "Black and White" button onClick event
     */
    const bwButtonOnClick = () => {
        if (imageType === IMAGE_TYPES.ORIGINAL || imageType === IMAGE_TYPES.SEPIA) {
            cropperInstance.replace(wallpaperImage?.blackAndWhite);

            setImageType(IMAGE_TYPES.BLACK_WHITE);
        } else {
            cropperInstance.replace(wallpaperImage?.original);

            setImageType(IMAGE_TYPES.ORIGINAL);
        }
    };

    /**
     * Action that will happen after "Sepia" button onClick event
     */
    const sepiaButtonOnClick = () => {
        if (imageType === IMAGE_TYPES.ORIGINAL || imageType === IMAGE_TYPES.BLACK_WHITE) {
            cropperInstance.replace(wallpaperImage?.sepia);

            setImageType(IMAGE_TYPES.SEPIA);
        } else {
            cropperInstance.replace(wallpaperImage?.original);

            setImageType(IMAGE_TYPES.ORIGINAL);
        }
    };

    /**
     * Action that will happen after "Mirror" button onClick event
     */
    const mirrorButtonOnClick = () => {
        const imageData = cropperInstance.getData();
        if (imageData.scaleX === 1) {
            cropperInstance.scaleX(-1);
        } else {
            cropperInstance.scaleX(1);
        }
    };

    return (
        <>
            <ButtonGroup
                fullWidth={true}
                color="primary"
                size="small"
            >
                <Button
                    color="default"
                    onClick={bwButtonOnClick}
                >
                    Ч/Б
                </Button>
                <Button
                    color="default"
                    onClick={sepiaButtonOnClick}
                >
                    Сепия
                </Button>
                <Button
                    color="default"
                    onClick={mirrorButtonOnClick}
                >
                    Отзеркалить
                </Button>
            </ButtonGroup>
        </>
    );
};
