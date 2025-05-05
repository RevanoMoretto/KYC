import { Tabs, Typography, Input } from 'antd';
import KnowYourCustomer from '../KnowYourCustomer';
import classes from './style.module.less';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function CollapseForm() {
  const { Title } = Typography;
  const { TextArea } = Input;

  const { data } = useSelector((state) => state.kyc.fetchData)
  
  const { screening_2, detail } = data || {}
  const { kyc } = detail || {}
  const { hasil_kyc } = kyc || {}

  const [valHasilKyc, setValHasilKyc] = useState("")

  useEffect(() => {
    if (hasil_kyc !== undefined) {
      setValHasilKyc(hasil_kyc)
    }
  }, [hasil_kyc])

  const items = [
    {
      key: "1",
      label: "Instant Approval",
      children: <KnowYourCustomer />
    },
    {
      key: "2",
      label: "Tele Survey",
      children: <KnowYourCustomer />
    },
    {
      key: "3",
      label: "Silent Survey",
      children: <KnowYourCustomer />
    }
  ]

  const showItem = (items) => {
    switch (screening_2) {
      case "INSTANT APPROVAL":
        return items.filter(item => item.key === "1");
      case "TELE SURVEY":
        return items.filter(item => item.key === "2");
      case "SILENT SURVEY":
        return items.filter(item => item.key === "3");
      default:
        console.error(`Screening 2 tidak dikenal!, result screening_2: ${screening_2}`)
        return [];
    }
  }

  const handleChangeHasilKyc = (e) => {
    const value = e.target.value
    setValHasilKyc(value)
  }

  return (
    <>
      {screening_2 && (
        <Tabs
          defaultActiveKey="1"
          type="card"
          items={showItem(items)}
          tabBarGutter={6}
        />
      )}
      <div>
        <Title
          level={5}
          className={classes.title}
        >
          Hasil KYC <span style={{ color: "red" }}>*</span>
        </Title>
        <TextArea
          showCount
          maxLength={250}
          className={classes.text_area}
          style={{ resize: "none" }}
          value={valHasilKyc}
          onChange={handleChangeHasilKyc}
        />
      </div>
    </>
  )
}

export default CollapseForm