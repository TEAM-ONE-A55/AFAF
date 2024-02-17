import { useState } from "react";
import PropTypes from 'prop-types'

export default function SortingDropdown({ options, defaultOption, onChange }) {
    const [selectedOption, setSelectedOption] = useState(defaultOption)

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        onChange(e.target.value);
    };

    return (
        <select value={selectedOption} onChange={handleOptionChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}


SortingDropdown.propTypes = {
    options: PropTypes.array.isRequired,
    defaultOption: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}