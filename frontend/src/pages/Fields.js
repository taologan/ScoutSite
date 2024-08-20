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
        <div className="Fields">
            <h1>Fields for Form ID: {formId}</h1>
            <FieldForm formToEdit={fieldToEdit} onFormSubmit={handleFormSubmit} formId={formId} />
            {fields && fields.map((field) => (
                // <div key={field.id} className="field-block">
                //     <h2>{field.field_label}</h2>
                //     <p>Type: {field.field_type}</p>
                //     <p>Required: {field.required ? 'Yes' : 'No'}</p>
                //     <p>Display Order: {field.display_order}</p>
                //     <button onClick={() => handleEdit(field)}>Edit</button>
                // </div>
                <FieldBlock fieldDetails = {field} onEdit = {handleEdit}></FieldBlock>
            ))}
        </div>
    );
}

export default Fields;