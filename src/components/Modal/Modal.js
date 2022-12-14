import PropTypes from 'prop-types';
import { useEffect} from "react";

export const Modal = ({toggleModal, children}) => {

    useEffect(() => {
        window.addEventListener('keydown', onClose);
        return () => {
            window.removeEventListener('keydown', onClose);
        };
    });

    const onClose = (event) => {
        if (event.currentTarget === event.target) {
            toggleModal();
        } else if (event.code === 'Escape') {
            toggleModal();
        };
    };
    
        return (
            <div className="Overlay" onClick={onClose}>
                <div className="Modal">
                    {children}
                </div>
            </div>
    );
};

Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
};