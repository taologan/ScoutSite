import { useState } from "react";

const ScoutingFormBlock = ({ formDetails, onEdit }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:4000/api/forms/${formDetails.id}`, {
            method: "DELETE",
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        }
    };

    return (
        <div className="flex rounded border-2">
            <h2>{formDetails.name}</h2>
            <p>{formDetails.description}</p>
            <button type="button" onClick={() => onEdit(formDetails)}>Edit</button>
            <button type="submit" onClick={handleDelete}>Delete</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default ScoutingFormBlock;