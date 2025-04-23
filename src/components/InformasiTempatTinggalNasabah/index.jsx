import React, { useState, useRef } from "react";
import { Input, Col, Form, Row, Select, Radio, Button } from "antd";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Address from "../Helper/Addres";
import UploadImg from "../Helper/UploadImg";
import PhotoUploadSection from "../Helper/AddPhoto"


const InformasiTempatTinggalNasabah = () => {

    const [form] = Form.useForm();
    const [alamatDomSesuai, setAlamatDomSesuai] = useState(null);
    // const imageHandler = useRef({});

    // const setImage = (name, file) => {
    //     imageHandler.current[name] = file;
    // };


    const [photoFiles, setPhotoFiles] = useState({});

    const handleFileChange = (info, index) => {
        setPhotoFiles((prev) => ({
            ...prev,
            [index]: info?.file || null,
        }));
    };
    return (
        <Form
            form={form}
            layout="vertical"
        >
            <Row gutter={24}>
                <Address
                    label="Domisili"
                    form={form}
                />
                <Col md={8} xs={24}>
                    <Form.Item
                        label="Alamat domisili sesuai inputan awal?"
                    >
                        <Radio.Group onChange={(e) => setAlamatDomSesuai(e.target.value)}>
                            <Radio value="0">Sesuai</Radio>
                            <Radio value="1">Tidak Sesuai</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                {alamatDomSesuai === "1" && (
                    <Address label="Domisili" form={form} />
                )}
                <Col xs={24} md={8}>
                    <Form.Item label={<span style={{ fontWeight: 'bold' }}>Tempat Penyimpanan Garasi<span style={{ color: 'red' }}>*</span></span>} name='vehicleStorage'>
                        <Select showSearch placeholder='PILIH TEMPAT PENYIMPANAN'></Select>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label={<span style={{ fontWeight: 'bold' }}>Status Kepemilikan Rumah<span style={{ color: 'red' }}>*</span></span>} name='homeOwnershipStatus'>
                        <Select showSearch disabled></Select>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label={<span style={{ fontWeight: 'bold' }}>Jenis Dokumen Bukti Kepemilikan Rumah</span>} name='typesOfDocProvingHomeOwnership'>
                        <Select showSearch placeholder='PILIH JENIS DOKUMEN'></Select>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label={<span style={{ fontWeight: 'bold' }}>Dokumen Kepemilikan Tempat Tinggal (BKR)</span>} name='residentialOwnership'>
                        <UploadImg />
                    </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                    <PhotoUploadSection
                        form={form}
                        titles={['Foto Rumah', 'Foto Rumah 2']}
                        names={['photoHome', 'photoHome2']}
                        maxPhotos={2}
                        onFileChange={
                            handleFileChange
                        }
                    />
                </Col>
                <Col xs={24} md={8}>
                    <PhotoUploadSection
                        titles={['Foto Jalan Depan Rumah', 'Foto Jalan Depan Rumah 2']}
                        names={['photoRoadHome', 'photoRoadHome2']}
                        maxPhotos={2}
                        onFileChange={handleFileChange}
                    />
                </Col>
                <Col xs={24} md={8}>
                    <PhotoUploadSection
                        form={form}
                        titles={['Foto Tempat Usaha', 'Foto Tempat Usaha 2']}
                        names={['photoBusinessPlace', 'photoBusinessPlace2']}
                        maxPhotos={2}
                        onFileChange={handleFileChange}
                    />
                </Col>
                <Col xs={24} md={8}>
                    <PhotoUploadSection
                        form={form}
                        titles={['Foto Jalan Depan Tempat Usaha', 'Foto Jalan Depan Tempat Usaha 2']}
                        names={['photoRoadBusinessPlace', 'photoRoadBusinessPlace2']}
                        maxPhotos={2}
                        onFileChange={handleFileChange}
                    />
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label={<span style={{ fontWeight: 'bold' }}>Jarak Domisili Nasabah ke Muf<span style={{ color: 'red' }}>*</span></span>} name='distanctCustDomicile'>
                        <Input addonAfter={<span style={{ fontWeight: 'bold' }}>KM</span>} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}
export default InformasiTempatTinggalNasabah;