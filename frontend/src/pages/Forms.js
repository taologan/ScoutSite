import { useEffect, useState } from "react";
import FormForm from "../components/Forms/FormForm";
import FormBlock from "../components/Forms/FormBlock";

const ScoutingForms = () => {
    const [scoutingForms, setScoutingForms] = useState(null);
    const [formToEdit, setFormToEdit] = useState(null);

    useEffect(() => {
        const fetchScoutingForms = async () => {
            const response = await fetch("http://localhost:4000/api/forms");
            const json = await response.json();
            if (response.ok) {
                setScoutingForms(json);
            }
        };
        fetchScoutingForms();
    }, []);

    const handleEdit = (form) => {
        setFormToEdit(form);
    };

    const handleFormSubmit = () => {
        setFormToEdit(null);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-md">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-4xl font-bold text-white text-center">Scouting Forms</h1>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create or Edit Scouting Form</h2>
                    <FormForm formToEdit={formToEdit} onFormSubmit={handleFormSubmit} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scoutingForms && scoutingForms.map((form) => (
                        <FormBlock key={form.id} formDetails={form} onEdit={handleEdit} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScoutingForms;