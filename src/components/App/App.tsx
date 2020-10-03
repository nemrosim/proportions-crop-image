import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Divider, Grid, Paper, Typography } from "@material-ui/core";

import { CropImage, CropImageContext } from "../CropImage";
import { ApiImagesContext } from "../ImagesContext";
import { ImageViewerModalContext } from "../ImageViewerModal";
import { ImageSizeInputFields } from "../ImageSizeInputFields";
import { ImagePerspective } from "../ImagePerspective/ImagePerspective";
import { WallpaperStyleSelectors } from "../WallpaperStyleSelectors/WallpaperStyleSelectors";
// @ts-ignore
import LoadingOverlay from 'react-loading-overlay';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const CroppedPreviewImage = () => {
    return (
        <Grid item={true} xs={12} justify='center' alignItems="center">
            <div style={{display: 'flex', justifyContent: 'center', paddingTop: '10px'}}>
                <div className="docs-preview clearfix">
                    <div className="img-preview preview-lg"/>
                </div>
            </div>
        </Grid>
    )
}

const WarningTextMessage = () => {
    return (
        <div className="flex justify-center">
            <Typography>
                <b>Внимание!</b>
                Данное изображение по Вашему запросу может
                быть изменено нашим дизайнером (цвет, пропорции и т.д.)
            </Typography>
        </div>
    )
}

const RowButtons: React.FC<{ onCLickHandler: () => void }> = ({onCLickHandler}) => {

    const isMobile = useMediaQuery('(max-width:720px)');

    return (
        <Paper style={{marginTop: '.5rem'}}>
            <Typography variant="h5" color="textPrimary" component="p">
                Посмотреть обрезанное изображение в интерьерах
            </Typography>
            <Grid container={true} direction="column" alignItems="center">
                <ButtonGroup
                    id="button group"
                    color="primary"
                    aria-label="small outlined primary button group"
                    style={{margin: '1rem'}}
                    size="small"
                    orientation={isMobile ? 'vertical' : 'horizontal'}
                >
                    <Button
                        style={{textTransform: 'none'}}
                        onClick={onCLickHandler}
                    >
                        Детская комната
                    </Button>
                    <Button style={{textTransform: 'none'}}>Открытая стена</Button>
                    <Button style={{textTransform: 'none'}}>Стена с проемом</Button>
                    <Button style={{textTransform: 'none'}}>Угловая стена</Button>
                    <Button style={{textTransform: 'none'}}>За телевизором</Button>
                    <Button style={{textTransform: 'none'}}>За диваном</Button>
                    <Button style={{textTransform: 'none'}}>За кроватью</Button>
                </ButtonGroup>
            </Grid>
        </Paper>
    );
}

export const App: React.FC = () => {

    const {
        roomImages,
        isRoomImagesLoading,
        isWallpaperImagesLoading
    } = useContext(ApiImagesContext);

    const {
        images: mergedImages,
        setIsModalVisible,
    } = useContext(ImageViewerModalContext);
    const {cropperInstance} = useContext(CropImageContext);

    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [isInProgress, setIsInProgress] = useState<boolean>(false);

    useEffect(() => {
        if (mergedImages?.length === roomImages?.length) {
            setIsInProgress(false);
            setIsModalVisible(true);
            setIsClicked(false);
        }
    }, [mergedImages, roomImages, setIsInProgress, setIsModalVisible, setIsClicked]);

    return (
        <LoadingOverlay
            active={isWallpaperImagesLoading || isRoomImagesLoading || isInProgress}
            spinner={true}
            text={isRoomImagesLoading ? 'Loading images' : 'Processing images'}
        >
            {
                cropperInstance && isClicked && roomImages?.map((image) => (
                    <ImagePerspective
                        roomImage={image}
                    />
                ))
            }
            <Container style={{padding: '10px'}}>
                <Paper style={{padding: '10px'}}>
                    <Grid container={true}>
                        <Grid item={true} xs={12} sm={12} md={8} style={{padding: '10xp'}}>
                            <CropImage/>
                        </Grid>
                        <Grid item={true} xs={12} sm={12} md={4}>
                            <Grid container={true} justify="center" alignItems="center">
                                <ImageSizeInputFields/>
                                <WallpaperStyleSelectors/>
                                <CroppedPreviewImage/>
                            </Grid>
                        </Grid>
                        <Grid item={true} xs={12}>
                            <Divider/>
                        </Grid>
                    </Grid>
                    <Container style={{paddingBottom: '.5rem'}}>
                        <WarningTextMessage/>
                    </Container>
                </Paper>
                <RowButtons onCLickHandler={() => {
                    setIsClicked(true);
                    setIsInProgress(true);
                }}/>
            </Container>
        </LoadingOverlay>

    );
}
