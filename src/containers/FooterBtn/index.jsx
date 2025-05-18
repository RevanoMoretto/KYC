import classes from './style.module.less';
import { Button, Col, Row } from 'antd';
import { FaShareSquare } from "react-icons/fa";
import { LuFileX2 } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { cancelData } from '../../redux/slice/cancelData/cancelDataSlice';

function FooterBtn() {
  const dispatch = useDispatch()
  const result_submit = useSelector((state) => state.save.formData)

  const handleSubmitData = () => {
    console.log("result submit data: ", result_submit)
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