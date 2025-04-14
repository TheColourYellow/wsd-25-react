import {fetchData} from '../../utils/fetchData.js';
import {useEffect, useState} from 'react';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
      );
      //setMediaArray(mediaData);

      //const userIds = data.map(({user_id}) => user_id);
      const url = import.meta.env.VITE_AUTH_API;
      const newData = await Promise.all(
        mediaData.map(async (item) => {
          const data = await fetchData(`${url}/users/${item.user_id}`);
          return {...item, username: data.username};
        }),
      );
      console.log('newdata', newData);
      setMediaArray(newData);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return mediaArray;
};

export default useMedia;
