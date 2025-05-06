import { Button, Input, Col, Form, Row, Select } from "antd";
import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import UploadImg from "../Helper/UploadImg";
import classes from './style.module.less';
import PhotoUploadSection from "../Helper/AddPhoto";
import Storage from '../../utils/storage';


const InformasiPekerjaanNasabah = () => {

    // const optionDummy = [
    //     { label: "Copet", value: "Copet" },
    //     { label: "Begal", value: "Begal" },
    //     { label: "Pemuda Pancasila", value: "Pemuda Pancasila" },
    //     { label: "Ngepet", value: "Ngepet" },
    // ]

    // const handleChangePekerjaanNasabah = (e) => {
    //     console.log("test option pekerjaan nasabah: ", e)
    // }
    const dataKyc = new Storage("kyc_detail").value;
    const occupation = dataKyc?.detail?.debitur?.personal?.occupation || {};

    const {debitur, occupation_type_code, occupation_type_desc} = occupation || {}

    const [form] = Form.useForm();
    const [photoFiles, setPhotoFiles] = useState({});

    const handleFileChange = (info, index) => {
        setPhotoFiles((prev) => ({
            ...prev,
            [index]: info?.file || null,
        }));
    };

    useEffect(() => {
		form.setFieldsValue(debitur);
	}, [debitur, form]);

    return (
        <Form
            form={form}
            layout="vertical"
            // onValuesChange={updateOccupation}
            initialValues={debitur}
        >
            <Row gutter={12}>
                <Col md={8} xs={24}>
                    <Form.Item 
                        label="Pekerjaan Nasabah"
                        name="debitur_occupation_desc"
                    >
                        <Select
                            placeholder="PILIH PEKERJAAN NASABAH"
                            // onChange={handleChangePekerjaanNasabah}
                            // options={optionDummy}
                        // suffixIcon={<CaretDownOutlined />}
                        />
                    </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                    <Form.Item 
                        /* occupation_type_code 01 == non wira */
                        label={ occupation_type_code == "02"
									? "Jenis Tempat Usaha"
									: "Jenis Tempat Bekerja"}
                        name="debitur_company_type_desc"
                    >
                        <Select
                            disabled={true}
                        />
                    </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                    <Form.Item
                        label={ occupation_type_code == "02"?
                            "Nama Tempat Usaha"
                            : "Nama Tempat Bekerja"}
                        name="debitur_name_of_workplace"
                    >
                        <Input
                            readOnly
                            className={classes.readonly_input_field}
                        />
                    </Form.Item>
                </Col>
                {occupation_type_code == "01"? (
                <Col md={8} xs={24}>
                    <Form.Item 
                        label="Jabatan Nasabah"
                        name="debitur_position_desc"
                    >
                        <Select
                        // suffixIcon={<CaretDownOutlined />}
                        />
                    </Form.Item>
                </Col>
                ) : (
                <Col md={8} xs={24}>
                    <Form.Item 
                        label="Bidang Usaha" 
                        name="debitur_work_fields_desc"
                    >
                        <Input readOnly />
					</Form.Item>
                </Col>
                )}
               {dataKyc?.flag_order_type === "D" && (
                <>
                {occupation_type_code === "01" ? (
                    <Col md={8} xs={24}>
                    <Form.Item 
                        label="Sektor Tempat Bekerja"
                        name="debitur_sector_bekerja"
                    >
                        <Select />
                    </Form.Item>
                    </Col>
                ) : (
                    <Col md={8} xs={24}>
                    <Form.Item 
                        label="Sektor Tempat Usaha"
                        name="debitur_sector_usaha"
                    >
                        <Select />
                    </Form.Item>
                    </Col>
                )}
                <Col md={8} xs={24}>
                    <Form.Item 
                    label="Sektor Ekonomi"
                    name="debitur_economic_sector_three_desc"
                    >
                    <Select disabled={true} />
                    </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                    <Form.Item 
                        label="Sektor Ekonomi (Level 2)"
                        name="debitur_economic_sector_two_desc"
                    >
                        <Select
                            disabled={true}
                        />
                    </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                    <Form.Item 
                        label="Sektor Ekonomi (Level 1)"
                        name="debitur_economic_sector_one_desc"
                    >
                        <Select
                            disabled={true}
                        />
                    </Form.Item>
                </Col>
                    </>
                )}
                <Col md={8} xs={24}>
                    <Form.Item 
                        label="Jarak Tempat Bekerja Nasabah ke MUF"
                        name=""
                    >
                        {/* <Input suffix={<Button padding={0}>KM</Button>} /> */}
                        <Input addonAfter={<span style={{ fontWeight: 'bold' }}>KM</span>} />
                    </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                    <Form.Item label='Dokumen Bukti Bekerja (ID Card, Slip Gaji, Suket Kerja/Pengangkatan, dll)'>
                        <UploadImg/>
                        <PhotoUploadSection
                            form={form}
                            // titles={['Dokumen Bukti Bekerja (ID Card, Slip Gaji, Suket Kerja/Pengangkatan, dll)','Dokumen Bukti Bekerja (ID Card, Slip Gaji, Suket Kerja/Pengangkatan, dll) 2']}
                            names={['docWork', 'docWork2']}
                            maxPhotos={2}
                            onFileChange={
                                handleFileChange
                            }
                        />
                    </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                    <Form.Item label='Dokumen Bukti Penghasilan/Keuangan (Rek Tab/Koran)'>
                        <UploadImg />
                        <PhotoUploadSection
                            form={form}
                            // titles={['Dokumen Bukti Penghasilan/Keuangan (Rek Tab/Koran)', '', '', '', '']}
                            names={['docPacheck', 'docPacheck2', 'docPacheck3', 'docPacheck4', 'docPacheck5']}
                            maxPhotos={6}
                            onFileChange={
                                handleFileChange
                            }
                        />
                    </Form.Item>
                </Col>
                {occupation_type_code == "02" &&(
                <Col md={8} xs={24}>
                      <Form.Item label='Foto Selfie PIC Survey di Tempat Usaha'>
                        <UploadImg />
                      </Form.Item>
                </Col>
                )}
            </Row>
        </Form>
    )
};

export default InformasiPekerjaanNasabah;
