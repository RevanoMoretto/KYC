import { Button, Col, Form, Input, Row } from 'antd'
import classes from './style.module.less';
import React, { useEffect } from 'react'

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
            className={classes.input_field} 
            name="nomor_aplikasi"
          >
            <Input 
              readOnly
              style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}  
            />
          </Form.Item>

          <Form.Item
            label="NAMA SESUAI KTP" 
            className={classes.input_field} 
            name="nama_ktp"
          >
            <Input 
              readOnly
              style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}  
            />
          </Form.Item>

          <Form.Item
            label="TIPE NASABAH" 
            className={classes.input_field} 
            name="tipe_nasabah"
          >
            <Input 
              readOnly
              style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}  
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item 
            label="TANGGAL APLIKASI" 
            className={classes.input_field} 
            name="tgl_aplikasi"
          >
            <Input 
              readOnly
              style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}  
            />
          </Form.Item>

          <Form.Item
            label="SOURCE ORDER" 
            className={classes.input_field} 
            name="source_order"
          >
            <Input 
              readOnly
              style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}  
            />
          </Form.Item>

          <Form.Item
            label="CABANG" 
            className={classes.input_field} 
            name="cabang"
          >
            <Input 
              readOnly
              style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}  
            />
          </Form.Item>

          <Form.Item
            className={classes.btn_detail}
            wrapperCol={{ span: 24 }}
            style={{ textAlign: "right" }}
          >
            <Button 
              type="primary" 
              style={{ backgroundColor: "#28a745" }}
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