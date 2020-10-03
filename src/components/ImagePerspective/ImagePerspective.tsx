import React, { useContext, useEffect, useState } from 'react';
// @ts-ignore
import glfx from 'glfx';
import mergeImages from 'merge-images';
import { ImageDecorator } from "react-viewer/lib/ViewerProps";
import { RoomImage } from "../ImagesContext";
import { ImageViewerModalContext } from "../ImageViewerModal";
import { CropImageContext } from "../CropImage";

const STYLES = {
    hiddenStyle: {
        display: 'none',
    },
    widthStyle: {
        width: '100%',
        border: '4px double black',
        margin: '.5rem',
    }
};

export const ImagePerspective: React.FC<{ roomImage: RoomImage }> = ({roomImage}) => {

    const {
        setImages: setMergedImages,
    } = useContext(ImageViewerModalContext);

    const {getCroppedImagedBase64String} = useContext(CropImageContext)

    const [hasEndApplyingFilter, setHasEndApplyingFilter] = useState();
    const [canvasGLFX, setCanvasGLFX] = useState();
    const [updated, setUpdated] = useState(false);

    const imageRef = React.createRef<any>();
    const resizeCanvas = React.createRef<any>();

    useEffect(() => {
        try {
            const canvas = glfx.canvas();
            setCanvasGLFX(canvas);
        } catch (e) {
            alert(e);
        }
    }, []);

    const resizeImage = () => {
        const image: HTMLImageElement = new Image();

        const canvas = resizeCanvas.current;
        const ctx = canvas.getContext('2d');

        const resizedImage = imageRef.current;
        const {width, height} = roomImage;

        image.onload = function () {
            // set size proportional to image
            canvas.width = width;
            canvas.height = height;

            // step 1 - resize to 50%
            const oc = document.createElement('canvas');
            const octx: CanvasRenderingContext2D | null = oc.getContext('2d');

            oc.width = width;
            oc.height = height;
            if (octx) {
                octx.drawImage(image, 0, 0, oc.width, oc.height);
                //
                // // step 2
                // octx.drawImage(oc, 0, 0, oc.width, oc.height);

                // step 3, resize to final size
                ctx.drawImage(oc, 0, 0, oc.width, oc.height,
                    0, 0, canvas.width, canvas.height);

                resizedImage.src = canvas.toDataURL('image/png');
            }
        };

        image.src = getCroppedImagedBase64String() || '';
    };

    const applyImageFilters = async () => {
        if (!updated) {
            const {current: imageNode} = imageRef;

            const texture = canvasGLFX.texture(imageNode);

            const {width, height, cropCoordinates} = roomImage;

            const before = [
                0, // ax
                0, // ay
                width, // bx
                0, // by
                0, // cx
                height, // cy
                width, // dx
                height, // dy
            ];

            const {
                ax, ay, bx, by, cx, cy, dx, dy,
            } = cropCoordinates;
            const after = [
                ax, // ax
                ay, // ay
                bx, // bx
                by, // by
                cx, // cx
                cy, // cy
                dx, // dx
                dy, // dy
            ];
            canvasGLFX.draw(texture).perspective(before, after).update();

            setUpdated(true);

            const newImage = canvasGLFX.toDataURL('image/png');

            const result = await mergeImages([newImage, roomImage.url]);

            imageNode.src = result;
            setMergedImages((prevState) => {

                const value = {
                    src: result,
                    alt: 'Один из вариантов'
                } as ImageDecorator;

                if (prevState.length) {
                    return [...prevState, value];

                } else {
                    return [value];
                }
            })


        }
        setHasEndApplyingFilter(true);
    };

    return (
        <div style={{display: 'none'}}>
            <canvas ref={resizeCanvas}/>
            <img
                ref={imageRef}
                style={hasEndApplyingFilter ? STYLES.widthStyle : STYLES.hiddenStyle}
                onLoad={applyImageFilters}
            />
            <img
                className="hidden"
                style={{
                    border: '4px double black',
                    margin: '.5rem',
                }}
                src={getCroppedImagedBase64String()}
                onLoad={resizeImage}
            />
        </div>
    )
};
