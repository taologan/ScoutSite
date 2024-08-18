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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Form Name:</label>
                <input
                    className="outline"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    className="outline"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button className="outline" type="submit">
                {formToEdit ? "Update Scouting Form" : "Create Scouting Form"}
            </button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default ScoutingFormForm;