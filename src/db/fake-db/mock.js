import { axiosInstance } from '../../api/axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axiosInstance, { delayResponse: 1000 });
export default mock;
