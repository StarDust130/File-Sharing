/* eslint-disable import/no-anonymous-default-export */

import axios from "axios";


//! Send Email to user
const SendEmail =  (data) => {
  axios.post("/api/send",data);
 
};

export default {
  SendEmail,
};

