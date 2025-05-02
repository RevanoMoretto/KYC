import React, { useEffect, useState } from 'react'
import { Tabs, Typography, Input } from 'antd';
import KnowYourCustomer from '../KnowYourCustomer';
import classes from './style.module.less';
import { useSelector } from 'react-redux';
import ApplicationStorage from '../../utils/application_storage';

function CollapseForm() {
  const { Title } = Typography;
  const { TextArea } = Input;
  const [resultScreening, setResultScreening] = useState('');

  useEffect(() => {
    const storage = new ApplicationStorage('kyc_detail')
    const kycData = storage.value;
    if (kycData?.screening_2) {
      setResultScreening(kycData.screening_2);
    }
  }, [])

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

  // const showItem = (items) => {
  //   let data = []

  //   items.map((e, i) => {
  //     if (e.key == "1") {
  //       data.push({
  //         key: e.key,
  //         label: e.label,
  //         children: e.children
  //       })
  //     }
  //   })

  //   return items
  //   // return data
  // }

  const showItem = (items) => {
    switch (resultScreening) {
      case "INSTANT APPROVAL":
        return items.filter(item => item.key === "1");
      case "TELE SURVEY":
        return items.filter(item => item.key === "2");
      case "SILENT SURVEY":
        return items.filter(item => item.key === "3");
      default:
        return [];
    }
  }
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        type="card"
        items={showItem(items)}
        onChange={() => { console.log("abdu") }}
        tabBarGutter={6}
      />
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
          onChange={() => { console.log("eunha") }}
          placeholder="You can text anything here :))"
          className={classes.text_area}
          style={{ resize: "none" }}
        />
      </div>
    </>
  )
}

export default CollapseForm