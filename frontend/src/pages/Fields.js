import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FieldForm from '../components/Fields/FieldForm';
import FieldBlock from '../components/Fields/FieldBlock';
function Fields() {
    const { formId } = useParams();
    const [fields, setFields] = useState(null);
    const [fieldToEdit, setFieldToEdit] = useState(null);

    useEffect(() => {
        const fetchFields = async () => {
            const response = await fetch(`http://localhost:4000/api/fields/${formId}`);
            const json = await response.json();
            if (response.ok) {
                setFields(json);
            }
        };
        fetchFields();
    }, [formId]);

    const handleEdit = (field) => {
        setFieldToEdit(field);
    };

    const handleFormSubmit = () => {
        setFieldToEdit(null);
    };


    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-md">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-4xl font-bold text-white text-center">Fields for Form ID: {formId}</h1>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create or Edit Field</h2>
                    <FieldForm formToEdit={fieldToEdit} onFormSubmit={handleFormSubmit} formId={formId} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fields && fields.map((field) => (
                        <FieldBlock key={field.id} fieldDetails={field} onEdit={handleEdit} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Fields;