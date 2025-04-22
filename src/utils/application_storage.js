import Storage from './storage';

class ApplicationStorage extends Storage {
	get data() {
		return this.value;
	}

	get token() {
		return this.value && this.value.token;
	}

	get userId() {
		return this.value && this.value.userAccount && this.value.userAccount.nik;
	}

	get role() {
		return this.value && this.value.role;
	}
}

export default new ApplicationStorage('APPLICATION');
