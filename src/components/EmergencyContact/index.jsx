import { Col, Form, Input, Row, Select } from 'antd'
import classes from './style.module.less';
import React from 'react'

function EmergencyContact() {
  const [form] = Form.useForm();

  const { TextArea } = Input;

  const options = [
    { label: 'Eunha', value: 'Eunha' },
    { label: 'Sowon', value: 'Sowon' },
    { label: 'Yerin', value: 'Yerin' },
    { label: 'Umji', value: 'Umji' },
  ];

  const handleChangeHubDeb = (e) => {
    console.log("result change hub deb: ", e)
  }

  const handleChangeKodePos = (e) => {
    console.log("result change kode pos: ", e)
  }

  const handleSearchKodePos = (e) => {
    console.log("result search kode pos: ", e)
  }

  return (
    <Form layout="vertical" form={form}>
      <Row gutter={17}>
        <Col xs={24} md={10}>
          <Form.Item
            label="Nama Emergency Contact"
            name="nama_ec"
            className={classes.wrap_form_item}
            >
            <Input 
              className={classes.input_field_ec}
            />
          </Form.Item>

          <Form.Item
            label="No. HP 1/No. Telephone 1 Emergency Contact" 
            name="nomor_hp_1_ec"
            className={classes.wrap_form_item}
          >
            <Input 
              className={classes.input_field_ec}
            />
          </Form.Item>

          <Form.Item
            label="No. HP 2/No. Telephone 2 Emergency Contact" 
            name="nomor_hp_2_ec"
            className={classes.wrap_form_item}
          >
            <Input 
              className={classes.input_field_ec}
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
                  onChange={() => { console.log("eunha")} }
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

      <Row gutter={17}>
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

      <Row gutter={13}>
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