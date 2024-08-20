import {useState, useEffect} from 'react'

const FieldForm = ({formToEdit, onFormSubmit, formId}) => {
    const [scouting_form_id, setScouting_form_id] = useState(formId)
    const [field_label, setFieldLabel] = useState(null)
    const [field_type, setFieldType] = useState(null)
    const [field_options, setFieldOptions] = useState(null)
    const [required, setRequired] = useState(null)
    const [display_order, setDisplay_order] = useState(null)

    const [error, setError] = useState(null);

    useEffect( () => {
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
        const form = { scouting_form_id, field_label, field_type, field_options, required, display_Order: display_order };

        const response = await fetch(formToEdit ? `http://localhost:4000/api/fields/${formToEdit.id}`
            : "http://localhost:4000/api/fields", {
            method :formToEdit ? "PATCH" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })

        const json = await response.json();

        if (response.ok) {
            console.log(formToEdit ? "Field updated successfully" : "Field successfully created");
            setScouting_form_id("")
            setFieldLabel("");
            setFieldType("");
            setFieldOptions("");
            setRequired("")
            setDisplay_order("")
        } else {
            setError(json.error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="field_label">Field Label:</label>
                <input
                    className="outline"
                    type="text"
                    id="field_label"
                    value={field_label}
                    onChange={(e) => setFieldLabel(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="field_type">Field Type:</label>
                <select
                    className="outline"
                    id="field_type"
                    value={field_type}
                    onChange={(e) => setFieldType(e.target.value)}
                    required
                >
                    <option value="">Select a field type</option>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                    <option value="select">Select</option>
                </select>
            </div>
            {field_type === 'select' || field_type === 'radio' ? (
                <div>
                    <label htmlFor="field_options">Field Options (comma-separated):</label>
                    <input
                        className="outline"
                        type="text"
                        id="field_options"
                        value={field_options}
                        onChange={(e) => setFieldOptions(e.target.value)}
                        required
                    />
                </div>
            ) : null}
            <div>
                <label htmlFor="required">Required:</label>
                <input
                    type="checkbox"
                    id="required"
                    checked={required}
                    onChange={(e) => setRequired(e.target.checked)}
                />
            </div>
            <div>
                <label htmlFor="display_order">Display Order:</label>
                <input
                    className="outline"
                    type="number"
                    id="display_order"
                    value={display_order}
                    onChange={(e) => setDisplay_order(e.target.value)}
                    required
                />
            </div>
            <button className="outline" type="submit">
                {formToEdit ? "Update Field" : "Create Field"}
            </button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default FieldForm;