import Dashboard from '../Dashboard';
import CollapseForm from '../CollapseForm';
import classes from './style.module.less';

const Home = () => {
	return (
		<div className={classes.background}>
			<div className={classes.wrapper}>
				<h3>Know Your Customer (KYC)</h3>
				<div className={classes.line}></div>
				<Dashboard />
				<CollapseForm />
			</div>
		</div>
	);
};

export default Home;
