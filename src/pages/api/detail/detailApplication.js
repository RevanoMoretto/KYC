import URLS from "../../../constants/urls";
import Storage from "../../../utils/storage";

export default function detailApplication() {
    // token masih hardcode
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMDAxNDIzNiIsImV4cCI6MTc0NjUyMDMwNCwiaWF0IjoxNzQ2NDMzOTA0fQ._4gYt8oYoQoKlQX3vWG4zHjc6jvqK5dpF0ppRJv06gcnRwFn6EDcTtoZpw8cpzb2dNg-DOKBhJCnzwkeYHbmGA"
    const dataKyc = new Storage("kyc_detail").value;
    const orderId = dataKyc?.order_id
    const url = process.env.NEXT_PUBLIC_DETAIL_APPLICATION + "/aplikasi/"+orderId+"/"+token
    
    return url;
}