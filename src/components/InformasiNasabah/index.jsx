import {
    Checkbox, Col, Form, Row, Upload, Button,
    Radio, Select, Input,
    DatePicker, Image, Spin, Modal
} from 'antd';
import { UploadOutlined, EyeOutlined } from '@ant-design/icons';
import { MdOutlineFileUpload } from "react-icons/md";
import React, { useState, useEffect } from 'react';
import style from './style.module.less';
import UploadImg from '../Helper/UploadImg';
import { useDispatch, useSelector } from 'react-redux';
import { paramJenisIdentitasPasangan, paramReasonCantShowIdentity } from '../../redux/store/features/paramSlice';
import { fetchDetailKyc } from '../../redux/store/features/kycSlice';

import moment from 'moment';
import Storage from '../../utils/storage';



const InformasiNasabah = () => {
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [maritalStatus, setMaritalStatus] = useState(null);
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
    const dispatch = useDispatch();
    const kycData = new Storage('kyc_detail').value;
    // const { data: kycData, loading: kycLoading } = useSelector((state) => state.kyc);
    const { data: reasonsData, loading: reasonsLoading } = useSelector((state) => state.param.reasonCantShowIdentity);
    const { data: spouseIdentityData = [], loading: spouseIdentityLoading } = useSelector((state) => state.param.spouseIdentity);

    const spouseIdentities = spouseIdentityData?.data || [];
    // const no_order = "2410001316";

    useEffect(() => {
        dispatch(paramReasonCantShowIdentity());
    }, [dispatch]);

    useEffect(() => {
        dispatch(paramJenisIdentitasPasangan());
    }, [dispatch])

    useEffect(() => {
        if (kycData) {
            const personalInfo = kycData?.detail?.debitur?.personal || {};
            const alamatDebitur = personalInfo?.alamat_debitur?.alamat_ktp || {};
            const statusPerkawinan = personalInfo.debitur_status_perkawinan || {};
            const spouse = personalInfo?.spouse || {};

            if (statusPerkawinan) {
                setMaritalStatus(statusPerkawinan)
            }
            form.setFieldsValue({
                noKtpDebitur: personalInfo.debitur_no_ktp,
                nameDebtKtp: personalInfo.debitur_nama_sesuai_ktp,
                debtPlaceOfBirth: personalInfo.debitur_tempat_lahir,
                debtDateOfBirth: personalInfo.debitur_tanggal_lahir ? moment(personalInfo.debitur_tanggal_lahir) : {},
                genderOfSpouse: personalInfo.debitur_jenis_kelamin,
                debtNationality: personalInfo.debitur_nationality_desc,
                debtAddress: alamatDebitur.alamat,
                debtRT: alamatDebitur.rt,
                debtRW: alamatDebitur.rw,
                debtPostalCode: alamatDebitur.kode_pos,
                debtSubDistrict: alamatDebitur.desc_kelurahan,
                debtDistrict: alamatDebitur.kode_kecamatan,
                debtRegency: alamatDebitur.kode_kab_kot,
                debtProvince: alamatDebitur.desc_provinsi,
                nameOfMother: personalInfo.debitur_mothers_maiden_name,
                matchingMotherName: personalInfo.debitur_mothers_maiden_name,
                maritalStatus: personalInfo.debitur_status_perkawinan_desc,
                noKtpSpouse: spouse.spouse_ktp_no,
                nameOfSpouse: spouse.spouse_ktp_name,
                spousePlaceOfBirth: spouse.spouse_date_of_birth_place,
                spouseDateOfBirth: spouse.spouse_date_of_birth ? moment(spouse.spouse_date_of_birth) : {},
                genderOfSpouse: spouse.jenis_kelamin_pasangan,
            });
        } else {
            console.warn('KYC data not found in localStorage');
        }
    }, [dispatch, form, kycData]);

    useEffect(() => {
        if (!reasonsLoading && reasonsData) {
            form.setFieldsValue({
                reasonCantShowIdentity: reasonsData?.[0]?.value || '',
            });
        }
    }, [dispatch, reasonsData, reasonsLoading, form]);

    useEffect(() => {
        if (!spouseIdentityLoading && spouseIdentityData.length > 0) {
            form.setFieldValue({
                spouseIdentity: spouseIdentityData[0]?.id_card || '',
            })
        }
    }, [form, spouseIdentityData, spouseIdentityLoading])


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
                        name='selfiePICKYC'
                        rules={[{ required: true, message: 'Foto selfie dengan PIC wajib diisi' }]}
                    >
                        <UploadImg />
                    </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                    <Form.Item label={<span className={style.label_field}>Dapat Menunjukan identitas asli<span style={{ color: 'red' }}>*</span></span>} name='radioShowRealIdentity' rules={[{ required: true, message: 'Kolom Dapat Menunjukkan Identitas Wajib Diisi', min: 1 }]}>
                        <Radio.Group onChange={(e) => setMenunjukanIdentitasRil(e.target.value)}>
                            <Radio value="0">Bisa</Radio>
                            <Radio value="1">Tidak Bisa</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                {menunjukanIdentitasRil === "1" ? (
                    <>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Alasan tidak bisa menunjukan identitas asli</span>} name='reasonCantShowIdentity' rules={[{ required: true, message: 'Kolom Alasan Tidak Dapat Menunjukkan Identitas Wajib Diisi' }]}>
                                <Select showSearch placeholder="Pilih Alasan">
                                    {(reasonsData?.result || []).map((item) => (
                                        <Select.Option key={item.alasanId} value={item.alasanId}>
                                            {item.alasanDesc}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={
                                <span className={style.label_field}>
                                    Dokumen KTP Nasabah <span style={{ color: 'red' }}>*</span> <EyeOutlined onClick={handleViewImage} style={{ color: '#1890ff', marginLeft: 8 }} />
                                </span>
                            } name='debtDocKTP' rules={[{ min: 1 }]}>
                                <Radio.Group onChange={(e) => setKtpStatusDoc(e.target.value)} disabled={true}>
                                    <Radio value="0">Sesuai</Radio>
                                    <Radio value="1">Tidak Sesuai</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </>
                ) : (
                    <Col xs={24} md={8}>
                        <Form.Item label={
                            <span className={style.label_field}>
                                Dokumen KTP Nasabah <span style={{ color: 'red' }}>*</span> <EyeOutlined onClick={handleViewImage} style={{ color: '#1890ff', marginLeft: 8 }} />
                            </span>
                        } name='debtDocKTP' rules={[{ min: 1 }]}>
                            <Radio.Group onChange={(e) => setKtpStatusDoc(e.target.value)}>
                                <Radio value="0">Sesuai</Radio>
                                <Radio value="1">Tidak Sesuai</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                )}



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
                            <Form.Item label={<span className={style.label_field}>Upload KTP yang sesuai</span>} name='uploadMatchingKtp'>
                                <UploadImg />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Nomor KTP</span>} name='noKtpDebitur'>
                                <Input style={{ color: 'black' }} disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Nama Sesuai KTP <span style={{ color: 'red' }}>*</span></span>} name='nameDebtKtp'>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Tempat Lahir <span style={{ color: 'red' }}>*</span></span>} name='debtPlaceOfBirth'>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Tanggal Lahir <span style={{ color: 'red' }}>*</span></span>} name='debtDateOfBirth'>
                                <DatePicker format='DD-MM-YYYY' placeholder='DD-MM-YYYY' style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Jenis Kelamin<span style={{ color: 'red' }}>*</span></span>} name='genderOfSpouse' rules={[{ min: 1 }]}>
                                <Radio.Group>
                                    <Radio value="L">Laki-Laki</Radio>
                                    <Radio value="P">Perempuan</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Kewarganegaraan <span style={{ color: 'red' }}>*</span></span>} name='debtNationality'>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Alamat KTP <span style={{ color: 'red' }}>*</span></span>} name='debtAddress'>
                                <TextArea
                                    showCount
                                    maxLength={50}
                                    className={style.text_area}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>RT/RW KTP <span style={{ color: 'red' }}>*</span></span>}>
                                <Row gutter={8} align="middle">
                                    <Col xs={12}>
                                        <Form.Item name="debtRT" noStyle>
                                            <Input placeholder="RT" />
                                        </Form.Item></Col>
                                    {/* <Col xs={1} style={{ textAlign: 'center' }}>/</Col> */}
                                    <Col xs={12}><Form.Item name="debtRW" noStyle>
                                        <Input placeholder="RW" />
                                    </Form.Item></Col>
                                </Row>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Kode Pos KTP<span style={{ color: 'red' }}>*</span></span>} name='debtPostalCode'>
                                <Select showSearch placeholder="PILIH KODE POS" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Kelurahan KTP <span style={{ color: 'red' }}>*</span></span>} name='debtSubDistrict'>
                                <Input style={{ color: 'black' }} disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Kecamatan KTP<span style={{ color: 'red' }}>*</span></span>} name='debtDistrict'>
                                <Input style={{ color: 'black' }} disabled />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Kab/Kota KTP <span style={{ color: 'red' }}>*</span></span>} name='debtRegency'>
                                <Input style={{ color: 'black' }} disabled />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Provinsi KTP <span style={{ color: 'red' }}>*</span></span>} name='debtProvince'>
                                <Input style={{ color: 'black' }} disabled />
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
                        name="familyCard"
                    >
                        <UploadImg />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label={
                            <div className={style.label_field}>
                                Nama Gadis Ibu Kandung
                            </div>
                        }
                        required
                    >
                        <Form.Item
                            name="nameOfMother"
                            noStyle
                        >
                            <Input
                                style={{ color: 'black' }}
                                disabled
                                placeholder="Nama Ibu Kandung"
                            />
                        </Form.Item>

                        <Form.Item
                            name="isMatchingMotherName"
                            noStyle
                            rules={[{ required: true, message: 'Wajib pilih kesesuaian nama ibu kandung' }]}
                        >
                            <Radio.Group
                                style={{ display: 'block', marginTop: 8 }}
                                onChange={(e) => setSuitableMaidenMotherName(e.target.value)}
                            >
                                <Radio value="0">Sesuai</Radio>
                                <Radio value="1">Tidak Sesuai</Radio>
                            </Radio.Group>
                        </Form.Item>
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
                            name="matchingMotherName"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                )}
                <Col xs={24} md={8}>
                    <Form.Item label={<span className={style.label_field}>Status Perkawinan</span>} name='maritalStatus'>
                        <Select showSearch disabled />
                    </Form.Item>
                </Col>
                {maritalStatus === "01" && (
                    <>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field} style={{ fontSize: '11px', fontWeight: 'bold' }}>Dokumen Buku Nikah/Akta Perkawinan/Akta Cerai/Surat Kematian</span>} name='docMarital'>
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
                                name='availOfDocSeparateProperty'
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
                                name="docSeparateAssets"
                            >
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
                    </>
                )}
                {isSeparateAsset === "1" && (
                    <Col xs={24} md={8}>
                        <Form.Item
                            label={
                                <span className={style.label_field}>
                                    Dokumen Identitas Pasangan <span style={{ color: 'red' }}>*</span>
                                    <EyeOutlined onClick={handleViewImage} style={{ color: '#1890ff', marginLeft: 8 }} />
                                </span>
                            }
                            name="partnerIdentityDoc"
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
                            <Form.Item label={<span className={style.label_field}>Upload Dokumen Identitas yang sesuai <span style={{ color: 'red' }}>*</span></span>} name='uploadDocMatchingIdentity'>
                                <UploadImg />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Jenis Identitas Pasangan</span>} name='spouseIdentity'>
                                <Select showSearch placeholder='PILIH JENIS IDENTITAS PASANGAN'>
                                    {spouseIdentities.map(item => (
                                        <Select.Option key={item.id_card} value={item.id_card}>
                                            {item.id_card_desc}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Nomor Identitas Pasangan<span style={{ color: 'red' }}>*</span></span>} name='noKtpSpouse'>
                                <Input style={{ color: 'black' }} disabled />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Nama Pasangan<span style={{ color: 'red' }}>*</span></span>} name='nameOfSpouse'>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Tempat Lahir Pasangan<span style={{ color: 'red' }}>*</span></span>} name='spousePlaceOfBirth'>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Tanggal Lahir Pasangan<span style={{ color: 'red' }}>*</span></span>} name='spouseDateOfBirth'>
                                <DatePicker format='DD-MM-YYYY' placeholder='DD-MM-YYYY' style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Jenis Kelamin<span style={{ color: 'red' }}>*</span></span>} name='genderOfSpouse'>
                                <Select showSearch placeholder="PILIH JENIS KELAMIN"></Select>
                            </Form.Item>
                        </Col>
                    </>
                )}
                <Col xs={24} md={8}>
                    <Form.Item label={<span className={style.label_field}>Foto Wajah Debitur <span style={{ color: 'red' }}>*</span></span>} name='debiturSelfie'>
                        <UploadImg />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label={<span className={style.label_field}>Dokumen FAPP <span style={{ color: 'red' }}>*</span></span>} name='fappDoc'>
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
