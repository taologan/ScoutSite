const InputField = ({ fieldDetails, value, onChange }) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    const renderField = () => {
        switch (fieldDetails.field_type) {
            case 'text':
            case 'number':
                return (
                    <input
                        type={fieldDetails.field_type}
                        id={fieldDetails.id}
                        name={fieldDetails.field_label}
                        value={value}
                        onChange={handleChange}
                        required={fieldDetails.required}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                );
            case 'checkbox':
                return (
                    <input
                        type="checkbox"
                        id={fieldDetails.id}
                        name={fieldDetails.field_label}
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                        required={fieldDetails.required}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                );
            case 'radio':
            case 'select':
                const options = fieldDetails.field_options.split(',').map(option => option.trim());
                return fieldDetails.field_type === 'radio' ? (
                    <div className="space-y-2">
                        {options.map((option, index) => (
                            <div key={index} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`${fieldDetails.id}-${index}`}
                                    name={fieldDetails.field_label}
                                    value={option}
                                    checked={value === option}
                                    onChange={handleChange}
                                    required={fieldDetails.required}
                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                                />
                                <label htmlFor={`${fieldDetails.id}-${index}`} className="ml-2 block text-sm text-gray-700">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                ) : (
                    <select
                        id={fieldDetails.id}
                        name={fieldDetails.field_label}
                        value={value}
                        onChange={handleChange}
                        required={fieldDetails.required}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        <option value="">Select an option</option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                );
            default:
                return null;
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor={fieldDetails.id} className="block text-sm font-medium text-gray-700 mb-2">
                {fieldDetails.field_label}
                {fieldDetails.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField()}
        </div>
    );
};

export default InputField;