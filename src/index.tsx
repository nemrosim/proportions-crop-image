import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import {
    App,
    CropImageContextProvider,
    ApiImagesContextProvider,
    ImageViewerModalProvider,
    ImageViewerModal
} from "./components";

import './assets/styles/Cropper.scss'
import './assets/styles/css-reset.scss'
import './assets/styles/main.scss';
import 'cropperjs/dist/cropper.css';

// This import will allow fake-db to work
import './db/fake-db';

const Providers: React.FC = ({children}) => {
    return (
        <ApiImagesContextProvider>
            <CropImageContextProvider>
                <ImageViewerModalProvider>
                    {children}
                    <ImageViewerModal/>
                </ImageViewerModalProvider>
            </CropImageContextProvider>
        </ApiImagesContextProvider>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <Providers>
            <App/>
        </Providers>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
