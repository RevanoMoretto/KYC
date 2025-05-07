import React, { useState, useEffect } from "react";
import { Input, Col, Form, Row, Select, Radio, Button } from "antd";
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import classes from "./style.module.less";
import UploadImg from "../Helper/UploadImg";
import PhotoUploadSection from "../Helper/AddPhoto"
import Storage from "../../utils/storage";
import { toInputUppercase, inputNumberOnly, inputAlphabetAndSpaceOnly } from "../../utils/general";


const InformasiTempatTinggalNasabah = () => {

    // const [alamatDom, setAlamatDom] = useState("");
    const [form] = Form.useForm();
    const { TextArea } = Input;
    const [alamatDomSesuai, setAlamatDomSesuai] = useState(null);
    const dataKyc = new Storage("kyc_detail").value;
    
    const alamatDom = dataKyc?.detail?.debitur?.personal?.alamat_debitur?.alamat_domisili || {};
    const dataKepemilikanRumah = dataKyc?.detail?.data_kepemilikan || {}
    

    const [photoFiles, setPhotoFiles] = useState({});

    const handleFileChange = (info, index) => {
        setPhotoFiles((prev) => ({
            ...prev,
            [index]: info?.file || null,
        }));
    };

    
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
                                name="kode_pos"
                            >
                                <Select
                                    allowClear={true}
                                    // onClear={onClearKodePos}
                                    onKeyPress={inputNumberOnly}
                                    showSearch
                                    // options={kodePosList.map((kode) => {
                                    // 	return {
                                    // 		label: kode,
                                    // 		value: kode,
                                    // 	};
                                    // })}
                                    // onChange={onKodePosChange}
                                    // onSearch={onKodePosSearch}
                                    // disabled={isFormDisable}
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
                                    readOnly={true}
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
                                    // options={kelurahanList}
                                    // onChange={onKelurahanChange}
                                    // onSearch={onKelurahanSearch}
                                    // filterOption={(input, option) => {
                                    // 	return option.label
                                    // 		.toLowerCase()
                                    // 		.includes(input.toLowerCase());
                                    // }}
                                    // disabled={isFormDisable}
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
                            onInput={inputNumberOnly}
                            // onChange={onRtChange}
                            // readOnly={isFormDisable}
                        />
                    </Form.Item>
                </Col>
                <Col md={4} xs={12}>
                    <Form.Item label="RW Domisili" name="rw">
                        <Input
                            maxLength={3}
                            onInput={inputNumberOnly}
                            // readOnly={isFormDisable}
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
                            readOnly={true} />
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
                    // <Address label="Domisili" name="alamatDomSesuai" form={form} />
                    <>
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
                                    name="kode_pos"
                                >
                                    <Select
                                        allowClear={true}
                                        // onClear={onClearKodePos}
                                        onKeyPress={inputNumberOnly}
                                        showSearch
                                        // options={kodePosList.map((kode) => {
                                        // 	return {
                                        // 		label: kode,
                                        // 		value: kode,
                                        // 	};
                                        // })}
                                        // onChange={onKodePosChange}
                                        // onSearch={onKodePosSearch}
                                        // disabled={isFormDisable}
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
                                        readOnly={true}
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
                                        // options={kelurahanList}
                                        // onChange={onKelurahanChange}
                                        // onSearch={onKelurahanSearch}
                                        // filterOption={(input, option) => {
                                        // 	return option.label
                                        // 		.toLowerCase()
                                        // 		.includes(input.toLowerCase());
                                        // }}
                                        // disabled={isFormDisable}
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
                                onInput={inputNumberOnly}
                                // onChange={onRtChange}
                                // readOnly={isFormDisable}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={4} xs={12}>
                        <Form.Item label="RW Domisili" name="rw">
                            <Input
                                maxLength={3}
                                onInput={inputNumberOnly}
                                // readOnly={isFormDisable}
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
                                readOnly={true} />
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