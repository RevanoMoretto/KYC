import { fetchPaymentMethode } from "../action/fetch_payment_methode";

export const fetchPaymentMethodeReducers = (builder) => {
  builder
    .addCase(fetchPaymentMethode.pending, (state) => {
      state.paymentMethode.loading = true;
      state.paymentMethode.error = null;
    })
    .addCase(fetchPaymentMethode.fulfilled, (state, action) => {
      state.paymentMethode.loading = false;
      state.paymentMethode.data = action.payload.result.map((e) => {
        return {
          value: e.payment_code,
          label: e.payment_desc
        }
      });
    })
    .addCase(fetchPaymentMethode.rejected, (state, action) => {
      state.paymentMethode.loading = false;
      state.paymentMethode.error = action.payload || "An error occurred from fetching data payment methode";
    });
};