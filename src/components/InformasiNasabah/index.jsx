import {
    Checkbox, Col, Form, Row, Upload, Button,
    Radio, Select, Input,
    DatePicker
} from 'antd';
import { UploadOutlined, EyeOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import style from './style.module.less';

const DebiturFieldsSection = ({ isVisible }) => {
    const { TextArea } = Input;
    if (!isVisible) return null;

    return (
        <>
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Nomor KTP</span>} name='noKtpDebitur'>
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Nama Sesuai KTP <span style={{ color: 'red' }}>*</span></span>} name='nameDebtKtp'>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Tempat Lahir <span style={{ color: 'red' }}>*</span></span>} name='debtPlaceOfBirth'>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Tanggal Lahir <span style={{ color: 'red' }}>*</span></span>} name='debtDateOfBirth'>
                        <DatePicker format='DD-MM-YYYY' placeholder='DD-MM-YYYY' style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>

                <Col xs={24} md={24}>
                    <Form.Item label={<span className={style.label_field}>Alamat KTP <span style={{ color: 'red' }}>*</span></span>} name='debtAddress'>
                        <TextArea
                            showCount
                            maxLength={250}
                            className={style.text_area}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item label={<span className={style.label_field}>Kewarganegaraan <span style={{ color: 'red' }}>*</span></span>} name='debtNationality'>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label={<span className={style.label_field}>RT/RW KTP <span style={{ color: 'red' }}>*</span></span>} name='debtRTRW'>
                        <Row gutter={8} align="middle">
                            <Col xs={11}><Input placeholder="RT" /></Col>
                            <Col xs={1} style={{ textAlign: 'center' }}>/</Col>
                            <Col xs={12}><Input placeholder="RW" /></Col>
                        </Row>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label={<span className={style.label_field}>Kode Pos KTP<span style={{ color: 'red' }}>*</span></span>} name='debtPostalCode'>
                        <Select showSearch placeholder="PILIH KODE POS" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Kelurahan KTP <span style={{ color: 'red' }}>*</span></span>} name='debtSubDistrict'>
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Kecamatan KTP<span style={{ color: 'red' }}>*</span></span>} name='debtDistrict'>
                        <Input disabled />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Kab/Kota KTP <span style={{ color: 'red' }}>*</span></span>} name='debtRegency'>
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Provinsi KTP <span style={{ color: 'red' }}>*</span></span>} name='debtProvince'>
                        <Input disabled />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

const SpouseFieldsSection = ({ isVisible }) => {
    if (!isVisible) return null;
    return (
        <>
            <Row gutter={10}>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Jenis Identitas Pasangan</span>} name='spouseIdentity'>
                        <Select showSearch placeholder='PILIH JENIS IDENTITAS PASANGAN'></Select>
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Nomor Identitas Pasangan<span style={{ color: 'red' }}>*</span></span>} name='noKtpSpouse'>
                        <Input disabled />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Nama Pasangan<span style={{ color: 'red' }}>*</span></span>} name='nameOfSpouse'>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Tempat Lahir Pasangan<span style={{ color: 'red' }}>*</span></span>} name='spousePlaceOfBirth'>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Tanggal Lahir Pasangan<span style={{ color: 'red' }}>*</span></span>} name='spouseDateOfBirth'>
                        <DatePicker format='DD-MM-YYYY' placeholder='DD-MM-YYYY' style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Jenis Kelamin<span style={{ color: 'red' }}>*</span></span>} name='genderOfSpouse'>
                        <Select showSearch placeholder="PILIH JENIS KELAMIN"></Select>
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}

