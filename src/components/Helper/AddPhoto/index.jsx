import React, { useState } from 'react';
import { Form, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import UploadImg from '../UploadImg';


const PhotoUploadSection = ({
    title1,
    name1,
    title2,
    name2,
    onFileChange,
    form
}) => {
    const [visibleSecondPhoto, setVisibleSecondPhoto] = useState(false);
    const [files, setFiles] = useState({ first: null, second: null });

    const handleAddFile = () => setVisibleSecondPhoto(true);

    const handleRemoveFile = () => {
        // Reset form value if using AntD form
        form?.setFieldsValue({ [name2]: undefined });

        // Reset file state
        setFiles((prev) => ({ ...prev, second: null }));
        setVisibleSecondPhoto(false);

        // Notify parent
        onFileChange?.({ file: null }, 'second');
    };

    // const handleUploadChange = (info, type) => {
    //     const newFiles = { ...files, [type]: info.file };
    //     setFiles(newFiles);
    //     onFileChange?.(info, type);
    // };

    const handleUploadChange = (info, field) => {
        const newFiles = { ...files, [field]: info.file };
        setFiles(newFiles);
        onFileChange?.(info, field);
    };


    return (
        <>
            <Form.Item label={<span style={{ fontWeight: 'bold' }}>{title1}</span>} name={name1}>
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
            </div>
        </>
    );
};

export default PhotoUploadSection;
