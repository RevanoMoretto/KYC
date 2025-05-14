import { Tabs, Typography, Input } from 'antd';
import KnowYourCustomer from '../KnowYourCustomer';
import classes from './style.module.less';
import { useDispatch, useSelector } from 'react-redux';
import { saveData } from '../../redux/slice/save_data/saveDataSlice';

function CollapseForm() {
  const { Title } = Typography;
  const { TextArea } = Input;

  const dispatch = useDispatch()

  const { data } = useSelector((state) => state.kyc.fetchData)
  
  const { screening_2 } = data || {}

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

    dispatch(saveData({
      payload: null,
      fields: {
        hasil_kyc_input: value
      }
    }))
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
          maxLength={200}
          className={classes.text_area}
          style={{ resize: "none" }}
          onChange={handleChangeHasilKyc}
        />
      </div>
    </>
  )
}

export default CollapseForm