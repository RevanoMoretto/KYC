import { Button, Input, Col, Form, Row, Select} from "antd";
import React from "react";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";

const InformasiPekerjaanNasabah = ()=>{

    const [form] = Form.useForm();

    return (
        <div>
            <Form
				layout="vertical"
				// onValuesChange={updateOccupation}
				form={form}
			>
                <Row gutter={12}>
                    <Col md={8} xs={24}>
                        <Form.Item label="Pekerjaan Nasabah">
                            <Select
                                disabled={true}
                                suffixIcon={<CaretDownOutlined />}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                        <Form.Item label="Jenis Tempat Bekerja">
                            <Select
                                suffixIcon={<CaretDownOutlined />}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                        <Form.Item label="Nama Tempat Bekerja">
                            <Input readOnly
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col md={8} xs={24}>
                        <Form.Item label="Jabatan Nasabah">
                            <Select
                                suffixIcon={<CaretDownOutlined />}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                        <Form.Item label="Sektor Tempat Bekerja">
                            <Select
                                suffixIcon={<CaretDownOutlined />}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                        <Form.Item label="Sektor Ekonomi">
                            <Select
                                suffixIcon={<CaretDownOutlined />}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col md={8} xs={24}>
                        <Form.Item label="Sektor Ekonomi (Level 2)">
                            <Select
                                suffixIcon={<CaretDownOutlined />}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                        <Form.Item label="Sektor Ekonomi (Level 1)">
                            <Select
                                suffixIcon={<CaretDownOutlined />}
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
                            <Input type="file" name="filename"/>
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                        <Form.Item label="Dokumen Bukti Bekerja (ID Card, Slip Gaji, Suket Kerja/Pengangkatan, dll)">
                            <Input type="file" name="filename"/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
};

export default InformasiPekerjaanNasabah;
