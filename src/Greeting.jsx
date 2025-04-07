import PropTypes from 'prop-types';

const Greeting = (props) => {
  /*
  function handleButtonClick() {
    alert('Click!');
  }
  <button onClick={handleButtonClick}>Button2</button>
  */
  return (
    <div>
      <h1>Hi, {props.name}</h1>
      <p>How goes it?</p>
      <button onClick={() => alert('Click')}>Button</button>
    </div>
    /*
    <>
      <h1>Hi, {props.name}</h1>
      <p>How goes it?</p>;
    <>
    */
  );
};

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Greeting;
