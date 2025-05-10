import { Col, Form, Input, Row, Select, Spin } from 'antd'
import classes from './style.module.less';
import { useEffect, useState } from 'react';
import { inputAlphabetAndSpaceOnly, inputNumberOnly } from '../../utils/general';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelationWithNasabah } from '../../redux/slice/kyc/action/fetch_hubungan_debitur';
import { fetchKodePos } from '../../redux/slice/kyc/action/fetch_kode_pos';
import notify from '../../utils/notification';
import { saveData } from '../../redux/slice/save_data/saveDataSlice';

function EmergencyContact() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { TextArea } = Input;

  const [filteredRelationWithNasabahOptions, setFilteredRelationWithNasabahOptions] = useState([])
  const [kodePosOptions, setKodePosOptions] = useState([]);
  const [isSearching, setIsSearching] = useState(false)

  const { data: dataHubunganWithNasabah, loading: loadingHubDeb } = useSelector((state) => state.kyc.relationWithNasabah);
  const { data: dataKodePos, loading: loadingKodePos } = useSelector((state) => state.kyc.kodePos);

  // for handle options hubungan dengan nasabah
  useEffect(() => {
    setFilteredRelationWithNasabahOptions(dataHubunganWithNasabah)
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

  const handleFormChange = (changedValues, values) => {
    let selectedHubunganDebitur = {}
    let selectedDataKodePos = {}

    if(changedValues.hub_debitur_ec){
      setFilteredRelationWithNasabahOptions(dataHubunganWithNasabah)

      // for disabled auto focus when select an option
      setTimeout(() => {
        document.activeElement?.blur();
      }, 0)

      selectedHubunganDebitur = dataHubunganWithNasabah.find((item) => item.value == changedValues.hub_debitur_ec)
    }

    if(changedValues.kode_pos_ec){
      // for disabled auto focus when select an option
      setTimeout(() => {
        document.activeElement?.blur();
      }, 0)

      const [zip, kel_code] = changedValues.kode_pos_ec.split("-")
      selectedDataKodePos = dataKodePos.data.find(
        (e) => e.zip_code === zip && e.kelurahan_id === kel_code
      )

      form.setFieldsValue({
        kode_pos_ec: `${selectedDataKodePos.zip_code} | ${selectedDataKodePos.kelurahan_name}`,
        kelurahan_ec: selectedDataKodePos.kelurahan_name,
        kecamatan_ec: selectedDataKodePos.kecamatan_name,
        kab_kota_ec: selectedDataKodePos.kab_kot_name,
        provinsi_ec: selectedDataKodePos.provinsi_name
      })
    }

    dispatch(saveData({
      subtab: "emergency_contact",
      fields: {
        nama_ec: values.nama_ec || "",
        nomor_hp_1_ec: values.nomor_hp_1_ec || "",
        nomor_hp_2_ec: values.nomor_hp_2_ec || "",
        alamat_ec: values.alamat_ec || "",
        rt_ec: values.rt_ec || "",
        rw_ec: values.rw_ec || "",
        hubungan_ec_code: selectedHubunganDebitur?.value || "",
        hubungan_ec_desc: selectedHubunganDebitur?.label || "",
        kodepos_ec_code: selectedDataKodePos?.zip_code || "",
        kelurahan_ec_code: selectedDataKodePos?.kelurahan_id || "",
        kelurahan_ec_desc: selectedDataKodePos?.kelurahan_name || "",
        kecamatan_ec_code: selectedDataKodePos?.kecamatan_id || "",
        kecamatan_ec_desc: selectedDataKodePos?.kecamatan_name || "",
        kabkota_ec_code: selectedDataKodePos?.kab_kot_id || "",
        kabkota_ec_desc: selectedDataKodePos?.kab_kot_name || "",
        provinsi_ec_code: selectedDataKodePos?.provinsi_id || "",
        provinsi_ec_desc: selectedDataKodePos?.provinsi_name || ""
      }
    }))
  }

  const onPasteClearInput = (e) => {
    e.preventDefault()
    form.setFieldsValue({ nama_ec: "" })
  };

  const handleSearchHubDeb = (value) => {
    const filtered = dataHubunganWithNasabah.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredRelationWithNasabahOptions(filtered)
  };

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
          <Form layout="vertical" form={form} onValuesChange={handleFormChange}>
            <Row gutter={10}>
              <Col xs={24} md={10}>
                <Form.Item
                  label="Nama Emergency Contact"
                  name="nama_ec"
                  className={classes.wrap_form_item}
                  >
                  <Input 
                    className={classes.input_field_ec}
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
                        onKeyDown={inputNumberOnly}
                        type="tel"
                        maxLength={3}
                        autoComplete={false}
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
                        onKeyDown={inputNumberOnly}
                        type="tel"
                        maxLength={3}
                        autoComplete={false}
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
                        className={classes.select_field_ec}
                        options={filteredRelationWithNasabahOptions}
                        onSearch={handleSearchHubDeb}
                        filterOption={false}
                        onClear={() => {
                          setFilteredRelationWithNasabahOptions(dataHubunganWithNasabah)

                          // for disabled auto focus when clear value
                          setTimeout(() => {
                            document.activeElement?.blur();
                          }, 0)
                        }}
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
                    onSearch={handleSearchKodePos}
                    onClear={() => {
                      setKodePosOptions([])

                      // for disabled auto focus when clear value
                      setTimeout(() => {
                        document.activeElement?.blur();
                      }, 0)

                      form.setFieldsValue({
                        kelurahan_ec: "",
                        kecamatan_ec: "",
                        kab_kota_ec: "",
                        provinsi_ec: ""
                      })
                    }}
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