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

  const postMedia = async (file, inputs, token) => {
    const data = {
      ...inputs,
      ...file,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    return await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media',
      fetchOptions,
    );
  };

  return {mediaArray, postMedia};
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
    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );
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
    return await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions,
    );
  };
  return {getUserByToken, postUser};
};

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    console.log('formData', formData);

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer: ' + token,
      },
      mode: 'cors',
      body: formData,
    };
    return await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      fetchOptions,
    );
  };
  return {postFile};
};
export {useMedia, useAuthentication, useUser, useFile};
