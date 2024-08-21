import { useState, useEffect } from 'react';

const FieldForm = ({ formToEdit, onFormSubmit, formId }) => {
    const [scouting_form_id, setScouting_form_id] = useState(formId)
    const [field_label, setFieldLabel] = useState("")
    const [field_type, setFieldType] = useState("")
    const [field_options, setFieldOptions] = useState("")
    const [required, setRequired] = useState(false)
    const [display_order, setDisplay_order] = useState("")
    const [error, setError] = useState(null);

    useEffect(() => {
        if (formToEdit) {
            setScouting_form_id(formToEdit.scouting_form_id);
            setFieldLabel(formToEdit.field_label);
            setFieldType(formToEdit.field_type);
            setFieldOptions(formToEdit.field_options);
            setRequired(formToEdit.required);
            setDisplay_order(formToEdit.display_order);
        }
    }, [formToEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = { scouting_form_id, field_label, field_type, field_options, required, display_order: parseInt(display_order) };

        const response = await fetch(formToEdit ? `http://localhost:4000/api/fields/${formToEdit.id}`
            : "http://localhost:4000/api/fields", {
            method: formToEdit ? "PATCH" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })

        const json = await response.json();

        if (response.ok) {
            console.log(formToEdit ? "Field updated successfully" : "Field successfully created");
            setFieldLabel("");
            setFieldType("");
            setFieldOptions("");
            setRequired(false);
            setDisplay_order("");
            onFormSubmit();
        } else {
            setError(json.error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="field_label" className="block text-sm font-medium text-gray-700">Field Label:</label>
                <input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    type="text"
                    id="field_label"
                    value={field_label}
                    onChange={(e) => setFieldLabel(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="field_type" className="block text-sm font-medium text-gray-700">Field Type:</label>
                <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    id="field_type"
                    value={field_type}
                    onChange={(e) => setFieldType(e.target.value)}
                    required
                >
                    <option value="">Select a type</option>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                    <option value="select">Select</option>
                </select>
            </div>
            {(field_type === 'radio' || field_type === 'select') && (
                <div>
                    <label htmlFor="field_options" className="block text-sm font-medium text-gray-700">Field Options (comma-separated):</label>
                    <input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        type="text"
                        id="field_options"
                        value={field_options}
                        onChange={(e) => setFieldOptions(e.target.value)}
                        required
                    />
                </div>
            )}
            <div>
                <label htmlFor="required" className="flex items-center">
                    <input
                        type="checkbox"
                        id="required"
                        checked={required}
                        onChange={(e) => setRequired(e.target.checked)}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">Required</span>
                </label>
            </div>
            <div>
                <label htmlFor="display_order" className="block text-sm font-medium text-gray-700">Display Order:</label>
                <input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    type="number"
                    id="display_order"
                    value={display_order}
                    onChange={(e) => setDisplay_order(e.target.value)}
                    required
                />
            </div>
            <button
                className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                type="submit"
            >
                {formToEdit ? "Update Field" : "Create Field"}
            </button>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </form>
    );
}

export default FieldForm;