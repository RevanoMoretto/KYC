import React, {useState} from "react";
import {Input, Col, Form, Row, Select, Radio} from "antd";
import Address from "../Helper/Addres";

const InformasiTempatTinggalNasabah = () =>{

    const [alamatDomSesuai, setAlamatDomSesuai] = useState(null);

    const [form] = Form.useForm();

    return(
        <Form 
            form={form}
            layout="vertical"
        >
            <Address
				label="Domisili"
				form={form}
				// onChange={setFormAlamat}
				// onChangeDirect={submitAddressInfo}
			/>
            <Row gutter={24}>
                <Col md={12} xs={24}>
                    <Form.Item
                        label="Alamat domisili sesuai inputan awal?"
                    >
                        <Radio.Group onChange={(e) => setAlamatDomSesuai(e.target.value)}>
                            <Radio value="0">Sesuai</Radio>
                            <Radio value="1">Tidak Sesuai</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}
export default InformasiTempatTinggalNasabah;