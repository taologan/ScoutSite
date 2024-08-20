import {useState} from "react";

const FieldBlock = ({fieldDetails, onEdit}) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:4000/api/forms/${fieldDetails.id}`, {
            method: 'DELETE',
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        }
    }

    return (
        <div className="flex rounded border-2">
            <h2>{fieldDetails.field_label}</h2>
            <h2>{fieldDetails.field_type}</h2>
            <p>{fieldDetails.field_options}</p>
            <p>{fieldDetails.required}</p>
            <p>{fieldDetails.display_order}</p>
            <button type="button" onClick={() => onEdit(fieldDetails)}>Edit</button>
            <button type = "submit" onClick={handleDelete}>Delete</button>
            {error && <p>{error}</p>}
        </div>
    )
}
export default FieldBlock;