import React, { useContext } from "react";
import Cropper from "cropperjs";
import Loader from 'react-loader-spinner';

import { ApiImagesContext } from "../ImagesContext/ApiImagesContext";
import { Typography } from "@material-ui/core";
import { CropImageContext } from "./CropImageContext";


export const CropImage = () => {
    const {
        wallpaperImage,
        isWallpaperImagesLoading
    } = useContext(ApiImagesContext);

    const {
        imageHeight,
        imageWidth,
        cropperInstance,
        setCropperInstance
    } = useContext(CropImageContext);

    const cropJsImageRef = React.useRef<any>();

    const createAndSetCropperJsInstance = (): void => {

        if (imageHeight && imageWidth && cropJsImageRef) {
            console.log('HELLOO')
            const options = {
                aspectRatio: imageWidth / imageHeight,
                preview: '.img-preview',
                viewMode: 3,

            } as Cropper.Options;

            const cropper = new Cropper(cropJsImageRef.current, options);

            cropJsImageRef.current.addEventListener('cropend', () => {
                // this.forceUpdate();
            });

            setCropperInstance(cropper)
        }
    };

    if (isWallpaperImagesLoading) {
        return (
            (
                <div
                    className="flex justify-center items-center"
                    style={{flexDirection: 'column'}}
                >
                    <Loader
                        type="Watch"
                        color="#00BFFF"
                        width={700}
                    />
                    <Typography>
                        Loading image
                    </Typography>
                </div>
            )
        )
    }

    return (
        <div style={{padding: '10px'}}>
            <div>
                <img
                    ref={cropJsImageRef}
                    alt="CroppedImage"
                    style={{maxWidth: '100%'}}
                    src={wallpaperImage?.original}
                    onLoad={() => {
                        console.log('ON LOAD')
                        if (!cropperInstance) {
                            createAndSetCropperJsInstance();
                        }
                    }}
                />
            </div>
        </div>
    )
}
