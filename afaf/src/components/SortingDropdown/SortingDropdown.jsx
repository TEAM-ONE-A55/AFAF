import { useState } from "react";
import PropTypes from 'prop-types'
import "./SortingDropdown.css"

export default function SortingDropdown({ options, defaultOption, onChange }) {
    const [selectedOption, setSelectedOption] = useState(defaultOption)

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className="select-container">
        <select value={selectedOption} onChange={handleOptionChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        </div>
    );
}


SortingDropdown.propTypes = {
    options: PropTypes.array.isRequired,
    defaultOption: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}