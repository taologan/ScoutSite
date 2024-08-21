import { useState, useEffect } from "react";

const ScoutingFormForm = ({ formToEdit, onFormSubmit }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (formToEdit) {
            setName(formToEdit.name);
            setDescription(formToEdit.description);
        }
    }, [formToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = { name, description };

        const response = await fetch(formToEdit ? `http://localhost:4000/api/forms/${formToEdit.id}` : "http://localhost:4000/api/forms", {
            method: formToEdit ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const json = await response.json();
        if (response.ok) {
            console.log(formToEdit ? "Scouting form updated successfully" : "Scouting form created successfully");
            setName("");
            setDescription("");
            onFormSubmit();
        } else {
            setError(json.error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Form Name:</label>
                <input
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                <textarea
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                type="submit"
            >
                {formToEdit ? "Update Scouting Form" : "Create Scouting Form"}
            </button>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </form>
    );
};

export default ScoutingFormForm;