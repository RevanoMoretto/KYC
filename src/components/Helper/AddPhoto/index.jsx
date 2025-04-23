import React, { useState } from 'react';
import { Form, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import UploadImg from '../UploadImg';


const PhotoUploadSection = ({
    titles = [],
    names = [],
    onFileChange,
    form,
    maxPhotos = 2
}) => {
    const [visibleCount, setVisibleCount] = useState(1);
    const [files, setFiles] = useState({ first: null, second: null });

    const handleAddFile = () => {
        if (visibleCount < maxPhotos) {
            setVisibleCount((prev) => prev + 1);
        }
    }

    const handleRemoveFile = (index) => {
        const fieldName = names[index];
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
            {/* <Form.Item label={<span style={{ fontWeight: 'bold' }}>{title1}</span>} name={name1}>
                <UploadImg onChange={(info) => handleUploadChange(info, 'first')} />
            </Form.Item>

            {visibleSecondPhoto && (
                <Form.Item label={title2} name={name2}>
                    <UploadImg onChange={(info) => handleUploadChange(info, 'second')} />
                </Form.Item>
            )}

            <div style={{ marginTop: 10 }}>
                {!visibleSecondPhoto ? (
                    <Button onClick={handleAddFile} icon={<PlusOutlined />} style={{ border: 'none' }}>
                        Add Photo
                    </Button>
                ) : (
                    <Button onClick={handleRemoveFile} danger icon={<MinusOutlined />}>
                        Delete Photo
                    </Button>
                )}
            </div> */}
            {Array.from({ length: visibleCount }).map((_, index) => (
                <Form.Item
                    key={index}
                    label={<span style={{ fontWeight: 'bold' }}>{titles[index]}</span>}
                    name={names[index]}
                // style={{ marginTop: '10px' }}
                >
                    <UploadImg onChange={(info) => handleUploadChange(info, index)} />
                    {index > 0 && (
                        <Button
                            danger
                            icon={<MinusOutlined />}
                            onClick={() => handleRemoveFile(index)}
                            style={{ marginTop: 8 }}
                        >
                            Delete Photo
                        </Button>
                    )}
                </Form.Item>
            ))}

            {visibleCount < maxPhotos && (
                <Button
                    onClick={handleAddFile}
                    icon={<PlusOutlined />}
                    style={{ marginBottom: '8px', border: 'none' }}
                >
                    Add Photo
                </Button>
            )}
        </>
    );
};

export default PhotoUploadSection;
