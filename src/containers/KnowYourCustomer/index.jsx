import { Collapse, Space } from 'antd'
import React from 'react'
import classes from './style.module.less';
import EmergencyContact from '../../components/EmergencyContact';
import InformasiNasabah from '../../components/InformasiNasabah';
import InformasiPekerjaanNasabah from '../../components/InformasiPekerjaanNasabah';

function KnowYourCustomer() {
  const items = [
    {
      key: "1",
      label: "Informasi Nasabah",
      children: <InformasiNasabah />
    },
    {
      key: "2",
      label: "Informasi Pekerjaan Nasabah",
      children: <InformasiPekerjaanNasabah />
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
      children: <EmergencyContact />
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

export default KnowYourCustomer