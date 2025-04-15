import {useUserContext} from '../hooks/contextHooks';

const Logout = () => {
  //TODO
  const {handleLogout} = useUserContext();
  handleLogout();
  return <p>You have logged out. Not really</p>;
};

export default Logout;
