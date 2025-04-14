import { Col, Form, Input, Row, Select } from 'antd'
import classes from './style.module.less';
import React, { useState } from 'react'

function EmergencyContact() {
  const [form] = Form.useForm();

  const { TextArea } = Input;

  const [selectedItems, setSelectedItems] = useState([]);
  
  const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
  
  const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));

  return (
    <Form layout="vertical" form={form}>
      <Row gutter={17}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Nama Emergency Contact"
            name="nama_ec"
            className={classes.wrap_input_field_ec}
            >
            <Input 
              className={classes.input_field_ec}
            />
          </Form.Item>

          <Form.Item
            label="No. HP 1/No. Telephone 1 Emergency Contact" 
            name="nomor_hp_1_ec"
            className={classes.wrap_input_field_ec}
          >
            <Input 
              className={classes.input_field_ec}
            />
          </Form.Item>

          <Form.Item
            label="No. HP 2/No. Telephone 2 Emergency Contact" 
            name="nomor_hp_2_ec"
            className={classes.wrap_input_field_ec}
          >
            <Input 
              className={classes.input_field_ec}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Row>
            <Col xs={24} md={24}>
              <Form.Item 
                label="Alamat Emergency Contact" 
                name="alamat_ec"
                className={classes.wrap_textarea_field_ec}
              >
                <TextArea
                  showCount
                  maxLength={250}
                  onChange={() => { console.log("eunha")} }
                  placeholder="You can text anything here :))"
                  className={classes.text_area}
                  style={{ resize: "none" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={13}>
            <Col xs={24} md={12}>
              <Form.Item
                label="RT" 
                name="rt_ec"
                className={classes.wrap_input_field_ec}
              >
                <Input 
                  className={classes.input_field_ec}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="RW" 
                name="rw_ec"
                className={classes.wrap_input_field_ec}
              >
                <Input 
                  className={classes.input_field_ec}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>

      </Row>

      {/* <Form.Item 
        label="Hubungan dengan Debitur" 
        name="hub_debitur"
        className={classes.wrap_select_field_ec}
      >
        <Select
          showSearch
          placeholder="PILIH HUBUNGAN DEBITUR"
          value={selectedItems}
          onChange={setSelectedItems}
          className={classes.select_field_ec}
          options={filteredOptions.map(item => ({
            value: item,
            label: item,
          }))}
        />
      </Form.Item> */}
    </Form>
  )
}

export default EmergencyContact