import { Collapse, Space } from 'antd'
import classes from './style.module.less';
// subtab
import EmergencyContact from '../../components/EmergencyContact';
import InformasiNasabah from '../../components/InformasiNasabah';
import InformasiPekerjaanNasabah from '../../components/InformasiPekerjaanNasabah';
import ObjectPembiayaan from '../../components/ObjectPembiayaan';
import InformasiTempatTinggalNasabah from '../../components/InformasiTempatTinggalNasabah';
import { useSelector } from 'react-redux';

function KnowYourCustomer() {
  const isCancelData = useSelector((state) => state.cancel.isCancelApp)

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

  const showItem = (items, isCancelData) => {
    let modifiedItems = [...items] 

    // edit subtab lama
    // modifiedItems = isCancelData 
    // ? items.filter((e) => e.key !== "2")
    // : [...items]

    // nambah subtab baru
    if (isCancelData) {
      modifiedItems.push({
        key: "6",
        label: "Cancel Application",
        children: "Test 6"
      })
    }

    return modifiedItems.map((e, i) => (
      <Collapse defaultActiveKey={isCancelData ? ["6"] : []} items={[e]} key={i} />
    ))
  }

  return (
    <Space direction="vertical" size="middle" className={classes.space}>
      {showItem(items, isCancelData)}
    </Space>
  )
}

export default KnowYourCustomer