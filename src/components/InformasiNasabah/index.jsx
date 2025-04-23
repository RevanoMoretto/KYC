import {
    Checkbox, Col, Form, Row, Upload, Button,
    Radio, Select, Input,
    DatePicker, Image, Spin, Modal
} from 'antd';
import { UploadOutlined, EyeOutlined } from '@ant-design/icons';
import { MdOutlineFileUpload } from "react-icons/md";
import React, { useState } from 'react';
import style from './style.module.less';
import UploadImg from '../Helper/UploadImg';



const InformasiNasabah = () => {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [fileName, setFileName] = useState("")
    const [menunjukanIdentitasRil, setMenunjukanIdentitasRil] = useState(null);
    const [ktpStatusDoc, setKtpStatusDoc] = useState(null);
    const [suitableMaidenMotherName, setSuitableMaidenMotherName] = useState(null);
    const [isSeparateAsset, setIsSeparateAsset] = useState(null);
    const [isMatchingIdentityPartner, setIsMatchingPartnerIdentityPartner] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');
    const isDebiturMismatch = ktpStatusDoc === "1";
    const isSpouseMismatch = isSeparateAsset === "1" && isMatchingIdentityPartner === "1";

    const handleViewImage = () => {
        setPreviewVisible(true);
        setImageLoaded(false);
        setPreviewUrl('');
    };
    return (
        <Form layout="vertical" form={form}>
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label={
                            <span className={style.label_field}>
                                Lokasi Proses KYC<span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        name='processLocationKYC'
                        rules={[
                            {
                                validator: (_, value) =>
                                    value && value.length > 0
                                        ? Promise.resolve()
                                        : Promise.reject(new Error('Lokasi Proses KYC Wajib Diisi')),
                            },
                        ]}
                    >
                        <Checkbox.Group>
                            <Checkbox value='0'>Rumah</Checkbox>
                            <Checkbox value='1'>Tempat Usaha</Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label={
                            <span className={style.label_field}>
                                Foto Selfie PIC Survey di depan lokasi KYC<span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        name='selfiePICKYCNonWira'
                        rules={[{ required: true, message: 'Foto selfie dengan PIC wajib diisi' }]}
                    >
                        <UploadImg />
                    </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                    <Form.Item label={<span className={style.label_field}>Dapat Menunjukan identitas asli<span style={{ color: 'red' }}>*</span></span>} name='radioShowRealIdentityNonWira' rules={[{ required: true, message: 'Kolom Dapat Menunjukkan Identitas Wajib Diisi', min: 1 }]}>
                        <Radio.Group onChange={(e) => setMenunjukanIdentitasRil(e.target.value)}>
                            <Radio value="0">Bisa</Radio>
                            <Radio value="1">Tidak Bisa</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                {menunjukanIdentitasRil === "1" && (
                    <Col xs={24} md={8}>
                        <Form.Item label={<span className={style.label_field}>Alasan tidak bisa menunjukan identitas asli</span>} name='reasonCantShowIdentityNonWira' rules={[{ required: true, message: 'Kolom Alasan Tidak Dapat Menunjukkan Identitas Wajib Diisi' }]}>
                            <Select showSearch placeholder="Pilih Alasan" />
                        </Form.Item>
                    </Col>
                )}

                <Col xs={24} md={8}>
                    <Form.Item label={
                        <span className={style.label_field}>
                            Dokumen KTP Nasabah <span style={{ color: 'red' }}>*</span> <EyeOutlined onClick={handleViewImage} style={{ color: '#1890ff', marginLeft: 8 }} />
                        </span>
                    } name='debtDocKTPNonWira' rules={[{ min: 1 }]}>
                        <Radio.Group onChange={(e) => setKtpStatusDoc(e.target.value)}>
                            <Radio value="0">Sesuai</Radio>
                            <Radio value="1">Tidak Sesuai</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                <Modal
                    open={previewVisible}
                    footer={null}
                    onCancel={() => setPreviewVisible(false)}
                    title="Document Preview"
                    maskClosable={false}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '15px',
                        }}
                    >
                        {!imageLoaded ? (
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '15px',
                                    textAlign: 'center',
                                }}
                            >
                                <Spin />
                                <span>Mohon tunggu...</span>
                            </div>
                        ) : null}

                        <Image
                            width={200}
                            style={{ display: imageLoaded ? 'block' : 'none' }}
                            src={previewUrl}
                            alt="preview"
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                </Modal>

                {isDebiturMismatch && (
                    <>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Upload KTP yang sesuai</span>} name='uploadMatchingKtpNonWira'>
                                <UploadImg />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Nomor KTP</span>} name='noKtpDebiturNonWira'>
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Nama Sesuai KTP <span style={{ color: 'red' }}>*</span></span>} name='nameDebtKtpNonWira'>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Tempat Lahir <span style={{ color: 'red' }}>*</span></span>} name='debtPlaceOfBirthNonWira'>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Tanggal Lahir <span style={{ color: 'red' }}>*</span></span>} name='debtDateOfBirthNonWira'>
                                <DatePicker format='DD-MM-YYYY' placeholder='DD-MM-YYYY' style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Jenis Kelamin<span style={{ color: 'red' }}>*</span></span>} name='genderOfSpouseNonWira' rules={[{ min: 1 }]}>
                                <Radio.Group>
                                    <Radio value="L">Laki-Laki</Radio>
                                    <Radio value="P">Perempuan</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Kewarganegaraan <span style={{ color: 'red' }}>*</span></span>} name='debtNationalityNonWira'>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Alamat KTP <span style={{ color: 'red' }}>*</span></span>} name='debtAddressNonWira'>
                                <TextArea
                                    showCount
                                    maxLength={50}
                                    className={style.text_area}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>RT/RW KTP <span style={{ color: 'red' }}>*</span></span>} name='debtRTRWNonWira'>
                                <Row gutter={8} align="middle">
                                    <Col xs={12}><Input placeholder="RT" /></Col>
                                    {/* <Col xs={1} style={{ textAlign: 'center' }}>/</Col> */}
                                    <Col xs={12}><Input placeholder="RW" /></Col>
                                </Row>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Kode Pos KTP<span style={{ color: 'red' }}>*</span></span>} name='debtPostalCodeNonWira'>
                                <Select showSearch placeholder="PILIH KODE POS" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Kelurahan KTP <span style={{ color: 'red' }}>*</span></span>} name='debtSubDistrictNonWira'>
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Kecamatan KTP<span style={{ color: 'red' }}>*</span></span>} name='debtDistrictNonWira'>
                                <Input disabled />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Kab/Kota KTP <span style={{ color: 'red' }}>*</span></span>} name='debtRegencyNonWira'>
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Provinsi KTP <span style={{ color: 'red' }}>*</span></span>} name='debtProvinceNonWira'>
                                <Input disabled />
                            </Form.Item>
                        </Col>
                    </>
                )}
                <Col xs={24} md={8}>
                    <Form.Item
                        label={
                            <span className={style.label_field}>
                                Kartu Keluarga<span style={{ color: 'red' }}>*</span>
                                <EyeOutlined onClick={handleViewImage} style={{ color: '#1890ff', marginLeft: 8 }} />
                            </span>
                        }
                        name="familyCardNonWira"
                    >
                        <UploadImg />
                    </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                    <Form.Item
                        label={
                            <span className={style.label_field}>
                                Nama Gadis Ibu Kandung
                            </span>
                        }
                        name="nameOfMotherNonWira"
                        rules={[{ min: 1 }]}
                    >
                        <Input disabled />
                        <Radio.Group
                            style={{ padding: '0 0 15px 0' }}
                            onChange={(e) => setSuitableMaidenMotherName(e.target.value)}

                        >
                            <Radio value="0">Sesuai</Radio>
                            <Radio value="1">Tidak Sesuai</Radio>
                        </Radio.Group>
                    </Form.Item>

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
                            name="matchingMotherNameNonWira"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                )}
                <Col xs={24} md={8}>
                    <Form.Item label={<span className={style.label_field}>Status Perkawinan</span>} name='maritalStatusNonWira'>
                        <Select showSearch disabled />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label={<span className={style.label_field} style={{ fontSize: '11px', fontWeight: 'bold' }}>Dokumen Buku Nikah/Akta Perkawinan/Akta Cerai/Surat Kematian</span>} name='docMaritalNonWira'>
                        <UploadImg />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label={
                            <span className={style.label_field}>
                                Ada/Tidak Dokumen Akta Perjanjian Pisah Harta <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        name='availOfDocSeparatePropertyNonWira'
                        rules={[{ min: 1 }]}
                    >
                        <Radio.Group onChange={(e) => setIsSeparateAsset(e.target.value)} value={isSeparateAsset}>
                            <Radio value="0">Ya</Radio>
                            <Radio value="1">Tidak</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label={
                            <span className={style.label_field}>
                                Dokumen Akta Perjanjian Pisah Harta <span style={{ color: 'red' }}>*</span>
                            </span>
                        }
                        name="docSeparateAssetsNonWira"
                    >
                        {/* {isSeparateAsset === "1" ? (
                            <>
                                <Upload disabled={isSeparateAsset === "1"}>
                                    <Button icon={<UploadOutlined />} style={{
                                        cursor: isSeparateAsset === "1" ? 'not-allowed' : 'pointer',
                                        backgroundColor: isSeparateAsset === "1" ? '#f5f5f5' : undefined,
                                        color: isSeparateAsset === "1" ? '#999' : undefined,
                                        borderColor: isSeparateAsset === "1" ? '#d9d9d9' : undefined,
                                    }}>Select File</Button>
                                    <span className={style.upload_text}>{fileName || 'No file chosen'}</span>
                                </Upload>
                            </>
                        ) : (
                            <UploadImg />
                        )} */}
                        {isSeparateAsset === "1" ? (
                            <Upload
                                disabled={isSeparateAsset === "1"}
                                className={style.upload}
                            >
                                <div style={{ position: 'relative', width: '100%' }}>
                                    <Input
                                        readOnly
                                        placeholder="Choose File"
                                        className={style.input_field_readonly}
                                        onFocus={(e) => e.target.blur()}
                                    />
                                    <MdOutlineFileUpload
                                        size={20}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: 10,
                                            transform: 'translateY(-50%)',
                                            color: 'rgba(115, 115, 115, 0.62)',
                                            pointerEvents: 'none',
                                            cursor: isSeparateAsset === "1" ? "not-allowed" : "pointer",
                                        }}
                                    />
                                </div>
                            </Upload>
                        ) : (
                            <UploadImg />
                        )}
                    </Form.Item>
                </Col>

                {isSeparateAsset === "1" && (
                    <Col xs={24} md={8}>
                        <Form.Item
                            label={
                                <span className={style.label_field}>
                                    Dokumen Identitas Pasangan <span style={{ color: 'red' }}>*</span>
                                    <EyeOutlined onClick={handleViewImage} style={{ color: '#1890ff', marginLeft: 8 }} />
                                </span>
                            }
                            name="partnerIdentityDocNonWira"
                            rules={[{ min: 1 }]}
                        >
                            <Radio.Group onChange={(e) => setIsMatchingPartnerIdentityPartner(e.target.value)}>
                                <Radio value="0">Sesuai</Radio>
                                <Radio value="1">Tidak Sesuai</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                )}
                {isSeparateAsset === "1" && isMatchingIdentityPartner === "1" && (
                    <>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Upload Dokumen Identitas yang sesuai <span style={{ color: 'red' }}>*</span></span>} name='uploadDocMatchingIdentityNonWira'>
                                <UploadImg />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Jenis Identitas Pasangan</span>} name='spouseIdentityNonWira'>
                                <Select showSearch placeholder='PILIH JENIS IDENTITAS PASANGAN'></Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Nomor Identitas Pasangan<span style={{ color: 'red' }}>*</span></span>} name='noKtpSpouseNonWira'>
                                <Input disabled />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Nama Pasangan<span style={{ color: 'red' }}>*</span></span>} name='nameOfSpouseNonWira'>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Tempat Lahir Pasangan<span style={{ color: 'red' }}>*</span></span>} name='spousePlaceOfBirthNonWira'>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Tanggal Lahir Pasangan<span style={{ color: 'red' }}>*</span></span>} name='spouseDateOfBirthNonWira'>
                                <DatePicker format='DD-MM-YYYY' placeholder='DD-MM-YYYY' style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Jenis Kelamin<span style={{ color: 'red' }}>*</span></span>} name='genderOfSpouseNonWira'>
                                <Select showSearch placeholder="PILIH JENIS KELAMIN"></Select>
                            </Form.Item>
                        </Col>
                    </>
                )}
                <Col xs={24} md={8}>
                    <Form.Item label={<span className={style.label_field}>Foto Wajah Debitur <span style={{ color: 'red' }}>*</span></span>} name='debiturSelfieNonWira'>
                        <UploadImg />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label={<span className={style.label_field}>Dokumen FAPP <span style={{ color: 'red' }}>*</span></span>} name='fappDocNonWira'>
                        <UploadImg />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label={<span className={style.label_field}>Foto NPWP</span>} name='npwpImg' hidden>
                        <UploadImg />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label={<span className={style.label_field}>No NPWP</span>} name='noNpwp' hidden>
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label={<span className={style.label_field}>Upload Dokumen Hasil Pengecekan NPWP</span>} name='uplCheckingNpwp' hidden>
                        <UploadImg />
                    </Form.Item>
                </Col>
            </Row>
        </Form >
    );
};

export default InformasiNasabah;
