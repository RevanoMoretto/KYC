import { Button, Col, Image, Input, Modal, Row, Spin, Upload } from 'antd'
import { MdOutlineFileUpload } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEye } from "react-icons/fa6";
import React, { useEffect, useState } from 'react'
import classes from './style.module.less';
import notify from '../../../utils/notification';
import { convertBase64 } from '../../../utils/general';

function UploadImg() {
  const [fileName, setFileName] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")
  const [previewVisible, setPreviewVisible] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // clear image blob
  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl)
      }
    };
  }, [previewUrl])

  const beforeUpload = (file) => {
    // setFileName("")

    const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3MB
    const isImage = file.type === 'image/jpeg' || file.type === 'image/png'
    const minTime = 2000; // 2 detik
    const maxTime = 10000; // 10 detik
    const uploadTime = minTime + ((file.size / MAX_FILE_SIZE) * (maxTime - minTime))
    const isLt2M = file.size < MAX_FILE_SIZE;

    if (!isImage) {
      notify("error", "Failed", "You can only upload JPG/PNG file!")
      return Upload.LIST_IGNORE;
    }

    if (!isLt2M) {
      notify("error", "Failed", "Image must smaller than 3MB!")
      return Upload.LIST_IGNORE;
    }

    // setIsUploading(true)

    setFileName(file.name)
    // setIsUploading(false)

    notify("success", "Success", "File uploaded successfully!")

    return false; // Prevent auto-upload
  };

  const handleViewImage = () => {
    if (previewUrl) {
      setPreviewVisible(true);
    }
  };

  const handleChangeImageUpload = async (file) => {
    // handle preview image for modern browser
    if (window.URL && typeof URL.createObjectURL === 'function') {
      const previewUrl = URL.createObjectURL(file.file)

      setImageLoaded(false)
      setPreviewUrl(previewUrl)
    } else { // fallback for old browser
      const base64 = await convertBase64(file.file);
      const doc_value = base64.split(",")[1];
      const fileType = file.file.type

      setImageLoaded(false)
      setPreviewUrl(`data:${fileType};base64,` + doc_value)
    }
  }

  return (
    <>
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
                    icon={<FaEye size={16} />}
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
                      setImageLoaded(false)
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

      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        onOk={() => setPreviewVisible(false)}
        title="Document Preview"
        maskClosable={false}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "15px" }}>
          {!imageLoaded && (
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", textAlign: "center" }}>
              <Spin />
              <span>Mohon tunggu...</span>
            </div>
          )}
          <Image
            width={200}
            style={{ display: imageLoaded ? "block" : "none" }}
            src={previewUrl}
            alt="preview"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </Modal>
    </>
  )
}

export default UploadImg;