import React from 'react';

const DataBlock = ({ data }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Scouting Data</h2>
            {/*<p className="text-gray-600 mb-2">Event ID: {data.event_id}</p>*/}
            {/*<p className="text-gray-600 mb-2">Team ID: {data.team_id}</p>*/}
            {/*<p className="text-gray-600 mb-4">Scouting Form ID: {data.scouting_form_id}</p>*/}
            <p className="text-gray-600 mb-4">Team Number: {data.team_number}</p>
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Form Data:</h3>
                {Object.entries(data.data).map(([key, value]) => (
                    <p key={key} className="text-gray-600">
                        <span className="font-medium">{key}:</span> {value}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default DataBlock;