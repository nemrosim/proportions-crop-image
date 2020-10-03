import { Box, Grid, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { CropImageContext } from "../CropImage";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const ImageSizeInputFields = () => {

    const isMobile = useMediaQuery('(max-width:720px)');

    const {
        cropperInstance,
        imageWidth,
        setImageWidth,
        imageHeight,
        setImageHeight
    } = useContext(CropImageContext);

    const parseStringInteger = (number: string) => Number.parseInt(number, 10);

    return (
        <>
            <Grid item={true} xs={6} justify='center' alignItems='center'>
                <Box mx={isMobile ? '10px' : '0'}>
                    <TextField
                        label="Ширина, СМ"
                        type="number"
                        // className={classes.textField}
                        value={imageWidth}
                        onChange={((event) => {
                            const width = parseStringInteger(event.target.value);
                            cropperInstance.setAspectRatio(width / imageHeight);
                            setImageWidth(width);
                        })}
                        margin="normal"
                        variant="outlined"
                        fullWidth={isMobile}
                    />
                </Box>
            </Grid>
            <Grid item={true} xs={6}>
                <Box mx={isMobile ? '10px' : '0'}>
                    <TextField
                        label="Высота, СМ"
                        type="number"
                        // className={classes.textField}
                        value={imageHeight}
                        onChange={((event) => {
                            const height = parseStringInteger(event.target.value);
                            cropperInstance.setAspectRatio(imageWidth / height);
                            setImageHeight(height);
                        })}
                        margin="normal"
                        variant="outlined"
                        fullWidth={isMobile}
                    />
                </Box>
            </Grid>
        </>
    )
}
