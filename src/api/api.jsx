import axios from 'axios';


const API_KEY = "32806478-c0afa52000c916a4df313f90b"


axios.defaults.baseURL = 'https://pixabay.com/api/';

 const fetchImages = async (query, currentPage) => {
  const { data } = await axios.get(
    `/?q=${query}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );

  return data;
};

export default fetchImages;