import {BrowserRouter as Router, Routes, Route} from 'react-router';
import PropTypes from 'prop-types';
import Home from './Home';
import Upload from './Upload';
import {useUser} from '../hooks/apiHooks';
import {useEffect, useState} from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const {getUserByToken} = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userResult = await getUserByToken(token);
        setUser(userResult.user);
      }
    };

    fetchUser();
  }, []);

  console.log('user', user);

  return (
    <>
      <h2>Profile</h2>
      {user && (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>
            Register Date: {new Date(user.created_at).toLocaleString('fi-FI')}
          </p>
        </>
      )}
    </>
  );
};

Profile.propTypes = {};

export default Profile;
