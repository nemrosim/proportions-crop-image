import mock from './mock';
import './endpoints/getChildrenRooms';
import './endpoints/getImages';

mock.onAny().passThrough();
