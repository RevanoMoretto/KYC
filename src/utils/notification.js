import { notification } from "antd";

const notify = (type, msg, desc) => {
  switch(type){
    case "success":
      notification.success({
        message: msg,
        description: desc
      })
      break;
    case "info":
      notification.info({
        message: msg,
        description: desc
      })
      break;
    case "error":
      notification.error({
        message: msg,
        description: desc
      })
      break;
  }
}

export default notify