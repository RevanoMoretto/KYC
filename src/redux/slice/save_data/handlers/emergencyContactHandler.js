export const handleEmergencyContact = (state, fields, prev) => {
  const { 
    nama_ec,
    nomor_hp_1_ec,
    nomor_hp_2_ec,
    alamat_ec,
    rt_ec,
    rw_ec,
    hubungan_ec_code,
    hubungan_ec_desc,
    kodepos_ec_code,
    kelurahan_ec_code,
    kelurahan_ec_desc,
    kecamatan_ec_code,
    kecamatan_ec_desc,
    kabkota_ec_code,
    kabkota_ec_desc,
    provinsi_ec_code,
    provinsi_ec_desc
  } = fields || {}

  state.formData.emergency_contact.nama_emergency_contact = nama_ec ?? prev.emergency_contact.nama_emergency_contact
  state.formData.emergency_contact.nohp1_emergency_contact = nomor_hp_1_ec ?? prev.emergency_contact.nohp1_emergency_contact
  state.formData.emergency_contact.nohp2_emergency_contact = nomor_hp_2_ec ?? prev.emergency_contact.nohp2_emergency_contact
  state.formData.emergency_contact.alamat_emergency_contact = alamat_ec ?? prev.emergency_contact.alamat_emergency_contact
  state.formData.emergency_contact.rt_emergency_contact = rt_ec ?? prev.emergency_contact.rt_emergency_contact
  state.formData.emergency_contact.rw_emergency_contact = rw_ec ?? prev.emergency_contact.rw_emergency_contact
  state.formData.emergency_contact.hubungan_emergency_contact_code = hubungan_ec_code ?? prev.emergency_contact.hubungan_emergency_contact_code
  state.formData.emergency_contact.hubungan_emergency_contact_desc = hubungan_ec_desc ?? prev.emergency_contact.hubungan_emergency_contact_desc
  state.formData.emergency_contact.kodepos_emergency_contact_code = kodepos_ec_code ?? prev.emergency_contact.kodepos_emergency_contact_code
  state.formData.emergency_contact.kelurahan_emergency_contact_code = kelurahan_ec_code ?? prev.emergency_contact.kelurahan_emergency_contact_code
  state.formData.emergency_contact.kelurahan_emergency_contact_desc = kelurahan_ec_desc ?? prev.emergency_contact.kelurahan_emergency_contact_desc
  state.formData.emergency_contact.kecamatan_emergency_contact_code = kecamatan_ec_code ?? prev.emergency_contact.kecamatan_emergency_contact_code
  state.formData.emergency_contact.kecamatan_emergency_contact_desc = kecamatan_ec_desc ?? prev.emergency_contact.kecamatan_emergency_contact_desc
  state.formData.emergency_contact.kabkota_emergency_contact_code = kabkota_ec_code ?? prev.emergency_contact.kabkota_emergency_contact_code
  state.formData.emergency_contact.kabkota_emergency_contact_desc = kabkota_ec_desc ?? prev.emergency_contact.kabkota_emergency_contact_desc
  state.formData.emergency_contact.provinsi_emergency_contact_code = provinsi_ec_code ?? prev.emergency_contact.provinsi_emergency_contact_code
  state.formData.emergency_contact.provinsi_emergency_contact_desc = provinsi_ec_desc ?? prev.emergency_contact.provinsi_emergency_contact_desc
}
