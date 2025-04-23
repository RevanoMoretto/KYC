import React, { useState, useRef } from "react";
import { Input, Col, Form, Row, Select, Radio, Button } from "antd";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import Address from "../Helper/Addres";
import UploadImg from "../Helper/UploadImg";
import PhotoUploadSection from "../Helper/AddPhoto"


const InformasiTempatTinggalNasabah = () => {

    const [form] = Form.useForm();
    const [alamatDomSesuai, setAlamatDomSesuai] = useState(null);
    const imageHandler = useRef({});

    const setImage = (name, file) => {
        imageHandler.current[name] = file;
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
                // onChange={setFormAlamat}
                // onChangeDirect={submitAddressInfo}
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
                {/* <Col xs={24} md={8}>
                        <Form.Item label={<span style={{ fontWeight: 'bold' }}>Foto Rumah</span>} name="photoHome1" >
                            <UploadImg />
                        </Form.Item>

                        {visibleFoto2 && (
                            <Form.Item label="Foto Rumah 2" name="photoHome2">
                                <UploadImg />
                            </Form.Item>
                        )}

                        <div style={{ marginTop: 10 }}>
                            {!visibleFoto2 && (
                                <Button onClick={handleAddFile} icon={<PlusOutlined />} style={{ border: 'none' }}>
                                    Add Photo
                                </Button>
                            )}
                            {visibleFoto2 && (
                                <Button onClick={handleRemoveFile} danger icon={<MinusOutlined />}>
                                    Delete Photo
                                </Button>
                            )}
                        </div>
                    </Col> */}
                <Col xs={24} md={8}>
                    <PhotoUploadSection
                        form={form}
                        title1="Foto Rumah"
                        name1="photoHome"
                        title2="Foto Rumah 2"
                        name2="photoHome2"
                        onFileChange={(info, field) => {
                            const fieldName = field === 'first' ? 'photoHome' : 'photoHome2';
                            setImage(fieldName, info?.file || null);
                        }}
                    />
                </Col>
                {/* <Col xs={24} md={8}>
                        <Form.Item label={<span style={{ fontWeight: 'bold' }}>Foto Jalan Depan Rumah</span>} name="photoRoadHome" >
                            <UploadImg />
                        </Form.Item>

                        {visibleFoto2 && (
                            <Form.Item label={<span style={{ fontWeight: 'bold' }}>Foto Jalan Depan Rumah</span>} name="photoRoadHome2">
                                <UploadImg />
                            </Form.Item>
                        )}

                        <div style={{ marginTop: 10 }}>
                            {!visibleFoto2 && (
                                <Button onClick={handleAddFile} icon={<PlusOutlined />} style={{ border: 'none' }}>
                                    Add Photo
                                </Button>
                            )}
                            {visibleFoto2 && (
                                <Button onClick={handleRemoveFile} danger icon={<MinusOutlined />}>
                                    Delete Photo
                                </Button>
                            )}
                        </div>
                    </Col> */}
                <Col xs={24} md={8}>
                    <PhotoUploadSection
                        form={form}
                        title1="Foto Jalan Depan Rumah"
                        name1="photoRoadHome"
                        title2="Foto Jalan Depan Rumah 2"
                        name2="photoRoadHome2"
                        onFileChange={(info, field) => {
                            const fieldName = field === 'first' ? 'photoRoadHome' : 'photoRoadHome2';
                            setImage(fieldName, info?.file || null);
                        }}
                    />
                </Col>
                <Col xs={24} md={8}>
                    <PhotoUploadSection
                        form={form}
                        title1="Foto Tempat Usaha"
                        name1="photoBusinessPlace"
                        title2="Foto Tempat Usaha"
                        name2="photoBusinessPlace2"
                        onFileChange={(info, field) => {
                            const fieldName = field === 'first' ? 'photoBusinessPlace' : 'photoBusinessPlace2';
                            setImage(fieldName, info?.file || null);
                        }}
                    />
                </Col>
                <Col xs={24} md={8}>
                    <PhotoUploadSection
                        form={form}
                        title1="Foto Jalan Depan Tempat Usaha"
                        name1="photoRoadBusinessPlace"
                        title2="Foto Jalan Depan Tempat Usaha 2"
                        name2="photoRoadBusinessPlace2"
                        onFileChange={(info, field) => {
                            const fieldName = field === 'first' ? 'photoRoadBusinessPlace' : 'photoRoadBusinessPlace2';
                            setImage(fieldName, info?.file || null);
                        }}
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