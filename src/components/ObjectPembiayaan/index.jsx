import React, { useState } from 'react'
import classes from './style.module.less';
import { Col, Form, Input, Row, Select, Upload, notification, Button, Image, Modal, Spin } from 'antd';
import RenderIf from '../../utils/renderif';
import { MdOutlineFileUpload } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa6";

function ObjectPembiayaan() {
  const [form] = Form.useForm()
  const [api, contextHolder] = notification.useNotification()

  const [test, setTest] = useState("")
  const [fileName, setFileName] = useState("")
  const [fileType, setFileType] = useState("")
  const [fileObject, setFileObject] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")
  const [previewVisible, setPreviewVisible] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3MB

  const options = [
    { label: 'Eunha', value: 'Eunha' },
    { label: 'Sowon', value: 'Sowon' },
    { label: 'Yerin', value: 'Yerin' },
    { label: 'Umji', value: 'Umji' },
  ];

  const openNotificationWithIcon = (type, msg, desc) => {
    api[type]({
      message: msg,
      description: desc
    })
  }

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

  const beforeUpload = async (file) => {
    const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
    const minTime = 2000; // 2 detik
    const maxTime = 10000; // 10 detik
    const uploadTime = minTime + ((file.size / MAX_FILE_SIZE) * (maxTime - minTime));
    const isLt2M = file.size < MAX_FILE_SIZE;

    if (!isImage) {
      openNotificationWithIcon("error", "Failed", "You can only upload JPG/PNG file!")
      return Upload.LIST_IGNORE;
    }

    if (!isLt2M) {
      openNotificationWithIcon("error", "Failed", "Image must smaller than 3MB!")
      return Upload.LIST_IGNORE;
    }

    setFileType(file.type)
    setFileObject(file)
    setIsUploading(true)
    setFileName("")
    openNotificationWithIcon("info", "Info", "File is uploading...")

    setTimeout(() => {
      setFileName(file.name)
      setIsUploading(false)
      openNotificationWithIcon("success", "Success", "File uploaded successfully!")

      // filename, type file, doc code, base64
    }, uploadTime)

    return false; // Prevent auto-upload
  };

  const handleViewImage = () => {
    if (previewUrl) {
      setPreviewVisible(true)
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChangeImageUpload = (file) => {
    setPreviewUrl(URL.createObjectURL(file.file));

    // const base64 = await convertBase64(file.file);
    // const doc_value = base64.split(",")[1];
    // setPreviewUrl(`data:${fileType};base64,` + doc_value)
  }

  return (
    <>
      {contextHolder}
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
              className={classes.wrap_form_item}
              >
              {isUploading ? (
                <Input 
                  className={classes.readonly_input_field_upload}
                  placeholder="Uploading..."
                  readOnly
                  onFocus={(e) => e.target.blur()}
                />
              ) : 
                <>
                  {fileName ? 
                  (
                    <Row align="middle" gutter={5}>
                      <Col xs={3} md={3}>
                        <Button
                          icon={<FaEye size={16}/>}
                          className={classes.btn_view}
                          block
                          onClick={handleViewImage}
                        />
                      </Col>
                      <Col xs={18} md={18}>
                        <Input 
                          className={classes.readonly_input_field_upload}
                          value={fileName}
                          readOnly
                        />
                      </Col>
                      <Col xs={3} md={3}>
                        <Button 
                          icon={<AiOutlineDelete size={16} />}
                          className={classes.btn_delete}
                          block
                          onClick={() => { 
                            setFileName("") 
                            setPreviewUrl("")
                            setPreviewVisible(false)
                          }}
                        />
                      </Col>
                    </Row>
                  ) : 
                  (
                    <Upload 
                      className={classes.upload}
                      showUploadList={false}
                      name="file"
                      beforeUpload={beforeUpload}
                      onChange={handleChangeImageUpload}
                    >
                      <div style={{ position: 'relative', width: '100%' }}>
                        <Input
                          readOnly
                          placeholder="Choose File"
                          className={classes.readonly_input_field}
                          onFocus={(e) => e.target.blur()}
                        />
                        <MdOutlineFileUpload
                          size={20}
                          style={{
                            position: 'absolute',
                            top: '50%',
                            right: 10,
                            transform: 'translateY(-50%)',
                            color: 'rgba(115, 115, 115, 0.62)',
                            pointerEvents: 'none'
                          }}
                        />
                      </div>
                    </Upload>
                  )
                  }
                </>
              }
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        onOk={() => setPreviewVisible(false)}
        title="Document Preview"
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {previewUrl ? 
            (
              <Image 
                width={200}
                src={previewUrl}
                alt="preview"
              />
            ) : 
            (
              <Spin />
            )
          }
        </div>
      </Modal>
    </>
  )
}

export default ObjectPembiayaan