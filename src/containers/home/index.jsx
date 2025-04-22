import Dashboard from '../Dashboard';
import CollapseForm from '../CollapseForm';
import classes from './style.module.less';
import FooterBtn from '../FooterBtn';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import applicationStorage from "../../utils/application_storage";

const Home = () => {
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const startTime = Date.now()

		const fetchData = async () => {
			try {
				setLoading(true)

				const response = await fetch(
					"http://localhost:3000/api/detail/getDetailKyc",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							no_order: "2410001316",
						}),
					}
				)

				const data = await response.json()

				const elapsedTime = Date.now() - startTime
				const remainingTime = Math.max(1000 - elapsedTime, 0)

				setTimeout(() => {
					setLoading(false)

					applicationStorage.value = data
				}, remainingTime)
			} catch (error) {
				console.error("error ketika hit /getDetailKyc pada saat first render, message: ", error)
				setLoading(false)
			}
		};
	
		fetchData()
	}, [])
	

	return (
		<>
			<div className={classes.background}>
				<div className={classes.wrapper}>
					<h3>Know Your Customer (KYC)</h3>
					<div className={classes.line}></div>
					<Dashboard />
					<CollapseForm />
					<FooterBtn />
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
