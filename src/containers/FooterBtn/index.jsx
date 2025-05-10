import React from 'react'
import classes from './style.module.less';
import { Button, Col, Row } from 'antd';
import { FaShareSquare } from "react-icons/fa";
import { LuFileX2 } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { saveKyc } from '../../redux/slice/kyc/kycSlice';


function FooterBtn() {
  const dispatch = useDispatch();

  const result_ec = useSelector((state) => state.save.formData.emergency_contact)

  const handleSaveKyc = () => {
    const kycData = {
      // Collect data from your form or state
      name: 'John Doe',
      address: '123 Main St',
    };

    // Dispatch saveKyc action with payload
    dispatch(saveKyc(kycData))
  };

  const handleSubmitData = () => {
    console.log("okkk ", result_ec)
  }

  return (
    <>
      <Row justify="end">
        <Col>
          <Button
            type="primary"
            className={classes.btn_return_sc3}
          >
            Return to Screening 3
          </Button>
        </Col>
      </Row>

      <Row className={classes.footer} gutter={[13, 13]}>
        <Col>
          <Button
            type="primary"
            className={classes.btn_cancel}
            icon={<LuFileX2 size={17} />}
          >
            Cancel Application
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            className={classes.btn_submit}
            icon={<FaShareSquare size={17} />}
            onClick={handleSubmitData}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default FooterBtn