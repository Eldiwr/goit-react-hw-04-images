import { RotatingLines } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export const Loader = ({loading}) => {
    return (
        <div className='Loader'>
            <RotatingLines
                strokeColor="#303f9f"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={loading}
            />
        </div>
    );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};