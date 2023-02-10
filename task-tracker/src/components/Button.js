import PropTypes from 'prop-types';

const Button = (probs) => {

  return (
    <button onClick={probs.onClick} className="btn" style={{ backgroundColor: probs.color }}>
      {probs.text}
    </button>
  );
};

Button.defaultProps = {
    color: 'steelblue',
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

export default Button;
