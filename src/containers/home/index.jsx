import CollapseForm from '../CollapseForm';
import classes from './style.module.less';
import FooterBtn from '../FooterBtn';
import { useEffect, useState } from 'react';
import { Col, Form, Modal, Row, Input, Button, Result } from 'antd';
import { BiDetail } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import KycDetailStorage from '../../utils/kyc_detail_storage';
import { fetchDetailKyc } from '../../redux/slice/kyc/action/fetch_detail_kyc';
import notify from '../../utils/notification';
import detailApplication from '../../pages/api/detail/detailApplication';
import { fetchRelationWithNasabah } from '../../redux/slice/kyc/action/fetch_hubungan_debitur';
import { fetchPaymentMethode } from '../../redux/slice/kyc/action/fetch_payment_methode';

const Home = () => {
	const [form] = Form.useForm()
	const dispatch = useDispatch();
	const [showDetailApp, setShowDetailApp] = useState(false);
	const { data, loading, error } = useSelector((state) => state.kyc.fetchData);

	// data wira
	const no_order = "2311000214";
	// data non-wira
	// const no_order = "2504000481";

  const detailApp = detailApplication()

	useEffect(() => {
		// clear kyc_detail once refresh browser
		KycDetailStorage.value = {}

    const fetchData = async () => {
      try {
        await dispatch(fetchDetailKyc(no_order)).unwrap()
      } catch (err) {
        notify("error", "Gagal fetch detail data KYC", `Status Code ${err.status} - ${err.statusText}`)
      }
    }

    fetchData()
	}, [dispatch])

	useEffect(() => {
		if (!data) return

		const {
			detail,
			source_order_desc,
			applicant_type_desc,
			branch_desc,
			application_id,
			application_date,
      channel_code,
      flag_data_format
		} = data || {}

		const { debitur, identitas_order, object_pembiayaan } = detail || {}
		const { personal } = debitur || {}
		const { sumber_nasabah_code } = identitas_order || {}
		const { debitur_nama_sesuai_ktp } = personal || {}

    const payloadPaymentMethode = {
      channel_code: channel_code,
      fin_type_code: flag_data_format == "1" ? object_pembiayaan.financing_type_code : identitas_order.financing_type_code,
      sumber_nasabah_code: sumber_nasabah_code
    }

    const fetchData = async () => {
      try {
        const [hubDebRes, paymentMenthodeRes] = await Promise.allSettled([
          dispatch(fetchRelationWithNasabah()).unwrap(),
          dispatch(fetchPaymentMethode(payloadPaymentMethode)).unwrap()
        ])

        if (error === null && hubDebRes.status === "rejected") {
          const { status, statusText } = hubDebRes.reason || {}
          notify("error", "Gagal fetch data hubungan dengan nasabah", `Status Code ${status} - ${statusText}`)
        }
        if (error === null && paymentMenthodeRes.status === "rejected") {
          const { status, statusText } = paymentMenthodeRes.reason || {}
          notify("error", "Gagal fetch data cara bayar angsuran", `Status Code ${status} - ${statusText}`)
        }
      } catch (err) {
        const { message_error } = err.reason || {}
        notify("error", "Unexpected Error", message_error.status);
      }
    }

    fetchData()

		form.setFieldsValue({
			nomor_aplikasi: application_id,
			nama_ktp: debitur_nama_sesuai_ktp,
			tipe_nasabah: applicant_type_desc,
			tgl_aplikasi: application_date,
			source_order: source_order_desc,
			cabang: branch_desc,
		});
	}, [data])

	return (
		<>
			<div className={classes.background}>
				<div className={classes.wrapper}>
					<h3>Know Your Customer (KYC)</h3>
					<div className={classes.line}></div>
					<Form layout="vertical" form={form}>
						<Row gutter={17}>
							<Col xs={24} md={12}>
								<Form.Item
									label="NOMOR APLIKASI"
									className={classes.wrap_input_field}
									name="nomor_aplikasi"
								>
									<Input
										readOnly
										className={classes.input_field}
									/>
								</Form.Item>

								<Form.Item
									label="NAMA SESUAI KTP"
									className={classes.wrap_input_field}
									name="nama_ktp"
								>
									<Input
										readOnly
										className={classes.input_field}
									/>
								</Form.Item>

								<Form.Item
									label="TIPE NASABAH"
									className={classes.wrap_input_field}
									name="tipe_nasabah"
								>
									<Input
										readOnly
										className={classes.input_field}
									/>
								</Form.Item>
							</Col>

							<Col xs={24} md={12}>
								<Form.Item
									label="TANGGAL APLIKASI"
									className={classes.wrap_input_field}
									name="tgl_aplikasi"
								>
									<Input
										readOnly
										className={classes.input_field}
									/>
								</Form.Item>

								<Form.Item
									label="SOURCE ORDER"
									className={classes.wrap_input_field}
									name="source_order"
								>
									<Input
										readOnly
										className={classes.input_field}
									/>
								</Form.Item>

								<Form.Item
									label="CABANG"
									className={classes.wrap_input_field}
									name="cabang"
								>
									<Input
										readOnly
										className={classes.input_field}
									/>
								</Form.Item>

								<Form.Item
									className={classes.wrap_btn_detail}
									wrapperCol={{ span: 24 }}
								>
									<Button
										type="primary"
										className={classes.btn_detail}
										icon={<BiDetail size={17} />}
										onClick={() => setShowDetailApp(true)}
									>
										Detail Application
									</Button>
									{showDetailApp && (
										<div className={classes.overlay} >
											<div className={classes.modal} >
												<button onClick={() => setShowDetailApp(false)} className={classes.closeBtn}>
													✕
												</button>
												<iframe
													src={detailApp}
													title="description"
													width="95%"
													height="450vh"
													style={{ border: "1px solid #ccc", marginTop: "10px" }}
												/>
											</div>
										</div>
									)}
								</Form.Item>
							</Col>

						</Row>
					</Form>

					{/* START COMPONENT HERE */}
					<CollapseForm />
					<FooterBtn />
					{/* END COMPONENT HERE */}
				</div>
			</div>

			{/* Modal loading mohon tunggu */}
			<Modal
				open={loading}
				footer={false}
				closable={false}
				title="Data Sedang Di Proses Mohon Ditunggu"
			/>

      {/* Modal stopper error get detail data kyc */}
			<Modal
        open={error}
        footer={false}
        closable={false}
        maskClosable={false}
        keyboard={false}
      >
        <Result
          status="500"
          title="Terjadi Kesalahan"
          subTitle="Gagal mengambil data detail KYC. Silakan refresh halaman atau hubungi tim IT."
        />
      </Modal>
		</>
	);
};

export default Home;
