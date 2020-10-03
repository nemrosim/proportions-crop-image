import mock from '../mock';
import { ENDPOINTS } from '../../../constants/endpoints';
import { WallpaperImage } from "../../../components/ImagesContext/ApiImagesContext";

// Three types of one image: original, blackAndWhite, and Sepia
import building01Orig from '../../../assets/images/wallpapers/buildings_v1/building-01-orig.png';
import building01Bw from '../../../assets/images/wallpapers/buildings_v1/building-01-bw.png';
import building01Sepia from '../../../assets/images/wallpapers/buildings_v1/building-01-sepia.png';

const images = {
    building: {
        original: building01Orig,
        blackAndWhite: building01Bw,
        sepia: building01Sepia,
    } as WallpaperImage,
};

mock.onGet(ENDPOINTS.GET_IMAGE).reply(() => [200, images.building]);
