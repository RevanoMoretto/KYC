import { Col, Form, Input, Row, Select, Spin } from 'antd'
import classes from './style.module.less';
import KycDetailStorage from '../../utils/kyc_detail_storage';
import { useEffect, useState } from 'react';
import { inputAlphabetAndSpaceOnly, inputNumberOnly, updateKycDetailEmergencyContact } from '../../utils/general';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelationWithNasabah } from '../../redux/slice/kyc/action/fetch_hubungan_debitur';
import { fetchKodePos } from '../../redux/slice/kyc/action/fetch_kode_pos';
import notify from '../../utils/notification';

function EmergencyContact() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { TextArea } = Input;

  const kyc_detail = KycDetailStorage.data || {}
  const { detail } = kyc_detail || {}
  const { kyc } = detail || {}
  const { emergency_contact } = kyc || {}
  const { 
    nama_emergency_contact,
    nohp1_emergency_contact,
    nohp2_emergency_contact,
    rt_emergency_contact,
    rw_emergency_contact,
    alamat_emergency_contact,
    hubungan_emergency_contact_desc,
    kodepos_emergency_contact_code,
    kelurahan_emergency_contact_desc,
    kecamatan_emergency_contact_desc,
    kabkota_emergency_contact_desc,
    provinsi_emergency_contact_desc
  } = emergency_contact || {}

  const [filteredRelationWithNasabahOptions, setFilteredRelationWithNasabahOptions] = useState([])
  const [kodePosOptions, setKodePosOptions] = useState([]);
  const [isSearching, setIsSearching] = useState(false)

  const { data: dataHubunganWithNasabah, loading: loadingHubDeb } = useSelector((state) => state.kyc.relationWithNasabah);
  const { data: dataKodePos, loading: loadingKodePos } = useSelector((state) => state.kyc.kodePos);

  // for handle auto fill values
  useEffect(() => {
    setFilteredRelationWithNasabahOptions(dataHubunganWithNasabah)

    form.setFieldsValue({
      nama_ec: nama_emergency_contact,
      nomor_hp_1_ec: nohp1_emergency_contact,
      nomor_hp_2_ec: nohp2_emergency_contact,
      rt_ec: rt_emergency_contact,
      rw_ec: rw_emergency_contact,
      alamat_ec: alamat_emergency_contact,
      hub_debitur_ec: hubungan_emergency_contact_desc,
      kode_pos_ec: `${kodepos_emergency_contact_code} | ${kelurahan_emergency_contact_desc}`,
      kelurahan_ec: kelurahan_emergency_contact_desc,
      kecamatan_ec: kecamatan_emergency_contact_desc,
      kab_kota_ec: kabkota_emergency_contact_desc,
      provinsi_ec: provinsi_emergency_contact_desc
    })
  }, [dataHubunganWithNasabah])

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

  useEffect(async () => {
    try {
      await dispatch(fetchRelationWithNasabah()).unwrap()
    } catch (err) {
      console.error("Error terjadi pada saat fetching data hubungan dengan nasabah kyc, message: ", err);
      notify("error", "Error", `An error occurred from ${err.url}`)
    }
  }, [])

  const handleChangeNamaEc = (e) => {
    const value = e.target.value

    updateKycDetailEmergencyContact({ nama_emergency_contact: value })
  }

  const handleChangeNomorHp1 = (e) => {
    const value = e.target.value

    updateKycDetailEmergencyContact({ nohp1_emergency_contact: value })
  }

  const handleChangeNomorHp2 = (e) => {
    const value = e.target.value

    updateKycDetailEmergencyContact({ nohp2_emergency_contact: value })
  }

  const handleChangeAlamat = (e) => {
    const value = e.target.value

    updateKycDetailEmergencyContact({ alamat_emergency_contact: value })
  }

  const handleChangeRt = (e) => {
    const value = e.target.value

    updateKycDetailEmergencyContact({ rt_emergency_contact: value })
  }

  const handleChangeRw = (e) => {
    const value = e.target.value

    updateKycDetailEmergencyContact({ rw_emergency_contact: value })
  }

  const onPasteClearInput = (e) => {
    e.preventDefault()
    form.setFieldsValue({ nama_ec: "" })
  };

  const handleChangeHubDeb = (e) => {
    // if user reset value using clear icon in select field
    if(e == undefined){
      setFilteredRelationWithNasabahOptions(dataHubunganWithNasabah)
      updateKycDetailEmergencyContact({ 
        hubungan_emergency_contact_code: "",
        hubungan_emergency_contact_desc: "" 
      })

      return
    }

    // for disabled auto focus when select an option
    setTimeout(() => {
      document.activeElement?.blur();
    }, 0)

    const selectedData = dataHubunganWithNasabah.find((item) => item.value == e)
    setFilteredRelationWithNasabahOptions(dataHubunganWithNasabah)

    updateKycDetailEmergencyContact({ 
      hubungan_emergency_contact_code: selectedData.value,
      hubungan_emergency_contact_desc: selectedData.label
    })
  }

  const handleSearchHubDeb = (value) => {
    const filtered = dataHubunganWithNasabah.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredRelationWithNasabahOptions(filtered)
  };

  const handleChangeKodePos = (e) => {
    // if user reset value using clear icon in select field
    if(e == undefined){
      updateKycDetailEmergencyContact({
        kodepos_emergency_contact_code: "",
        kelurahan_emergency_contact_code: "",
        kelurahan_emergency_contact_desc: "",
        kecamatan_emergency_contact_code: "",
        kecamatan_emergency_contact_desc: "",
        kabkota_emergency_contact_code: "",
        kabkota_emergency_contact_desc: "",
        provinsi_emergency_contact_code: "",
        provinsi_emergency_contact_desc: ""
    })

      form.setFieldsValue({
        kode_pos_ec: undefined,
        kelurahan_ec: "",
        kecamatan_ec: "",
        kab_kota_ec: "",
        provinsi_ec: ""
      })

      return
    }

    // for disabled auto focus when select an option
    setTimeout(() => {
      document.activeElement?.blur();
    }, 0)

    const [zip, kel] = e.split("-")
    const selected = dataKodePos.data.find(
      (e) => e.zip_code === zip && e.kelurahan_id === kel
    )

    updateKycDetailEmergencyContact({
      kodepos_emergency_contact_code: selected.zip_code,
      kelurahan_emergency_contact_code: selected.kelurahan_id,
      kelurahan_emergency_contact_desc: selected.kelurahan_name,
      kecamatan_emergency_contact_code: selected.kecamatan_id,
      kecamatan_emergency_contact_desc: selected.kecamatan_name,
      kabkota_emergency_contact_code: selected.kab_kot_id,
      kabkota_emergency_contact_desc: selected.kab_kot_name,
      provinsi_emergency_contact_code: selected.provinsi_id,
      provinsi_emergency_contact_desc: selected.provinsi_name
  })

    form.setFieldsValue({
      kode_pos_ec: `${selected.zip_code} | ${selected.kelurahan_name}`,
      kelurahan_ec: selected.kelurahan_name,
      kecamatan_ec: selected.kecamatan_name,
      kab_kota_ec: selected.kab_kot_name,
      provinsi_ec: selected.provinsi_name
    })
  }

  const handleSearchKodePos = (e) => {
    if(e.length >= 3 && e.length <= 5){
      dispatch(fetchKodePos(e))
      setIsSearching(false)
    }else{
      setKodePosOptions([])
    }
  }

  return (
    <>
      {
        loadingHubDeb ? (
          <div style={{ textAlign: "center", padding: 50 }}>
            <Spin size="default" />
            <p style={{ margin: "15px 0 10px 0", fontSize: "15px", fontWeight: "bold" }}>Mohon tunggu...</p>
          </div>
        ) : (
          <Form layout="vertical" form={form}>
            <Row gutter={10}>
              <Col xs={24} md={10}>
                <Form.Item
                  label="Nama Emergency Contact"
                  name="nama_ec"
                  className={classes.wrap_form_item}
                  >
                  <Input 
                    className={classes.input_field_ec}
                    onChange={handleChangeNamaEc}
                    onKeyDown={inputAlphabetAndSpaceOnly}
                    onPaste={onPasteClearInput}
                  />
                </Form.Item>

                <Form.Item
                  label="No. HP 1/No. Telephone 1 Emergency Contact" 
                  name="nomor_hp_1_ec"
                  className={classes.wrap_form_item}
                >
                  <Input 
                    className={classes.input_field_ec}
                    onChange={handleChangeNomorHp1}
                    onKeyDown={inputNumberOnly}
                    type="tel"
                    maxLength={13}
                  />
                </Form.Item>

                <Form.Item
                  label="No. HP 2/No. Telephone 2 Emergency Contact" 
                  name="nomor_hp_2_ec"
                  className={classes.wrap_form_item}
                >
                  <Input 
                    className={classes.input_field_ec}
                    onChange={handleChangeNomorHp2}
                    onKeyDown={inputNumberOnly}
                    type="tel"
                    maxLength={13}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={14}>
                <Row>
                  <Col xs={24} md={24}>
                    <Form.Item 
                      label="Alamat Emergency Contact" 
                      name="alamat_ec"
                      className={classes.wrap_form_item}
                    >
                      <TextArea
                        showCount
                        maxLength={50}
                        onChange={handleChangeAlamat}
                        className={classes.text_area}
                        style={{ resize: "none" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col xs={24} md={4}>
                    <Form.Item
                      label="RT" 
                      name="rt_ec"
                      className={classes.wrap_form_item}
                    >
                      <Input 
                        className={classes.input_field_ec}
                        onChange={handleChangeRt}
                        onKeyDown={inputNumberOnly}
                        type="tel"
                        maxLength={3}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={4}>
                    <Form.Item
                      label="RW" 
                      name="rw_ec"
                      className={classes.wrap_form_item}
                    >
                      <Input 
                        className={classes.input_field_ec}
                        onChange={handleChangeRw}
                        onKeyDown={inputNumberOnly}
                        type="tel"
                        maxLength={3}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={16}>
                    <Form.Item 
                      label="Hubungan dengan Debitur" 
                      name="hub_debitur_ec"
                      className={classes.wrap_form_item}
                    >
                      <Select
                        showSearch
                        allowClear
                        placeholder="PILIH HUBUNGAN DEBITUR"
                        onChange={handleChangeHubDeb}
                        className={classes.select_field_ec}
                        options={filteredRelationWithNasabahOptions}
                        onSearch={handleSearchHubDeb}
                        filterOption={false}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={10}>
              <Col xs={24} md={14}>
                <Form.Item 
                  label="Kode Pos Emergency Contact" 
                  name="kode_pos_ec"
                  className={classes.wrap_form_item}
                >
                  <Select
                    showSearch
                    allowClear
                    placeholder="PILIH KODE POS"
                    onFocus={() => setIsSearching(true)}
                    onDropdownVisibleChange={(open) => {
                      if(!open){
                        setIsSearching(false)
                        setKodePosOptions([])
                      }
                    }}
                    onChange={handleChangeKodePos}
                    onSearch={handleSearchKodePos}
                    className={classes.select_field_ec}
                    onKeyDown={inputNumberOnly}
                    type="tel"
                    dropdownRender={menu => (
                      <>
                        {isSearching && !loadingKodePos && (
                          <div style={{ padding: 5, fontSize: 12, color: '#888' }}>
                            Ketik Minimal 3 Angka Untuk Mencari Kode Pos
                          </div>
                        )}

                        {loadingKodePos ? (
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

              <Col xs={24} md={10}>
                <Form.Item 
                  label="Kelurahan Emergency Contact" 
                  name="kelurahan_ec"
                  className={classes.wrap_form_item}
                >
                  <Input 
                    readOnly
                    className={classes.readonly_input_field} 
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={11}>
              <Col xs={24} md={8}>
                <Form.Item 
                  label="Kecamatan Emergency Contact" 
                  name="kecamatan_ec"
                  className={classes.wrap_form_item}
                >
                  <Input 
                    readOnly
                    className={classes.readonly_input_field} 
                  />
                </Form.Item>
              </Col>
    
              <Col xs={24} md={8}>
                <Form.Item 
                  label="Kab/Kota Emergency Contact" 
                  name="kab_kota_ec"
                  className={classes.wrap_form_item}
                >
                  <Input 
                    readOnly
                    className={classes.readonly_input_field} 
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={8}>
                <Form.Item 
                  label="Provinsi Emergency Contact" 
                  name="provinsi_ec"
                  className={classes.wrap_form_item}
                >
                  <Input 
                    readOnly
                    className={classes.readonly_input_field} 
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )
      }
    </>
  )
}

export default EmergencyContact