const InformasiNasabah = () => {
    const [form] = Form.useForm();
    const [fileName, setFileName] = useState(null);
    const [menunjukanIdentitasRil, setMenunjukanIdentitasRil] = useState(null);
    const [ktpStatusDoc, setKtpStatusDoc] = useState(null);
    const [suitableMaidenMotherName, setSuitableMaidenMotherName] = useState(null);
    const [isSeparateAsset, setIsSeparateAsset] = useState(null);
    const [isMatchingIdentityPartner, setIsMatchingPartnerIdentityPartner] = useState(null);

    const isDebiturMismatch = ktpStatusDoc === "1";
    const isSpouseMismatch = isSeparateAsset === "1" && isMatchingIdentityPartner === "1";

    const handleChangeFileName = ({ file }) => {
        setFileName(file.status !== 'removed' ? file.name : null);
    };

    const handleColumnSize = () => {
        if (menunjukanIdentitasRil === null && ktpStatusDoc === null) return 12;
        if (menunjukanIdentitasRil === "1" && isDebiturMismatch) return 6;
        if (menunjukanIdentitasRil === "0" && !isDebiturMismatch) return 12;
        return 8;
    };

    const columnSize = handleColumnSize();

    return (
        <Form layout="vertical" form={form}>
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item
                        label={
                            <span className={style.label_field}>
                                Lokasi Proses KYC<span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        name='processLocationKYC'
                    >
                        <Checkbox value='0'>Rumah</Checkbox>
                        <Checkbox value='1'>Tempat Usaha</Checkbox>
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        label={
                            <span className={style.label_field}>
                                Foto Selfie PIC Survey di depan lokasi KYC<span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        name='selfiePICKYC'
                    >
                        <Upload onChange={handleChangeFileName} showUploadList={false}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                            <span className={style.upload_text}>{fileName ? fileName : 'No file chosen'}</span>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={10}>
                <Col xs={24} md={columnSize}>
                    <Form.Item label={<span className={style.label_field}>Dapat Menunjukan identitas asli<span style={{ color: 'red' }}>*</span></span>} name='radioShowRealIdentity'>
                        <Radio.Group onChange={(e) => setMenunjukanIdentitasRil(e.target.value)}>
                            <Radio value="0">Bisa</Radio>
                            <Radio value="1">Tidak Bisa</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                {menunjukanIdentitasRil === "1" && (
                    <Col xs={24} md={columnSize}>
                        <Form.Item label={<span className={style.label_field}>Alasan tidak bisa menunjukan identitas asli</span>} name='reasonCantShowIdentity'>
                            <Select showSearch placeholder="Pilih Alasan" />
                        </Form.Item>
                    </Col>
                )}

                <Col xs={24} md={columnSize}>
                    <Form.Item label={
                        <span className={style.label_field}>
                            Dokumen KTP Nasabah <span style={{ color: 'red' }}>*</span> <EyeOutlined style={{ color: '#1890ff', marginLeft: 8 }} />
                        </span>
                    } name='debtDocKTP'>
                        <Radio.Group onChange={(e) => setKtpStatusDoc(e.target.value)}>
                            <Radio value="0">Sesuai</Radio>
                            <Radio value="1">Tidak Sesuai</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                {isDebiturMismatch && (
                    <Col xs={24} md={columnSize}>
                        <Form.Item label={<span className={style.label_field}>Upload KTP yang sesuai</span>} name='uploadMatchingKtp'>
                            <Upload fileList={[]} onChange={() => setFileName('Selected File')}>
                                <Button icon={<UploadOutlined />}>Select File</Button>
                                <span className={style.upload_text}>{fileName ? fileName : 'No file chosen'}</span>
                            </Upload>
                        </Form.Item>
                    </Col>
                )}
            </Row>

            <DebiturFieldsSection isVisible={isDebiturMismatch} />

            <Row gutter={10}>
                <Col xs={24} md={suitableMaidenMotherName === "1" ? 8 : 12}>
                    <Form.Item
                        label={
                            <span className={style.label_field}>
                                Kartu Keluarga<span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        name="familyCard"
                    >
                        <Upload onChange={handleChangeFileName} showUploadList={false}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                            <span className={style.upload_text}>{fileName || 'No file chosen'}</span>
                        </Upload>
                    </Form.Item>
                </Col>

                <Col xs={24} md={suitableMaidenMotherName === "1" ? 8 : 12}>
                    <Form.Item
                        label={
                            <span className={style.label_field}>
                                Nama Gadis Ibu Kandung
                            </span>
                        }
                        name="nameOfMother"
                    >
                        <Input disabled />
                    </Form.Item>

                    <Radio.Group
                        style={{ padding: '0 0 15px 0' }}
                        onChange={(e) => setSuitableMaidenMotherName(e.target.value)}
                    >
                        <Radio value="0">Sesuai</Radio>
                        <Radio value="1">Tidak Sesuai</Radio>
                    </Radio.Group>
                </Col>

                {suitableMaidenMotherName === "1" && (
                    <Col xs={24} md={8}>
                        <Form.Item
                            label={
                                <span className={style.label_field}>
                                    Nama Gadis Ibu Kandung Yang Sesuai
                                    <span style={{ color: 'red' }}>*</span>
                                </span>
                            }
                            name="matchingMotherName"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                )}
            </Row>
            <Row gutter={10}>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Status Perkawinan</span>} name='maritalStatus'>
                        <Select showSearch disabled />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Dokumen Buku Nikah/Akta Perkawinan/Akta Cerai/Surat Kematian</span>} name='docMarital'>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                            <span className={style.upload_text}>{fileName || 'No file chosen'}</span>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col xs={24} md={12}>
                    <Form.Item
                        label={
                            <span className={style.label_field}>
                                Ada/Tidak Dokumen Akta Perjanjian Pisah Harta <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        name='availOfDocSeparateProperty'
                    >
                        <Radio.Group onChange={(e) => setIsSeparateAsset(e.target.value)} value={isSeparateAsset}>
                            <Radio value="0">Ya</Radio>
                            <Radio value="1">Tidak</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item
                        label={
                            <span className={style.label_field}>
                                Dokumen Akta Perjanjian Pisah Harta <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        name="docSeparateAssets"
                    >
                        <Upload disabled={isSeparateAsset === "1"}>
                            <Button icon={<UploadOutlined />} style={{
                                cursor: isSeparateAsset === "1" ? 'not-allowed' : 'pointer',
                                backgroundColor: isSeparateAsset === "1" ? '#f5f5f5' : undefined,
                                color: isSeparateAsset === "1" ? '#999' : undefined,
                                borderColor: isSeparateAsset === "1" ? '#d9d9d9' : undefined,
                            }}>Select File</Button>
                            <span className={style.upload_text}>{fileName || 'No file chosen'}</span>
                        </Upload>
                    </Form.Item>
                </Col>

                {isSeparateAsset === "1" && (
                    <Col xs={24} md={12}>
                        <Form.Item
                            label={
                                <span className={style.label_field}>
                                    Dokumen Identitas Pasangan <span style={{ color: 'red' }}>*</span>
                                </span>
                            }
                            name="partnerIdentityDoc"
                        >
                            <Radio.Group onChange={(e) => setIsMatchingPartnerIdentityPartner(e.target.value)}>
                                <Radio value="0">Sesuai</Radio>
                                <Radio value="1">Tidak Sesuai</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                )}
                {isSeparateAsset === "1" && isMatchingIdentityPartner === "1" && (
                    <Col xs={24} md={12}>
                        <Form.Item label={<span className={style.label_field}>Upload Dokumen Identitas yang sesuai <span style={{ color: 'red' }}>*</span></span>} name='uploadDocMatchingIdentity'>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                            <span className={style.upload_text}>{fileName || 'No file chosen'}</span>
                        </Form.Item>
                    </Col>
                )}
            </Row>
            <SpouseFieldsSection isVisible={isSpouseMismatch} />
            <Row gutter={10}>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Foto Wajah Debitur <span style={{ color: 'red' }}>*</span></span>} name='debiturSelfie'>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                            <span className={style.upload_text}>{fileName || 'No file chosen'}</span>
                        </Upload>
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item label={<span className={style.label_field}>Dokumen FAPP <span style={{ color: 'red' }}>*</span></span>} name='fappDoc'>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                            <span className={style.upload_text}>{fileName || 'No file chosen'}</span>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
        </Form >
    );
};

export default InformasiNasabah;
