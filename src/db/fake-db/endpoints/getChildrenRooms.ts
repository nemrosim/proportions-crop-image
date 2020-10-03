import mock from '../mock';
import { ENDPOINTS } from '../../../constants/endpoints';

/*
   Children rooms that will be merged with cropped image.
 */
import childrenRoom1 from '../../../assets/images/rooms/detskaya-komnata-1.png';
import childrenRoom2 from '../../../assets/images/rooms/detskaya-komnata-2.png';

const images = {
    rooms: {
        children: [
            {
                url: childrenRoom1,
                width: 960,
                height: 700,
                cropCoordinates: {
                    ax: 0,
                    ay: 75,
                    bx: 540,
                    by: 125,
                    cx: 0,
                    cy: 439,
                    dx: 540,
                    dy: 429,
                },
            },
            {
                url: childrenRoom2,
                width: 879,
                height: 678,
                cropCoordinates: {
                    ax: 0,
                    ay: 7,
                    bx: 551,
                    by: 147,
                    cx: 0,
                    cy: 594,
                    dx: 551,
                    dy: 462,
                },
            },
        ],
    },
};

mock.onGet(ENDPOINTS.GET_IMAGE_CHILDREN_ROOMS).reply(() => [200, images.rooms.children]);
