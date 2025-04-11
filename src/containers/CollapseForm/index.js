import React from 'react'
import { Tabs } from 'antd';
import InstantApproval from '../InstantApproval';

function CollapseForm() {
  const items = [
    {
      key: "1",
      label: "Instant Approval",
      children: <InstantApproval />
    },
    {
      key: "2",
      label: "Identitas Order",
      children: "Test 2"
    },
    {
      key: "3",
      label: "Objek Pembiayaan",
      children: "Test 3"
    }
  ]

  const showItem = (items) => {
    let data = []

    items.map((e, i) => {
      if(e.key == "1"){
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
    </>
  )
}

export default CollapseForm