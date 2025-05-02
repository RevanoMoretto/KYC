import React, { useState } from 'react'
import classes from './style.module.less';
import { Col, Form, Input, Row, Select } from 'antd';
import RenderIf from '../../utils/renderif';
import UploadImg from '../Helper/UploadImg';

function ObjectPembiayaan() {
  const [form] = Form.useForm()

  const [test, setTest] = useState("")

  const options = [
    { label: 'Eunha', value: 'Eunha' },
    { label: 'Sowon', value: 'Sowon' },
    { label: 'Yerin', value: 'Yerin' },
    { label: 'Umji', value: 'Umji' },
  ];

  const handleChangeCaraBayar = (e) => {
    console.log("result cara bayar: ", e)
    setTest(e)
  }

  const handleChangeBank = (e) => {
    console.log("result select bank: ", e)
  }

  const handleChangeSumberDana = (e) => {
    console.log("result sumber dana pembayaran dp: ", e)
  }
  
  const handleChangeWarnaPlat = (e) => {
    console.log("result warna plat: ", e)
  }

  const handleChangeKetersediaanUnit = (e) => {
    console.log("result ketersediaan unit: ", e)
  }

  const handleChangeProductMarketing = (e) => {
    console.log("result product marketing: ", e)
  }

  const handleChangeSumberNasabah = (e) => {
    console.log("result sumber nasabah: ", e)
  }

  return (
    <>
      <Form layout="vertical" form={form}>
        <Row gutter={10}>
          <Col xs={24} md={8}>
            <Form.Item 
              label="Cara Bayar Angsuran" 
              name="cara_bayar_angsuran"
              className={classes.wrap_form_item}
            >
              <Select
                showSearch
                allowClear
                placeholder="PILIH CARA BAYAR"
                onChange={handleChangeCaraBayar}
                className={classes.select_field_ec}
                options={options}
              />
            </Form.Item>

            {/* Render if cara bayar angsuran == "AUTO DEBET" */}
            <RenderIf isTrue={test == "Yerin"}>
              <Form.Item 
                label="Bank" 
                name="bank"
                className={classes.wrap_form_item}
              >
                <Select
                  showSearch
                  allowClear
                  placeholder="PILIH BANK"
                  onChange={handleChangeBank}
                  className={classes.select_field_ec}
                  options={options}
                />
              </Form.Item>

              <Form.Item
                label="Account No." 
                name="account_no"
                className={classes.wrap_form_item}
              >
                <Input 
                  className={classes.input_field_ec}
                />
              </Form.Item>
              
              <Form.Item
                label="Account Name" 
                name="account_name"
                className={classes.wrap_form_item}
              >
                <Input 
                  className={classes.input_field_ec}
                />
              </Form.Item>
            </RenderIf>

            <Form.Item 
              label="Sumber Dana Pembayaran DP" 
              name="sumber_dana_pembayaran"
              className={classes.wrap_form_item}
            >
              <Select
                showSearch
                allowClear
                placeholder="PILIH SUMBER DANA"
                onChange={handleChangeSumberDana}
                className={classes.select_field_ec}
                options={options}
              />
            </Form.Item>

            <Form.Item 
              label="Warna Plat" 
              name="warna_plat"
              className={classes.wrap_form_item}
            >
              <Select
                showSearch
                allowClear
                placeholder="PILIH WARNA PLAT"
                onChange={handleChangeWarnaPlat}
                className={classes.select_field_ec}
                options={options}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item 
              label="Ketersediaan Unit" 
              name="ketersediaan_unit"
              className={classes.wrap_form_item}
            >
              <Select
                showSearch
                allowClear
                placeholder="PILIH KETERSEDIAAN UNIT"
                onChange={handleChangeKetersediaanUnit}
                className={classes.select_field_ec}
                options={options}
              />
            </Form.Item>
            
            <Form.Item 
              label="Product Marketing" 
              name="product_marketing"
              className={classes.wrap_form_item}
            >
              <Select
                showSearch
                allowClear
                placeholder="PILIH PRODUCT MARKETING"
                onChange={handleChangeProductMarketing}
                className={classes.select_field_ec}
                options={options}
              />
            </Form.Item>

            <Form.Item 
              label="Sumber Nasabah" 
              name="sumber_nasabah"
              className={classes.wrap_form_item}
            >
              <Select
                showSearch
                allowClear
                placeholder="PILIH SUMBER NASABAH"
                onChange={handleChangeSumberNasabah}
                className={classes.select_field_ec}
                options={options}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item 
              label="SPK Dealer"
              className={classes.wrap_img_field} 
            >
              <UploadImg />
            </Form.Item>

            <Form.Item 
              label="SPK Karoseri & Spesifikasi Karoseri"
              className={classes.wrap_img_field}  
            >
              <UploadImg />
            </Form.Item>

            <Form.Item 
              label="Foto saat Nasabah tanda tangan aplikasi" 
              className={classes.wrap_form_item}
            >
              <UploadImg />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default ObjectPembiayaan