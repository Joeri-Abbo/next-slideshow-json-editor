import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

// Import Quill dynamically so it's only loaded on the client-side
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function Home() {
    const [jsonDataInput, setJsonDataInput] = useState('');
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        // Update jsonDataInput whenever jsonData changes
        setJsonDataInput(JSON.stringify(jsonData, null, 2));
    }, [jsonData]);

    const handleJsonInputChange = (event) => {
        setJsonDataInput(event.target.value);
    };

    const handleJsonSubmit = () => {
        try {
            const parsedData = JSON.parse(jsonDataInput);
            setJsonData(parsedData);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    const handleAddRow = () => {
        const newRow = {
            title: '',
            background_image: '',
            image_left: '',
            image_right: '',
            text_left: '',
            text_right: ''
        };
        setJsonData([...jsonData, newRow]);
    };

    const handleChange = (index, field, value) => {
        const newData = [...jsonData];
        newData[index][field] = value;
        setJsonData(newData);
    };

    return (
        <div>
            <textarea
                value={jsonDataInput}
                onChange={handleJsonInputChange}
                onBlur={handleJsonSubmit} // Submit JSON data when textarea loses focus
                placeholder="Enter JSON data here"
                style={{ width: '100%', height: '100px' }}
            />
            <button onClick={handleJsonSubmit}>Submit JSON Data</button>
            <button onClick={handleAddRow}>Add New Row</button>

            {jsonData.map((item, index) => (
                <div key={index} style={{ border: 'solid 1px', marginTop: '10px' }}>
                    <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => handleChange(index, 'title', e.target.value)}
                    />
                    <input
                        type="text"
                        value={item.background_image || ''}
                        onChange={(e) => handleChange(index, 'background_image', e.target.value)}
                    />
                    <input
                        type="text"
                        value={item.image_left || ''}
                        onChange={(e) => handleChange(index, 'image_left', e.target.value)}
                    />
                    <input
                        type="text"
                        value={item.image_right || ''}
                        onChange={(e) => handleChange(index, 'image_right', e.target.value)}
                    />

                    <ReactQuill
                        theme="snow"
                        value={item.text_left || ''}
                        onChange={(value) => handleChange(index, 'text_left', value)}
                    />
                    <ReactQuill
                        theme="snow"
                        value={item.text_right || ''}
                        onChange={(value) => handleChange(index, 'text_right', value)}
                    />
                </div>
            ))}
        </div>
    );
}
