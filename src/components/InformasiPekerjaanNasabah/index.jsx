import { Button, Input, Col, Form, Row, Select} from "antd";
import React from "react";
import {SearchOutlined } from "@ant-design/icons";
import UploadImg from "../Helper/UploadImg";
import classes from './style.module.less';

const InformasiPekerjaanNasabah = ()=>{

    const optionDummy = [
        {label:"Copet", value:"Copet"},
        {label:"Begal", value:"Begal"},
        {label:"Pemuda Pancasila", value:"Pemuda Pancasila"},
        {label:"Ngepet", value:"Ngepet"},
    ]

    const handleChangePekerjaanNasabah = (e) => {
        console.log("test option pekerjaan nasabah: ", e)
    }

    const [form] = Form.useForm();

    return (
        <Form
            layout="vertical"
            // onValuesChange={updateOccupation}
            form={form}
        >
            <Row gutter={12}>
                <Col md={8} xs={24}>
                    <Form.Item label="Pekerjaan Nasabah">
                        <Select
                            placeholder="PILIH PEKERJAAN NASABAH"
                            onChange={handleChangePekerjaanNasabah}
                            options={optionDummy}
                            // suffixIcon={<CaretDownOutlined />}
                        />
                    </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                    <Form.Item label="Jenis Tempat Bekerja">
                        <Select
                            // suffixIcon={<CaretDownOutlined />}
                            disabled={true}
                        />
                    </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                    <Form.Item 
                        label="Nama Tempat Bekerja"
                        name="nama_tempat_kerja_nas"
                    >
                        <Input 
                            readOnly
                            className={classes.readonly_input_field}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={12}>
                <Col md={8} xs={24}>
                    <Form.Item label="Jabatan Nasabah">
                        <Select
                            // suffixIcon={<CaretDownOutlined />}
                        />
                    </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                    <Form.Item label="Sektor Tempat Bekerja">
                        <Select
                        />
                    </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                    <Form.Item label="Sektor Ekonomi">
                        <Select
                            suffixIcon={<SearchOutlined />}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={12}>
                <Col md={8} xs={24}>
                    <Form.Item label="Sektor Ekonomi (Level 2)">
                        <Select
                            // suffixIcon={<CaretDownOutlined />}
                        />
                    </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                    <Form.Item label="Sektor Ekonomi (Level 1)">
                        <Select
                            // suffixIcon={<CaretDownOutlined />}
                        />
                    </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                    <Form.Item label="Jarak Tempat Bekerja Nasabah ke MUF">
                        <Input suffix={<Button padding={0}>KM</Button>}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={12}>
                <Col md={8} xs={24}>
                    <Form.Item label="Dokumen Bukti Bekerja (ID Card, Slip Gaji, Suket Kerja/Pengangkatan, dll)">
                        <UploadImg/>
                    </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                    <Form.Item label="Dokumen Bukti Bekerja (ID Card, Slip Gaji, Suket Kerja/Pengangkatan, dll)">
                        <UploadImg/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
};

export default InformasiPekerjaanNasabah;
