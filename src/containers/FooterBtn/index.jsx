import classes from './style.module.less';
import { Button, Col, Row } from 'antd';
import { FaShareSquare } from "react-icons/fa";
import { LuFileX2 } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { cancelData } from '../../redux/slice/cancelData/cancelDataSlice';
import { saveKyc } from '../../redux/slice/kyc/kycSlice';
import KycDetailStorage from '../../utils/kyc_detail_storage';



function FooterBtn() {
  const dispatch = useDispatch();

  const result_informasi = useSelector((state) => state.save.formData.informasi_nasabah)
  const result_ec = useSelector((state) => state.save.formData.emergency_contact)
  const existingLocalStorage = KycDetailStorage.data || {}
  const { detail } = existingLocalStorage || {};

  const handleSaveKyc = () => {
    const kycData = {
      // Collect data from your form or state
      name: 'John Doe',
      address: '123 Main St',
    };

    // Dispatch saveKyc action with payload
    dispatch(saveKyc(kycData))
  };

  const handleSubmitData = () => {
    const kycWrappedData = {
      kyc: {
        informasi_nasabah: {
          ...result_informasi
        },
        emergency_contact: {
          ...result_ec
        }
        // informasi_nasabah: result_informasi.informasi_nasabah,
        // emergency_contact: result_informasi.emergency_contact
      }
    }
    // const updatedDetail = {
    //   ...detail,
    //   ...kycWrappedData
    // };

    // const akhir = {
    //   updatedDetail,
    //   existingLocalStorage
    // }

    // const finalData = {
    //   detail: updatedDetail
    // };
    console.log("okkk ", kycWrappedData)
    // console.log("result submit data: ", result_informasi)
  }

  const handleCancelData = () => {
    dispatch(cancelData(true))
  }

  return (
    <>
      <Row justify="end">
        <Col>
          <Button
            type="primary"
            className={classes.btn_return_sc3}
          >
            Return to Screening 3
          </Button>
        </Col>
      </Row>

      <Row className={classes.footer} gutter={[13, 13]}>
        <Col>
          <Button
            type="primary"
            className={classes.btn_cancel}
            icon={<LuFileX2 size={17} />}
            onClick={handleCancelData}
          >
            Cancel Application
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            className={classes.btn_submit}
            icon={<FaShareSquare size={17} />}
            onClick={handleSubmitData}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default FooterBtn