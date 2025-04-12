import { Button, Col, Form, Input, Row } from 'antd'
import classes from './style.module.less';
import React, { useEffect } from 'react'
import { BiDetail } from "react-icons/bi";

function Dashboard() {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      nomor_aplikasi: "aaaaaaa",
      nama_ktp: "bbbbbb",
      tipe_nasabah: "cccccc",
      tgl_aplikasi: "2022/07/12 03:41:11",
      source_order: "dddddd",
      cabang: "eeeeee"
    })
  }, [])

  return (
    <Form layout="vertical" form={form}>
      <Row gutter={17}>
        <Col xs={24} md={12}>
          <Form.Item
            label="NOMOR APLIKASI"
            className={classes.wrap_input_field} 
            name="nomor_aplikasi"
          >
            <Input 
              readOnly
              className={classes.input_field} 
            />
          </Form.Item>

          <Form.Item
            label="NAMA SESUAI KTP" 
            className={classes.wrap_input_field} 
            name="nama_ktp"
          >
            <Input 
              readOnly
              className={classes.input_field} 
            />
          </Form.Item>

          <Form.Item
            label="TIPE NASABAH" 
            className={classes.wrap_input_field} 
            name="tipe_nasabah"
          >
            <Input 
              readOnly
              className={classes.input_field} 
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item 
            label="TANGGAL APLIKASI" 
            className={classes.wrap_input_field} 
            name="tgl_aplikasi"
          >
            <Input 
              readOnly
              className={classes.input_field} 
            />
          </Form.Item>

          <Form.Item
            label="SOURCE ORDER" 
            className={classes.wrap_input_field} 
            name="source_order"
          >
            <Input 
              readOnly
              className={classes.input_field} 
            />
          </Form.Item>

          <Form.Item
            label="CABANG" 
            className={classes.wrap_input_field} 
            name="cabang"
          >
            <Input 
              readOnly
              className={classes.input_field} 
            />
          </Form.Item>

          <Form.Item
            className={classes.wrap_btn_detail}
            wrapperCol={{ span: 24 }}
          >
            <Button 
              type="primary" 
              className={classes.btn_detail}
              icon={<BiDetail size={17} />}
              onClick={() => { console.log("test") }}
            >
              Detail Application
            </Button>
          </Form.Item>
        </Col>

      </Row>
    </Form>
  )
}

export default Dashboard