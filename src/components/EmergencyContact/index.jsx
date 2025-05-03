import { Col, Form, Input, Row, Select } from 'antd'
import classes from './style.module.less';
import KycDetailStorage from '../../utils/kyc_detail_storage';
import { useEffect } from 'react';
import { updateKycDetailEmergencyContact } from '../../utils/general';

function EmergencyContact() {
  const [form] = Form.useForm();
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

  useEffect(() => {
    form.setFieldsValue({
      nama_ec: nama_emergency_contact,
      nomor_hp_1_ec: nohp1_emergency_contact,
      nomor_hp_2_ec: nohp2_emergency_contact,
      rt_ec: rt_emergency_contact,
      rw_ec: rw_emergency_contact,
      alamat_ec: alamat_emergency_contact,
      hub_debitur_ec: hubungan_emergency_contact_desc,
      kode_pos_ec: kodepos_emergency_contact_code,
      kelurahan_ec: kelurahan_emergency_contact_desc,
      kecamatan_ec: kecamatan_emergency_contact_desc,
      kab_kota_ec: kabkota_emergency_contact_desc,
      provinsi_ec: provinsi_emergency_contact_desc
    })
  }, [])

  const options = [
    { label: 'Eunha', value: 'Eunha' },
    { label: 'Sowon', value: 'Sowon' },
    { label: 'Yerin', value: 'Yerin' },
    { label: 'Umji', value: 'Umji' },
  ];

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

  const handleChangeHubDeb = (e) => {
    // if user reset value from clear icon in select field
    if(e == undefined){
      updateKycDetailEmergencyContact({ 
        hubungan_emergency_contact_code: "",
        hubungan_emergency_contact_desc: "" 
      })

      return
    }

    updateKycDetailEmergencyContact({ 
      hubungan_emergency_contact_code: "200",
      hubungan_emergency_contact_desc: e 
    })
  }

  const handleChangeKodePos = (e) => {
    console.log("result change kode pos: ", e)
  }

  const handleSearchKodePos = (e) => {
    console.log("result search kode pos: ", e)
  }

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
              onChange={handleChangeNomorHp1}
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
                  maxLength={250}
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
                  options={options}
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
              onChange={handleChangeKodePos}
              onSearch={handleSearchKodePos}
              className={classes.select_field_ec}
              // options={options}
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

export default EmergencyContact