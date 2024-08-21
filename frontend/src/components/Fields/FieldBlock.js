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
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-xl font-bold mb-2">{fieldDetails.field_label}</h2>
            <p className="text-gray-600 mb-2">Type: {fieldDetails.field_type}</p>
            <p className="text-gray-600 mb-2">Options: {fieldDetails.field_options || 'N/A'}</p>
            <p className="text-gray-600 mb-2">Required: {fieldDetails.required ? 'Yes' : 'No'}</p>
            <p className="text-gray-600 mb-4">Display Order: {fieldDetails.display_order}</p>
            <div className="flex space-x-2">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    onClick={() => onEdit(fieldDetails)}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
            {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </div>
    )
}
export default FieldBlock;