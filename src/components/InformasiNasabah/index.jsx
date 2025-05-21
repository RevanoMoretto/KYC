import {
    Checkbox, Col, Form, Row, Upload, Button,
    Radio, Select, Input,
    DatePicker, Image, Spin, Modal
} from 'antd';
import { MdOutlineFileUpload } from "react-icons/md";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import style from './style.module.less';
import UploadImg from '../Helper/UploadImg';
import { useDispatch, useSelector } from 'react-redux';
import { inputNumberOnly, onPasteClearInput, inputAlphabetAndSpaceOnly, regexAddress } from '../../utils/general';
import { fetchReasonIdentity } from '../../redux/slice/kyc/action/fetch_reason_identity'
import moment from 'moment';
import ImagePreview from '../Helper/PreviewImg';
import KycDetailStorage from '../../utils/kyc_detail_storage';
import DocCode from '../../constants/autofillImage'
import { fetchTypeSpouse } from '../../redux/slice/kyc/action/fetch_type_gender_spouse';
import { fetchKodePos } from '../../redux/slice/kyc/action/fetch_kode_pos';
import { saveData } from '../../redux/slice/saveData/saveDataSlice';



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

    const kycData = KycDetailStorage.data || {}
    const { detail } = kycData || {}
    const { kyc } = detail || {}

    const { data: reasonsData, loading: reasonsLoading } = useSelector((state) => state.kyc.fetchReason);
    const { data: spouseIdentityData = [], loading: spouseIdentityLoading } = useSelector((state) => state.kyc.typeIdentitySpouse);
    const { data: postalCodeData, loading: postalCodeLoading } = useSelector((state) => state.kyc.kodePos);

    // console.log(spouseIdentityData);
    const spouseIdentities = spouseIdentityData?.data || [];

    const [jenisKelaminDebitur, setJenisKelaminDebitur] = useState(kycData?.detail?.debitur?.personal?.debitur_jenis_kelamin);
    const [jenisKelaminSpouse, setJenisKelaminSpouse] = useState(kycData?.detail?.debitur?.personal?.spouse?.jenis_kelamin_pasangan);
    const [locationKyc, setLocationKyc] = useState("");
    const orderId = kycData?.order_id || {};
    const {
        KTP, KTP_PASANGAN, KARTU_KELUARGA, NPWP_NASABAH
    } = DocCode || {}

    const [kodePosOptions, setKodePosOptions] = useState([]);
    const [isSearching, setIsSearching] = useState(false)
    const hasAutofilled = useRef(false);

    useEffect(() => {
        dispatch(fetchReasonIdentity());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchTypeSpouse());
    }, [dispatch])

    // autofill first render
    useEffect(() => {
        if (!kycData || hasAutofilled.current) return
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
                genderOfDebitur: jenisKelaminDebitur,
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
                genderOfSpouse: jenisKelaminSpouse,
            });
        } else {
            console.warn('KYC data not found in localStorage');
        }
        hasAutofilled.current = true
    }, [dispatch, form, kycData]);

    // put result api postal code to state
    useEffect(() => {
        if (postalCodeData) {
            const result = postalCodeData.data.map((e) => ({
                label: `${e.zip_code} | ${e.kelurahan_name}`,
                value: `${e.zip_code}-${e.kelurahan_id}`,
            }))

            setKodePosOptions(result)
        }
    }, [postalCodeData])

    const handleSearchKodePos = (e) => {
        if (e.length >= 3 && e.length <= 5) {
            dispatch(fetchKodePos(e))
            setIsSearching(false)
        } else {
            setKodePosOptions([])
        }
    }

    const handleChangeKodePos = (e) => {
        console.log("changed postal code", e)

        setTimeout(() => document.activeElement?.blur(), 0)
        if (e == undefined) {
            dispatch(saveData({
                subtab: "informasi_nasabah",
                fields: {
                    kode_pos_ktp_nasabah: "",
                    kelurahan_ktp_nasabah_code: "",
                    kelurahan_ktp_nasabah_desc: "",
                    kecamatan_ktp_nasabah_code: "",
                    kecamatan_ktp_nasabah_desc: "",
                    kabkota_ktp_nasabah_code: "",
                    kabkota_ktp_nasabah_desc: "",
                    provinsi_ktp_nasabah_code: "",
                    provinsi_ktp_nasabah_desc: ""
                }
            }))

            form.setFieldsValue({
                debtPostalCode: undefined,
                debtSubDistrict: "",
                debtDistrict: "",
                debtRegency: "",
                debtProvince: ""
            })
            return
        }

        const [zip, kel] = e.split("-")
        const selected = postalCodeData.data.find(
            (item) => item.zip_code === zip && item.kelurahan_id === kel
        )

        dispatch(saveData({
            subtab: "informasi_nasabah",
            fields: {
                kode_pos_ktp_nasabah: selected.zip_code,
                kelurahan_ktp_nasabah_code: selected.kelurahan_id,
                kelurahan_ktp_nasabah_desc: selected.kelurahan_name,
                kecamatan_ktp_nasabah_code: selected.kecamatan_id,
                kecamatan_ktp_nasabah_desc: selected.kecamatan_name,
                kabkota_ktp_nasabah_code: selected.kab_kot_id,
                kabkota_ktp_nasabah_desc: selected.kab_kot_name,
                provinsi_ktp_nasabah_code: selected.provinsi_id,
                provinsi_ktp_nasabah_desc: selected.provinsi_name
            }
        }))

        form.setFieldsValue({
            debtPostalCode: `${selected.zip_code} | ${selected.kelurahan_name}`,
            debtSubDistrict: selected.kelurahan_name,
            debtDistrict: selected.kecamatan_name,
            debtRegency: selected.kab_kot_name,
            debtProvince: selected.provinsi_name
        })

    }

    const handleReasonChange = (value) => {

        const selectedReason = reasonsData?.result.find(item => String(item.alasanId) === value);
        dispatch(saveData({
            subtab: "informasi_nasabah",
            fields: {
                alasan_tidak_dapat_menunjukkan_identitas_code: value,
                alasan_tidak_dapat_menunjukkan_identitas_desc: selectedReason?.alasanDesc || '',
            }
        }));

        form.setFieldsValue({
            reasonCantShowIdentity: value
        })
        console.log("data", value);
    };

    const handleTypeIdentitySpouse = (value) => {
        console.log("data", value);
        const selectedIdentitySpouse = spouseIdentities.find(item => item.id_card === value);

        dispatch(saveData({
            subtab: "informasi_nasabah",
            fields: {
                spouse_jenis_identitas_code: value,
                spouse_jenis_identitas_desc: selectedIdentitySpouse?.id_card_desc || '',
            }
        }));

        form.setFieldsValue({
            spouseIdentity: value,
        });


    }

    const handleGenderOfDebitur = (e) => {
        const selectedGender = e.target.value;
        setJenisKelaminDebitur(selectedGender);

        dispatch(saveData({
            subtab: "informasi_nasabah",
            fields: {
                jenis_kelamin_debitur: selectedGender,
            }
        }));

        form.setFieldsValue({
            genderOfDebitur: selectedGender,
        });

        console.log("kelamin", selectedGender);
    };

    const handleGenderOfSpouse = (e) => {
        const selectedGenderSpouse = e.target.value;
        setJenisKelaminSpouse(selectedGenderSpouse);
    }

    const locationKycOptions = {
        "0": "RUMAH",
        "1": "TEMPAT USAHA",
    };

    const handleLocationKycChange = (checkedValues) => {
        const stringValues = checkedValues.map(String);

        setLocationKyc(stringValues);

        let lokasiCode = "";
        if (stringValues.length === 2) {
            lokasiCode = "2";
        } else if (stringValues[0] === '0') {
            lokasiCode = "0";
        } else if (stringValues[0] === '1') {
            lokasiCode = "1";
        }

        const locationDescriptions = stringValues.map(val => locationKycOptions[val]);
        const lokasiDesc = locationDescriptions.join(" DAN ");

        dispatch(saveData({
            subtab: "informasi_nasabah",
            fields: {
                lokasi_proses_kyc_code: lokasiCode,
                lokasi_proses_kyc_desc: lokasiDesc,
            },
        }));
    };


    const showIdentityOptions = {
        "0": "Bisa",
        "1": "Tidak Bisa",
    };

    const handleShowRealIdentityChange = (e) => {
        const selectedValue = e.target.value;
        const selectedLabel = showIdentityOptions[selectedValue];


        setMenunjukanIdentitasRil(selectedValue);

        dispatch(saveData({
            subtab: "informasi_nasabah",
            fields: {
                real_identity_code: selectedValue,
                real_identity_desc: selectedLabel
            }
        }));
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
                        <Checkbox.Group
                            onChange={handleLocationKycChange} value={locationKyc}
                        >
                            <Checkbox value="0">Rumah</Checkbox>
                            <Checkbox value="1">Tempat Usaha</Checkbox>
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
                        <Radio.Group onChange={handleShowRealIdentityChange}>
                            <Radio value="0">Bisa</Radio>
                            <Radio value="1">Tidak Bisa</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>

                {menunjukanIdentitasRil === "1" ? (
                    <>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Alasan tidak bisa menunjukan identitas asli</span>} name='reasonCantShowIdentity' rules={[{ required: true, message: 'Kolom Alasan Tidak Dapat Menunjukkan Identitas Wajib Diisi' }]}>
                                <Select showSearch placeholder="Pilih Alasan" onChange={handleReasonChange}>
                                    {(reasonsData?.result || []).map((item) => (
                                        <Select.Option key={item.alasanId} value={String(item.alasanId)}>
                                            {item.alasanDesc}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={
                                <span className={style.label_field}>
                                    Dokumen KTP Nasabah <span style={{ color: 'red' }}>*</span> <ImagePreview order_id={orderId} doc_code={KTP} />
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
                                Dokumen KTP Nasabah <span style={{ color: 'red' }}>*</span> <ImagePreview order_id={orderId} doc_code={KTP} />
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
                                <Input onKeyDown={inputAlphabetAndSpaceOnly} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Tempat Lahir <span style={{ color: 'red' }}>*</span></span>} name='debtPlaceOfBirth'>
                                <Input onKeyDown={inputAlphabetAndSpaceOnly} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Tanggal Lahir <span style={{ color: 'red' }}>*</span></span>} name='debtDateOfBirth'>
                                <DatePicker format='DD-MM-YYYY' placeholder='DD-MM-YYYY' style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Jenis Kelamin<span style={{ color: 'red' }}>*</span></span>} name='genderOfDebitur' rules={[{ min: 1 }]} >
                                <Radio.Group onChange={handleGenderOfDebitur}>
                                    <Radio value="L">Laki-Laki</Radio>
                                    <Radio value="P">Perempuan</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Kewarganegaraan <span style={{ color: 'red' }}>*</span></span>} name='debtNationality'>
                                <Input onKeyDown={inputAlphabetAndSpaceOnly} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Alamat KTP <span style={{ color: 'red' }}>*</span></span>} name='debtAddress'>
                                <TextArea
                                    showCount
                                    maxLength={50}
                                    className={style.text_area}
                                    onKeyDown={regexAddress}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>RT/RW KTP <span style={{ color: 'red' }}>*</span></span>}>
                                <Row gutter={8} align="middle">
                                    <Col xs={12}>
                                        <Form.Item name="debtRT" noStyle>
                                            <Input placeholder="RT" onKeyDown={inputNumberOnly} />
                                        </Form.Item></Col>
                                    <Col xs={12}><Form.Item name="debtRW" noStyle>
                                        <Input placeholder="RW" onKeyDown={inputNumberOnly} />
                                    </Form.Item></Col>
                                </Row>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Kode Pos KTP<span style={{ color: 'red' }}>*</span></span>} name='debtPostalCode'>
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="PILIH KODE POS"
                                    onFocus={() => setIsSearching(true)}
                                    onDropdownVisibleChange={(open) => {
                                        if (!open) {
                                            setIsSearching(false)
                                            setKodePosOptions([])
                                        }
                                    }}
                                    onChange={handleChangeKodePos}
                                    onSearch={handleSearchKodePos}
                                    className={style.select_field_ec}
                                    onKeyDown={inputNumberOnly}
                                    type="tel"
                                    dropdownRender={menu => (
                                        <>
                                            {isSearching && !postalCodeLoading && (
                                                <div style={{ padding: 5, fontSize: 12, color: '#888' }}>
                                                    Ketik Minimal 3 Angka Untuk Mencari Kode Pos
                                                </div>
                                            )}

                                            {postalCodeLoading ? (
                                                <div style={{ padding: 20, textAlign: 'center' }}>
                                                    <Spin size="default" />
                                                </div>
                                            ) : (
                                                menu
                                            )}
                                        </>
                                    )}
                                    options={kodePosOptions}
                                />
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
                                <ImagePreview order_id={orderId} doc_code={KARTU_KELUARGA} />
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
                            <Input onKeyDown={inputAlphabetAndSpaceOnly} />
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
                                    <ImagePreview order_id={orderId} doc_code={KTP_PASANGAN} />
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
                                <Select allowClear showSearch placeholder='PILIH JENIS IDENTITAS PASANGAN' onChange={handleTypeIdentitySpouse}>
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
                                <Input onKeyDown={inputAlphabetAndSpaceOnly} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Tempat Lahir Pasangan<span style={{ color: 'red' }}>*</span></span>} name='spousePlaceOfBirth'>
                                <Input onKeyDown={inputAlphabetAndSpaceOnly} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Tanggal Lahir Pasangan<span style={{ color: 'red' }}>*</span></span>} name='spouseDateOfBirth'>
                                <DatePicker format='DD-MM-YYYY' placeholder='DD-MM-YYYY' style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item label={<span className={style.label_field}>Jenis Kelamin<span style={{ color: 'red' }}>*</span></span>} name='genderOfSpouse' rules={[{ min: 1 }]} >
                                <Radio.Group onChange={handleGenderOfSpouse}>
                                    <Radio value="L">Laki-Laki</Radio>
                                    <Radio value="P">Perempuan</Radio>
                                </Radio.Group>
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
