import axios from "axios";

const FAIL_MESSAGE_NETWORK = "fail-network";

async function join(user) {
  let result = null;
  try {
    const response = await axios.post("/member/join", user);
    result = response.data.result; // successful, duplicated, failed 중 하나
  } catch (error) {
    console.log(error);
    result = FAIL_MESSAGE_NETWORK;
  }
  return result;
}

export default {
  join,
};
