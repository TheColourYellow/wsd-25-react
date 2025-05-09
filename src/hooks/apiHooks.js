import {fetchData} from '../../utils/fetchData.js';
import {useEffect, useState} from 'react';

const url = import.meta.env.VITE_AUTH_API;

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
      );
      //setMediaArray(mediaData);

      //const userIds = data.map(({user_id}) => user_id);
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

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );
    return loginResult;
  };

  return {postLogin};
};

const useUser = () => {
  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions,
    );
  };
  const getUserByToken = async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer: ' + token,
      },
    };
    const userResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions,
    );
    console.log('userResult', userResult);
    return userResult;
  };
  return {getUserByToken, postUser};
};
export {useMedia, useAuthentication, useUser};
