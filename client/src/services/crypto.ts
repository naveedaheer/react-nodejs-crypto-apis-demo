import { API } from '../config';

// eslint-disable-next-line max-len
const getCrypto = () => API.get('/api/v1/fetch');

export const cryptoService = {
    getCrypto
};
