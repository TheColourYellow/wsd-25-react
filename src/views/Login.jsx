import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [formToggle, setFormToggle] = useState(true);

  const clickHander = () => {
    setFormToggle(!formToggle);
  };
  return (
    <>
      {formToggle ? <LoginForm /> : <RegisterForm />}
      <button onClick={clickHander}>
        {formToggle ? 'Register Account' : 'Sign In'}
      </button>
    </>
  );
};

export default Login;
