import { Col, Form, Input, Row, Select } from "antd";
import { useState } from "react";
import PropTypes from "prop-types";
import { SearchOutlined } from "@ant-design/icons";
import classes from "./style.module.less";


const Address = ({
    label = "",
    form,
    // onChange = (f) => f,
    // onChangeDirect = (f) => f,
    ...props
}) => {
    const { TextArea } = Input;
    const [isFormDisable, setIsFormDisable] = useState(
        props?.disabled || false
    );

    return (
        <>

            <Col md={8} xs={24}>
                <Form.Item
                    label={`Alamat ${label}`}
                    name="alamat"
                    className={classes.formItem}
                >
                    <TextArea
                        rows={6}
                        showCount
                        maxLength={50}
                        // onInput={toInputUppercase}
                        className={classes.textarea}
                        // onChange={onAddressChange}
                        style={{ resize: "none" }}
                        disabled={isFormDisable}
                    />
                </Form.Item>
            </Col>
            <Col md={16} xs={24}>
                <Row gutter={12}>
                    <Col md={12} xs={24}>
                        <Form.Item
                            label={`Kode Pos ${label}`}
                            name="kode_pos"
                        >
                            <Select
                                allowClear={true}
                                // onClear={onClearKodePos}
                                // onKeyPress={allowOnlyNumber}
                                showSearch
                                // options={kodePosList.map((kode) => {
                                // 	return {
                                // 		label: kode,
                                // 		value: kode,
                                // 	};
                                // })}
                                // onChange={onKodePosChange}
                                // onSearch={onKodePosSearch}
                                disabled={isFormDisable}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item
                            label={`Kota/Kabupaten ${label}`}
                            name="desc_kab_kot"
                        // {...kotaKtpValidation}
                        >
                            <Input
                                // onInput={toInputUppercase}
                                readOnly={true}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col md={12} xs={24}>
                        <Form.Item
                            label={`Kelurahan ${label}`}
                            name="desc_kelurahan"
                        // {...kelurahanKtpValidation}
                        >
                            <Select
                                allowClear
                                // onClear={onClearKelurahan}
                                showSearch
                                // options={kelurahanList}
                                // onChange={onKelurahanChange}
                                // onSearch={onKelurahanSearch}
                                // filterOption={(input, option) => {
                                // 	return option.label
                                // 		.toLowerCase()
                                // 		.includes(input.toLowerCase());
                                // }}
                                disabled={isFormDisable}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item
                            label={`Provinsi ${label}`}
                            name="desc_provinsi"
                        >
                            <Input
                                // onInput={toInputUppercase}
                                readOnly
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>


            <Col md={4} xs={12}>
                <Form.Item label={`RT ${label}`} name="rt">
                    <Input
                        // onKeyPress={allowOnlyNumber}
                        maxLength={3}
                        // onInput={toInputUppercase}
                        // onChange={onRtChange}
                        readOnly={isFormDisable}
                    />
                </Form.Item>
            </Col>
            <Col md={4} xs={12}>
                <Form.Item label={`RW ${label}`} name="rw">
                    <Input
                        maxLength={3}
                        readOnly={isFormDisable}
                    />
                </Form.Item>
            </Col>
            <Col md={8} xs={24}>
                <Form.Item
                    label={`Kecamatan ${label}`}
                    name="desc_kecamatan"
                // {...kecamatanKtpValidation}
                >
                    <Input
                        // onInput={toInputUppercase} 
                        readOnly={true} />
                </Form.Item>
            </Col>
        </>
    )
}

Address.propTypes = {
    label: PropTypes.string,
    form: PropTypes.shape({
        submit: PropTypes.object,
        setFieldsValue: PropTypes.func,
    }),
    onChange: PropTypes.func,
};

export default Address;