import React from 'react'
import { Tabs, Typography, Input } from 'antd';
import KnowYourCustomer from '../KnowYourCustomer';
import classes from './style.module.less';

function CollapseForm() {
  const { Title } = Typography;
  const { TextArea } = Input;

  const items = [
    {
      key: "1",
      label: "Instant Approval",
      children: <KnowYourCustomer />
    },
    {
      key: "2",
      label: "Tele Survey",
      children: "Test 2"
    },
    {
      key: "3",
      label: "Silent Survey",
      children: "Test 3"
    }
  ]

  const showItem = (items) => {
    let data = []

    items.map((e, i) => {
      if (e.key == "1") {
        data.push({
          key: e.key,
          label: e.label,
          children: e.children
        })
      }
    })

    return items
    // return data
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