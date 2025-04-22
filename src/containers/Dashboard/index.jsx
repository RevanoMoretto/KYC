import { Button, Col, Form, Input, Row } from 'antd'
import classes from './style.module.less';
import React, { useEffect, useState } from 'react'
import { BiDetail } from "react-icons/bi";
import applicationStorage from "../../utils/application_storage";

function Dashboard() {
  const { 
    detail,
    source_order_desc, 
    applicant_type_desc, 
    branch_desc, 
    application_id, 
    application_date 
  } = applicationStorage.data || {}
  const { debitur } = detail || {}
  const { personal } = debitur || {}
  const { debitur_nama_sesuai_ktp } = personal || {}
  
  const [form] = Form.useForm()

  const tokenDummy = 
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDAxNDgzNyIsImV4cCI6MTc0NDk2MzE1NSwiaWF0IjoxNzQ0ODc2NzU1fQ.g5BgQEYlYLqlWqjckDHR1RmvII7BvR8STZYXtZMDCsv7tLIKVkRPGrue0JhxV192FBEnZhPMu3Nz5FSHLN2gRA";
  const orderId = "2502102278"
  const detailApp = "http://detail-aplikasi-reactjs-uat.apps.ocp4dev.muf.co.id/aplikasi/"+orderId+"/"+tokenDummy; 


  const [showDetailApp, setShowDetailApp] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      nomor_aplikasi: application_id,
      nama_ktp: debitur_nama_sesuai_ktp,
      tipe_nasabah: applicant_type_desc,
      tgl_aplikasi: application_date,
      source_order: source_order_desc,
      cabang: branch_desc
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
              onClick={() => setShowDetailApp(true)}
            >
              Detail Application
            </Button>
            {showDetailApp && (
              <div className={classes.overlay} >
                <div className={classes.modal} >
                <button onClick={() => setShowDetailApp(false)} className={classes.closeBtn}>
                  ✕
                </button>
                  <iframe
                    src={detailApp}
                    title="description"
                    width="95%"
                    height="450vh"
                    style={{ border: "1px solid #ccc", marginTop: "10px" }}
                  />
                </div>
              </div>
            )}
          </Form.Item>
        </Col>

      </Row>
    </Form>
  )
}

export default Dashboard