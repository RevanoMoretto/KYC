import { Col, Form, Input, Row, Select, Spin } from 'antd'
import classes from './style.module.less';
import { useEffect, useState } from 'react';
import { inputAlphabetAndSpaceOnly, inputNumberOnly, onPasteClearInput } from '../../utils/general';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKodePos } from '../../redux/slice/kyc/action/fetch_kode_pos';
import { saveData } from '../../redux/slice/saveData/saveDataSlice';

function EmergencyContact() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { TextArea } = Input;

  const [filteredRelationWithNasabahOptions, setFilteredRelationWithNasabahOptions] = useState([])
  const [kodePosOptions, setKodePosOptions] = useState([])
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

  const handlePaste = (key, value) => (e) => {
    onPasteClearInput(form, key, value)(e)
    dispatch(saveData({
      subtab: "emergency_contact",
      fields: {
        [key]: value
      }
    }))
  }

  // HANDLE CHANGE FUNCTION SECTION
  const handleChangeNamaEc = (e) => {
    const value = e.target.value

    dispatch(saveData({
      subtab: "emergency_contact",
      fields: {
        nama_ec: value
      }
    }))
  }

  const handleChangeNomorHp1 = (e) => {
    const value = e.target.value

    dispatch(saveData({
      subtab: "emergency_contact",
      fields: {
        nomor_hp_1_ec: value
      }
    }))
  }

  const handleChangeNomorHp2 = (e) => {
    const value = e.target.value

    dispatch(saveData({
      subtab: "emergency_contact",
      fields: {
        nomor_hp_2_ec: value
      }
    }))
  }

  const handleChangeAlamatEc = (e) => {
    const value = e.target.value

    dispatch(saveData({
      subtab: "emergency_contact",
      fields: {
        alamat_ec: value
      }
    }))
  }

  const handleChangeRtEc = (e) => {
    const value = e.target.value

    dispatch(saveData({
      subtab: "emergency_contact",
      fields: {
        rt_ec: value
      }
    }))
  }

  const handleChangeRwEc = (e) => {
    const value = e.target.value

    dispatch(saveData({
      subtab: "emergency_contact",
      fields: {
        rw_ec: value
      }
    }))
  }

  const handleChangeHubDeb = (e) => {
    // for disabled auto focus when select an option and clear value
    setTimeout(() => {
      document.activeElement?.blur();
    }, 0)

    // if user reset value using clear icon in select field
    if(e == undefined){
      setFilteredRelationWithNasabahOptions(dataHubunganWithNasabah)
      dispatch(saveData({
        subtab: "emergency_contact",
        fields: {
          hubungan_ec_code: "",
          hubungan_ec_desc: ""
        }
      }))

      return
    }

    const selectedData = dataHubunganWithNasabah.find((item) => item.value == e)
    setFilteredRelationWithNasabahOptions(dataHubunganWithNasabah)

    dispatch(saveData({
      subtab: "emergency_contact",
      fields: {
        hubungan_ec_code: selectedData.value,
        hubungan_ec_desc: selectedData.label
      }
    }))
  }

  const handleChangeKodePos = (e) => {
    // for disabled auto focus when select an option and clear value
    setTimeout(() => {
      document.activeElement?.blur();
    }, 0)

    // if user reset value using clear icon in select field
    if(e == undefined){
      dispatch(saveData({
        subtab: "emergency_contact",
        fields: {
          kodepos_ec_code: "",
          kelurahan_ec_code: "",
          kelurahan_ec_desc: "",
          kecamatan_ec_code: "",
          kecamatan_ec_desc: "",
          kabkota_ec_code: "",
          kabkota_ec_desc: "",
          provinsi_ec_code: "",
          provinsi_ec_desc: ""
        }
      }))

      form.setFieldsValue({
        kode_pos_ec: undefined,
        kelurahan_ec: "",
        kecamatan_ec: "",
        kab_kota_ec: "",
        provinsi_ec: ""
      })

      return
    }

    const [zip, kel] = e.split("-")
    const selected = dataKodePos.data.find(
      (e) => e.zip_code === zip && e.kelurahan_id === kel
    )

    dispatch(saveData({
      subtab: "emergency_contact",
      fields: {
        kodepos_ec_code: selected.zip_code,
        kelurahan_ec_code: selected.kelurahan_id,
        kelurahan_ec_desc: selected.kelurahan_name,
        kecamatan_ec_code: selected.kecamatan_id,
        kecamatan_ec_desc: selected.kecamatan_name,
        kabkota_ec_code: selected.kab_kot_id,
        kabkota_ec_desc: selected.kab_kot_name,
        provinsi_ec_code: selected.provinsi_id,
        provinsi_ec_desc: selected.provinsi_name
      }
    }))

    form.setFieldsValue({
      kode_pos_ec: `${selected.zip_code} | ${selected.kelurahan_name}`,
      kelurahan_ec: selected.kelurahan_name,
      kecamatan_ec: selected.kecamatan_name,
      kab_kota_ec: selected.kab_kot_name,
      provinsi_ec: selected.provinsi_name
    })
  }
  // END HANDLE CHANGE FUNCTION SECTION

  return (
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
              onKeyDown={inputAlphabetAndSpaceOnly}
              onPaste={handlePaste("nama_ec", "")}
              autoComplete="off"
              onChange={handleChangeNamaEc}
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
              autoComplete="off"
              onChange={handleChangeNomorHp1}
              onPaste={handlePaste("nomor_hp_1_ec", "")}
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
              autoComplete="off"
              onChange={handleChangeNomorHp2}
              onPaste={handlePaste("nomor_hp_2_ec", "")}
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
                  autoComplete="off"
                  onChange={handleChangeAlamatEc}
                  onPaste={handlePaste("alamat_ec", "")}
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
                  autoComplete="off"
                  onChange={handleChangeRtEc}
                  onPaste={handlePaste("rt_ec", "")}
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
                  autoComplete="off"
                  onChange={handleChangeRwEc}
                  onPaste={handlePaste("rw_ec", "")}
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
                  onChange={handleChangeHubDeb}
                  dropdownRender={menu => (
                    <>
                      {loadingHubDeb ? (
                        <div className={classes.loading_spin}>
                          <Spin size="default" />
                        </div>
                      ) : (
                        menu
                      )}
                    </>
                  )}
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
              onChange={handleChangeKodePos}
              className={classes.select_field_ec}
              onKeyDown={inputNumberOnly}
              type="tel"
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

        <Col xs={24} md={10}>
          <Form.Item 
            label="Kelurahan Emergency Contact" 
            name="kelurahan_ec"
            className={classes.wrap_form_item}
          >
            <Input 
              readOnly
              className={classes.readonly_input_field} 
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default EmergencyContact