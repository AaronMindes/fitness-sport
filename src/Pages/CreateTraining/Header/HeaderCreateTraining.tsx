import React, { useState, useEffect } from 'react';
import './HeaderCreateTrainingStyle.scss';
import { data } from '../../../Services/Data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

interface SelectedFilters {
    force: string[];
    level: string[];
    mechanic: string[];
    equipment: string[];
    category: string[];
}

interface ShowCheckboxes {
    force: boolean;
    level: boolean;
    mechanic: boolean;
    equipment: boolean;
    category: boolean;
}

interface Filter {
    property: string;
    value: string;
}

const HeaderCreateTraining: React.FC<{ onSelectedFiltersChange: (newFilters: SelectedFilters) => void }> = ({ onSelectedFiltersChange }) => {

    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        force: [],
        level: [],
        mechanic: [],
        equipment: [],
        category: [],
    });

    const [showCheckboxes, setShowCheckboxes] = useState<ShowCheckboxes>({
        force: false,
        level: false,
        mechanic: false,
        equipment: false,
        category: false,
    });

    useEffect(() => {
        onSelectedFiltersChange(selectedFilters);
    }, [onSelectedFiltersChange, selectedFilters]);

    const getUniqueValues = (property: string) => [...new Set(data.map((item) => item[property]))];

    const handleUnknown = (value: string | null) => value ?? 'unknown';

    const handleCheckboxChange = (property: string, value: string) => {
        setSelectedFilters((prevFilters) => {
            const newValues = prevFilters[property].includes(value)
                ? prevFilters[property].filter((v) => v !== value)
                : [...prevFilters[property], value];
            return { ...prevFilters, [property]: newValues };
        });
    };

    const toggleCheckboxes = (property: string) => {
        setShowCheckboxes((prevShowCheckboxes) => ({
            ...prevShowCheckboxes,
            [property]: !prevShowCheckboxes[property],
        }));
    };

    const renderCheckboxes = (property: string) => (
        <div key={property}>
            <div onClick={() => toggleCheckboxes(property)} className='filter-name'>
                <span>{property.charAt(0).toUpperCase() + property.slice(1)}</span>
                <FontAwesomeIcon icon={showCheckboxes[property] ? faAngleUp : faAngleDown} />
            </div>
            <div className={`menu-options ${showCheckboxes[property] ? 'open' : ''}`}>
                {showCheckboxes[property] && renderCheckboxOptions(property)}
            </div>
        </div>
    );

    const renderCheckboxOptions = (property: string) =>
        getUniqueValues(property).map((filterValue) => (
            <label key={filterValue} className='options-name'>
                <input
                    type="checkbox"
                    value={filterValue || ''}
                    checked={selectedFilters[property].includes(filterValue)}
                    onChange={() => handleCheckboxChange(property, filterValue)}
                />
                {handleUnknown(filterValue)}
            </label>
        ));

    const resetFilters = () => {
        setSelectedFilters({
            force: [],
            level: [],
            mechanic: [],
            equipment: [],
            category: [],
        });
    };

    const getFilterAdded = (): Filter[] => {
        let filters: Filter[] = [];
        for (const filter of Object.keys(selectedFilters)) {
            for (const value of getUniqueValues(filter)) {
                if (selectedFilters[filter].includes(handleUnknown(value))) {
                    filters.push({ property: filter, value: handleUnknown(value) });
                }
            }
        }
        return filters;
    };

    return (
        <div className='header-create-training-container'>
            {/* Render all checkboxes */}
            <div className="toggle-menu-checkboxes">
                <h1>Filters:</h1>
                {Object.keys(selectedFilters).map((property) => renderCheckboxes(property))}
                <button onClick={resetFilters}>Reset Filters</button>
            </div>
            <div className='filters-handle-container'>
                {getFilterAdded().map((filter) => (
                    <div className='container' key={filter.value}>
                        <div>{filter.property}: {filter.value}</div>
                        <div className='x-container' onClick={() => handleCheckboxChange(filter.property, filter.value)}>
                            X
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeaderCreateTraining;
