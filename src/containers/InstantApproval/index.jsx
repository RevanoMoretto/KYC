import { Collapse, Space } from 'antd'
import React from 'react'
import classes from './style.module.less';

function InstantApproval() {
    const items = [
      {
        key: "1",
        label: "Informasi Nasabah",
        children: "Test 1"
      },
      {
        key: "2",
        label: "Informasi Pekerjaan Nasabah",
        children: "Test 2"
      },
      {
        key: "3",
        label: "Informasi Tempat Tinggal Nasabah",
        children: "Test 3"
      },
      {
        key: "4",
        label: "Informasi Objek Pembiayaan",
        children: "Test 4"
      },
      {
        key: "5",
        label: "Emergency Contact",
        children: "Test 5"
      }
    ]

  return (
    <Space direction="vertical" size="middle" className={classes.space}>
      {items.map((e, i) => {
        return (
          <Collapse
            defaultActiveKey={["1"]}
            items={[e]}
            key={i}
          />
        )
      })}
    </Space>
  )
}

export default InstantApproval