import CollapseForm from '../CollapseForm';
import classes from './style.module.less';
import FooterBtn from '../FooterBtn';
import { useEffect, useState } from 'react';
import { Col, Form, Modal, Row, Input, Button } from 'antd';
import { BiDetail } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import KycDetailStorage from '../../utils/kyc_detail_storage';
import { fetchDetailKyc } from '../../redux/slice/kyc/action/fetch_detail_kyc';
import notify from '../../utils/notification';

const Home = () => {
	const [form] = Form.useForm()
	const dispatch = useDispatch();
	const [showDetailApp, setShowDetailApp] = useState(false);
	const { data, loading } = useSelector((state) => state.kyc.fetchData);

	// data wira
	const no_order = "2311000214";
	// data non-wira
	// const no_order = "2504000481";

	useEffect(async () => {
		// clear kyc_detail once refresh browser
		KycDetailStorage.value = {}

		try {
			await dispatch(fetchDetailKyc(no_order)).unwrap()
		} catch (err) {
			console.error("Error terjadi pada saat fetching detail data kyc, message: ", err);
			notify("error", "Error", `An error occurred from ${err.url}`)
		}
	}, [dispatch])

	useEffect(() => {
		if (!data) return

		const {
			detail,
			source_order_desc,
			applicant_type_desc,
			branch_desc,
			application_id,
			application_date
		} = data || {}

		const { debitur, source_code_desc } = detail || {}
		const { personal } = debitur || {}
		const { debitur_nama_sesuai_ktp } = personal || {}

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
		</>
	);
};

export default Home;
