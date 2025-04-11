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
            style={{ backgroundColor: "#dc3545" }}
          >
            Cancel Application
          </Button>
          <Button 
            type="primary"
          >
            Submit
          </Button>
        </Space>
      </Col>
      <Col>
        <Button 
          type="primary"
          style={{ backgroundColor: "#ffc107", color: "#000" }}
        >
          Return to Screening 3
        </Button>
      </Col>
    </Row>
  )
}

export default FooterBtn