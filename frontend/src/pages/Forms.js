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
        <div className="ScoutingForms">
            <h1>SCOUTING FORMS</h1>
            <FormForm formToEdit={formToEdit} onFormSubmit={handleFormSubmit} />
            {scoutingForms && scoutingForms.map((form) => (
                <FormBlock key={form.id} formDetails={form} onEdit={handleEdit} />
            ))}
        </div>
    );
};

export default ScoutingForms;