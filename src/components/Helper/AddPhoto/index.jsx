import React, { useState } from 'react';
import { Form, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import UploadImg from '../UploadImg';


const PhotoUploadSection = ({
    // titles = [],
    names = [],
    onFileChange,
    form,
    maxPhotos = 2
}) => {
    const [visibleCount, setVisibleCount] = useState(0);
    const [files, setFiles] = useState({ first: null, second: null });
    const maxPhotosMin1 = maxPhotos-1;

    const handleAddFile = () => {
        if (visibleCount < maxPhotosMin1) {
            setVisibleCount((prev) => prev + 1);
        }
    }

    const handleRemoveFile = (index) => {
        const lastIndex = visibleCount - 1;
        const fieldName = names[lastIndex];
        form?.setFieldsValue({ [fieldName]: undefined });

        // Reset file state
        setFiles((prev) => {
            const newFiles = { ...prev };
            delete newFiles[index];
            return newFiles;
        });

        onFileChange?.({ file: null }, index);

        setVisibleCount((prev) => prev - 1);
    };

    const handleUploadChange = (info, index) => {
        const name = names[index];
        const newFiles = { ...files, [name]: info.file };
        setFiles(newFiles);
        onFileChange?.(info, name);
    };


    return (
        <>
            {Array.from({ length: visibleCount }).map((_, index) => (
                // <Form.Item
                //     key={index}
                //     label={<span style={{ fontWeight: 'bold' }}>{titles[index]}</span>}
                //     name={names[index]}
                // >
                <div style={{ marginTop:8}}>
                    <UploadImg 
                        name={names[index]}
                        onChange={(info) => handleUploadChange(info, index)} />
                </div>
                // </Form.Item>
            ))}

            <div style={{ display: 'flex', gap: '8px', marginTop: 8 }}>
                {visibleCount < maxPhotosMin1 && (
                    <Button
                        onClick={handleAddFile}
                        icon={<PlusOutlined />}
                        style={{ border: 'none' }}
                    >
                        Add Photo
                    </Button>
                )}
                {visibleCount > 0 && (
                    <Button
                        danger
                        icon={<MinusOutlined />}
                        onClick={handleRemoveFile}
                    >
                        Delete Photo
                    </Button>
                )}
            </div>
        </>
    );
};

export default PhotoUploadSection;
