import { Collapse, Space } from 'antd'
import React from 'react'
import classes from './style.module.less';
// subtab
import EmergencyContact from '../../components/EmergencyContact';
import InformasiNasabah from '../../components/InformasiNasabah';
import InformasiPekerjaanNasabah from '../../components/InformasiPekerjaanNasabah';
import ObjectPembiayaan from '../../components/ObjectPembiayaan';
import InformasiTempatTinggalNasabah from '../../components/InformasiTempatTinggalNasabah';

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
      children: <InformasiTempatTinggalNasabah />
    },
    {
      key: "4",
      label: "Informasi Objek Pembiayaan",
      children: <ObjectPembiayaan />
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
            // defaultActiveKey={["1"]}
            items={[e]}
            key={i}
          />
        )
      })}
    </Space>
  )
}

export default KnowYourCustomer