import axios from '@/utils/ajaxRequest';

const fetchCategory = () => axios.request({ url: '/category' });

export default {
  fetchCategory,
};
