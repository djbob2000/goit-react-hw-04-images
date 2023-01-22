// import axios from 'axios';

// const KEY = '31182736-3dd78a34c786b70675da4185d';

// const fetchImage = async (searchQuery, page) => {
//   const response = await axios.get(
//     `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   );
//   return response.data;
// };

// export default fetchImage;

import axios from 'axios';

const fetchImageApi = axios.create({
  baseURL: 'https://pixabay.com/',
});

const fetchImage = async (searchQuery, page) => {
  const { data } = await fetchImageApi.get(`api/`, {
    params: {
      key: '31182736-3dd78a34c786b70675da4185d',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      q: searchQuery,
      page,
    },
  });

  return data;
};

export default fetchImage;
