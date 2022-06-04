import axios from "axios";

async function getBoards(pageNo = 1) {
  let page = null;
  try {
    const response = await axios.get("/board/list", { params: { pageNo } });
    page = response.data;
  } catch (error) {
    console.log(error);
  }
  return page;
}

async function download(bno) {
  let blob = null;
  try {
    const response = await axios.get(`/board/battach/${bno}`, { responseType: "blob" });
    blob = response.data;
  } catch (error) {
    console.log(error);
  }
  return blob;
}

export default { getBoards, download };
