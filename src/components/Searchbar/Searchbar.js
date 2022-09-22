import PropTypes from 'prop-types';
import { useState } from "react";

export const Searchbar = ({onSubmit}) => {

    // static PropType = {
    //     onSubmit: PropTypes.func.isRequired,
    //     onChange: PropTypes.func,
    // };

    const [name, setName] = useState('');

    const handleInputForm = (event) => {
        setName(event.currentTarget.value);
    };

    const formSubmit = (event) => {
        event.preventDefault();

        onSubmit(name);
        
        setName('');
    };
    
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={formSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <span className="SearchForm-button-label">Search</span>
                    </button>

                    <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="name"
                        onChange={handleInputForm}
                    />
                </form>
            </header>
    );
};

