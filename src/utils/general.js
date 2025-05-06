import KycDetailStorage from "./kyc_detail_storage";

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const updateKycDetailEmergencyContact = (values) => {
  const kyc_detail = KycDetailStorage.data || {}
  const { detail } = kyc_detail || {}
  const { kyc } = detail || {}
  const { emergency_contact } = kyc || {}

  KycDetailStorage.value = {
    ...kyc_detail,
    detail: {
      ...detail,
      kyc: {
        ...kyc,
        emergency_contact: {
          ...emergency_contact,
          ...values
        }
      }
    }
  }
}

export const inputNumberOnly = (value) => {
  if (
    !/[0-9]/.test(value.key) &&
    !["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(value.key)
  ) {
    value.preventDefault()
  }
}

export const inputAlphabetAndSpaceOnly = (value) => {
  if (
    !/^[A-Za-z\s]+$/.test(value.key) &&
    !["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(value.key)
  ) {
    value.preventDefault()
  }
}

export const regexAddress = (value) => {
  const key = value.key;
  const isControlKey = [
    'Backspace',
    'ArrowLeft',
    'ArrowRight',
    'Delete',
    'Tab',
  ].includes(key);

  if (isControlKey) return;
  const isValid = /^[a-zA-Z0-9\s,.\-\/()#]$/.test(key);
  if (!isValid) {
    value.preventDefault();
  }
};