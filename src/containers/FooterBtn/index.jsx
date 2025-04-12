import React from 'react'
import classes from './style.module.less';
import { Button, Col, Row, Space } from 'antd';

function FooterBtn() {
  return (
    <Row justify="space-between" className={classes.footer}>
      <Col>
        <Space>
          <Button 
            type="primary"
            className={classes.btn_cancel}
          >
            Cancel Application
          </Button>
          <Button 
            type="primary"
            className={classes.btn_submit}
          >
            Submit
          </Button>
        </Space>
      </Col>
      <Col>
        <Button 
          type="primary"
          className={classes.btn_return_sc3}
        >
          Return to Screening 3
        </Button>
      </Col>
    </Row>
  )
}

export default FooterBtn