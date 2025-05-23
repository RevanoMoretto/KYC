import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Input, Col, Form, Row, Select, Radio, Spin } from "antd";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import classes from "./style.module.less";
import UploadImg from "../Helper/UploadImg";
import PhotoUploadSection from "../Helper/AddPhoto"
import Storage from "../../utils/storage";
import { fetchKodePos } from "../../redux/slice/kyc/action/fetch_kode_pos";
import { toInputUppercase, inputNumberOnly, inputAlphabetAndSpaceOnly } from "../../utils/general";


const InformasiTempatTinggalNasabah = () => {

    const [form] = Form.useForm();
    const { TextArea } = Input;
    const dispatch = useDispatch();
    const [alamatDomSesuai, setAlamatDomSesuai] = useState(null);
    const dataKyc = new Storage("kyc_detail").value;
    
    const alamatDom = dataKyc?.detail?.debitur?.personal?.alamat_debitur?.alamat_domisili || {};
    const dataKepemilikanRumah = dataKyc?.detail?.data_kepemilikan || {}
    const { data: dataKodePos, loading: loadingKodePos } = useSelector((state) => state.kyc.kodePos);
    const [kodePosOptions, setKodePosOptions] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [photoFiles, setPhotoFiles] = useState({});

    const handleFileChange = (info, index) => {
        setPhotoFiles((prev) => ({
            ...prev,
            [index]: info?.file || null,
        }));
    };

    // for handle options kode pos field
    useEffect(() => {
    if(dataKodePos){
      const result = dataKodePos.data.map((e) => ({
        label: `${e.zip_code} | ${e.kelurahan_name}`,
        value: `${e.zip_code}-${e.kelurahan_id}`,
      }))

      setKodePosOptions(result)
    }
    }, [dataKodePos])

    const handleSearchKodePos = async (e) => {
        if(e.length >= 3 && e.length <= 5){
            dispatch(fetchKodePos(e))
            setIsSearching(false)
        }else{
        setKodePosOptions([])
        }
    }
    
    useEffect(() => {
        form.setFieldsValue({
            alamat: alamatDom?.alamat ,
            desc_kab_kot: alamatDom?.desc_kab_kot,
            desc_kecamatan: alamatDom?.desc_kecamatan,
            desc_kelurahan: alamatDom?.desc_kelurahan,
            desc_provinsi: alamatDom?.desc_provinsi,
            kode_kab_kot: alamatDom?.kode_kab_kot,
            kode_kecamatan: alamatDom?.kode_kecamatan,
            kode_kelurahan: alamatDom?.kode_kelurahan,
            kode_pos: alamatDom?.kode_pos,
            kode_provinsi: alamatDom?.kode_provinsi,
            no_telephone: alamatDom?.no_telephone,
            rt: alamatDom?.rt,
            rw: alamatDom?.rw,
            house_of_status_desc: dataKepemilikanRumah?.house_of_status_desc
        })
    })

    const handleChangeKodePos = (e) => {
        // for disabled auto focus when select an option and clear value
        setTimeout(() => {
        document.activeElement?.blur();
    }, 0)
    // if user reset value using clear icon in select field
    if(e == undefined){
        // dispatch(saveData({
        // subtab: "emergency_contact",
        // fields: {
        //     kodepos_ec_code: "",
        //     kelurahan_ec_code: "",
        //     kelurahan_ec_desc: "",
        //     kecamatan_ec_code: "",
        //     kecamatan_ec_desc: "",
        //     kabkota_ec_code: "",
        //     kabkota_ec_desc: "",
        //     provinsi_ec_code: "",
        //     provinsi_ec_desc: ""
        // }
        // }))

        form.setFieldsValue({
        kode_pos_sesuai: undefined,
        kelurahan_sesuai: "",
        kecamatan_sesuai: "",
        kab_kota_sesuai: "",
        provinsi_sesuai: ""
        })

        return
    }
    const [zip, kel] = e.split("-")
        const selected = dataKodePos.data.find(
          (e) => e.zip_code === zip && e.kelurahan_id === kel
        )
    
        // dispatch(saveData({
        //   subtab: "emergency_contact",
        //   fields: {
        //     kodepos_ec_code: selected.zip_code,
        //     kelurahan_ec_code: selected.kelurahan_id,
        //     kelurahan_ec_desc: selected.kelurahan_name,
        //     kecamatan_ec_code: selected.kecamatan_id,
        //     kecamatan_ec_desc: selected.kecamatan_name,
        //     kabkota_ec_code: selected.kab_kot_id,
        //     kabkota_ec_desc: selected.kab_kot_name,
        //     provinsi_ec_code: selected.provinsi_id,
        //     provinsi_ec_desc: selected.provinsi_name
        //   }
        // }))
    
        form.setFieldsValue({
          kode_pos_sesuai: `${selected.zip_code} | ${selected.kelurahan_name}`,
          desc_kelurahan_sesuai: selected.kelurahan_name,
          desc_kecamatan_sesuai: selected.kecamatan_name,
          desc_kab_kot_sesuai: selected.kab_kot_name,
          desc_provinsi_sesuai: selected.provinsi_name
        })
    }

    return (
        <Form
            form={form}
            layout="vertical"
            // initialValues={alamatDom}
        >
            <Row gutter={24}>
                <Col md={8} xs={24}>
                    <Form.Item
                        label="Alamat Domisili"
                        name="alamat"
                        className={classes.formItem}
                    >
                        <TextArea
                            rows={6}
                            showCount
                            maxLength={50}
                            onInput={toInputUppercase}
                            className={classes.textarea && classes.readonly_input_field}
                            // onChange={onAddressChange}
                            style={{ resize: "none" }}
                            
                            readOnly
                        />
                    </Form.Item>
                </Col>
                <Col md={16} xs={24}>
                    <Row gutter={12}>
                        <Col md={12} xs={24}>
                            <Form.Item
                                label="Kode Pos Domisili"
                                name="kode_pos"
                            >
                                <Select
                                    allowClear={true}
                                    onKeyPress={inputNumberOnly}
                                    showSearch
                                    disabled={true}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item
                                label="Kota/Kabupaten Domisili"
                                name="desc_kab_kot"
                            // {...kotaKtpValidation}
                            >
                                <Input
                                    onInput={toInputUppercase && inputAlphabetAndSpaceOnly}
                                    className={classes.readonly_input_field}
                                    readOnly
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col md={12} xs={24}>
                            <Form.Item
                                label="Kelurahan Domisili"
                                name="desc_kelurahan"
                            // {...kelurahanKtpValidation}
                            >
                                <Select
                                    allowClear
                                    // onClear={onClearKelurahan}
                                    showSearch
                                    disabled={true}
                                />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item
                                label="Provinsi Domisili"
                                name="desc_provinsi"
                            >
                                <Input
                                    onInput={toInputUppercase && inputAlphabetAndSpaceOnly}
                                    className={classes.readonly_input_field}
                                    readOnly
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col md={4} xs={12}>
                    <Form.Item label="RT Domisili" name="rt">
                        <Input
                            // onKeyPress={allowOnlyNumber}
                            maxLength={3}
                            onKeyDown={inputNumberOnly}
                            // onChange={onRtChange}
                            className={classes.readonly_input_field}
                            readOnly
                        />
                    </Form.Item>
                </Col>
                <Col md={4} xs={12}>
                    <Form.Item label="RW Domisili" name="rw">
                        <Input
                            maxLength={3}
                            onKeyDown={inputNumberOnly}
                            className={classes.readonly_input_field}
                            readOnly
                        />
                    </Form.Item>
                </Col>
                <Col md={8} xs={24}>
                    <Form.Item
                        label="Kecamatan Domisili"
                        name="desc_kecamatan"
                    // {...kecamatanKtpValidation}
                    >
                        <Input
                            onInput={toInputUppercase && inputAlphabetAndSpaceOnly} 
                            className={classes.readonly_input_field}
                            readOnly={true}
                        />
                    </Form.Item>
                </Col>
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
                    <>
                    <Col md={8} xs={24}>
                        <Form.Item
                        label="Alamat Domisili"
                        name="alamat_sesuai"
                        className={classes.formItem}
                        >
                            <TextArea
                                rows={6}
                                showCount
                                maxLength={50}
                                onInput={toInputUppercase}
                                className={classes.textarea}
                                // onChange={onAddressChange}
                                style={{ resize: "none" }}
                                // disabled={isFormDisable}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={16} xs={24}>
                        <Row gutter={12}>
                            <Col md={12} xs={24}>
                                <Form.Item
                                    label="Kode Pos Domisili"
                                    name="kode_pos_sesuai"
                                >
                                    <Select
                                        allowClear={true}
                                        placeholder="PILIH KODE POS"
                                        onKeyDown={inputNumberOnly}
                                        showSearch
                                        onFocus={() => setIsSearching(true)}
                                        onDropdownVisibleChange={(open) => {
                                            if(!open){
                                            setIsSearching(false)
                                            setKodePosOptions([])
                                            }
                                        }}
                                        onSearch={handleSearchKodePos}
                                        onChange={handleChangeKodePos}
                                        dropdownRender={menu => (
                                            <>
                                            {isSearching && !loadingKodePos && (
                                                <div className={classes.dropdown_text_kode_pos}>
                                                Ketik Minimal 3 Angka Untuk Mencari Kode Pos
                                                </div>
                                            )}

                                            {loadingKodePos ? (
                                                <div className={classes.loading_spin}>
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
                            <Col md={12} xs={24}>
                                <Form.Item
                                    label="Kota/Kabupaten Domisili"
                                    name="desc_kab_kot_sesuai"
                                >
                                    <Select
                                        disabled={true}
                                        autoComplete="off"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={12}>
                            <Col md={12} xs={24}>
                                <Form.Item
                                    label="Kelurahan Domisili"
                                    name="desc_kelurahan_sesuai"
                                >
                                    <Select
                                        allowClear
                                        disabled
                                        autoComplete="off"
                                    />
                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24}>
                                <Form.Item
                                    label="Provinsi Domisili"
                                    name="desc_provinsi_sesuai"
                                >
                                    <Select
                                        onInput={toInputUppercase && inputAlphabetAndSpaceOnly}
                                        disabled
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4} xs={12}>
                        <Form.Item label="RT Domisili" name="rt_sesuai">
                            <Input
                                maxLength={3}
                                onKeyDown={inputNumberOnly}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={4} xs={12}>
                        <Form.Item label="RW Domisili" name="rw_sesuai">
                            <Input
                                maxLength={3}
                                onKeyDown={inputNumberOnly}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                        <Form.Item
                            label="Kecamatan Domisili"
                            name="desc_kecamatan_sesuai"
                        >
                            <Select
                                onInput={toInputUppercase && inputAlphabetAndSpaceOnly} 
                                disabled />
                        </Form.Item>
                    </Col>
                    </>
                )}
                <Col xs={24} md={8}>
                    <Form.Item 
                        label={<span style={{ fontWeight: 'bold' }}>Tempat Penyimpanan Garasi<span style={{ color: 'red' }}>*</span></span>}
                        name='vehicleStorage'
                    >
                        <Select showSearch placeholder='PILIH TEMPAT PENYIMPANAN'></Select>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item 
                        label={<span style={{ fontWeight: 'bold' }}>Status Kepemilikan Rumah<span style={{ color: 'red' }}>*</span></span>} 
                        name='house_of_status_desc'
                    >
                        <Select showSearch disabled></Select>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item 
                        label={<span style={{ fontWeight: 'bold' }}>Jenis Dokumen Bukti Kepemilikan Rumah</span>} 
                        name='typesOfDocProvingHomeOwnership'
                    >
                        <Select showSearch placeholder='PILIH JENIS DOKUMEN'></Select>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item 
                        label={<span style={{ fontWeight: 'bold' }}>Dokumen Kepemilikan Tempat Tinggal (BKR)</span>} 
                        name='residentialOwnership'
                    >
                        <UploadImg />
                    </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                    <Form.Item label="Foto Rumah">
                        <UploadImg/>
                        <PhotoUploadSection
                            form={form}
                            // titles={['Foto Rumah', 'Foto Rumah 2']}
                            names={['photoHome', 'photoHome2']}
                            maxPhotos={2}
                            onFileChange={
                                handleFileChange
                            }
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="Foto Jalan Depan Rumah">
                        <UploadImg/>
                        <PhotoUploadSection
                            // titles={['Foto Jalan Depan Rumah', 'Foto Jalan Depan Rumah 2']}
                            names={['photoRoadHome', 'photoRoadHome2']}
                            maxPhotos={2}
                            onFileChange={handleFileChange}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label='Foto Tempat Usaha'>
                        <UploadImg/>
                        <PhotoUploadSection
                            form={form}
                            // titles={['Foto Tempat Usaha', 'Foto Tempat Usaha 2']}
                            names={['photoBusinessPlace', 'photoBusinessPlace2']}
                            maxPhotos={2}
                            onFileChange={handleFileChange}
                        /> 
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label='Foto Jalan Depan Tempat Usaha' >
                        <UploadImg/>
                        <PhotoUploadSection
                            form={form}
                            // titles={['Foto Jalan Depan Tempat Usaha', 'Foto Jalan Depan Tempat Usaha 2']}
                            names={['photoRoadBusinessPlace', 'photoRoadBusinessPlace2']}
                            maxPhotos={2}
                            onFileChange={handleFileChange}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item 
                        label={<span style={{ fontWeight: 'bold' }}>Jarak Domisili Nasabah ke Muf<span style={{ color: 'red' }}>*</span></span>} 
                        name='distanctCustDomicile'
                    >
                        <Input addonAfter={<span style={{ fontWeight: 'bold' }}>KM</span>} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}
export default InformasiTempatTinggalNasabah;