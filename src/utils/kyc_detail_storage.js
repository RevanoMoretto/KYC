import Storage from './storage';

class KycDetailStorage extends Storage {
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

export default new KycDetailStorage('kyc_detail');