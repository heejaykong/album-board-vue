import axios from "axios";
import apiAuth from "@/apis/auth";

async function getBoards(pageNo = 1) {
  let page = null;
  try {
    const response = await axios.get("/board/list", { params: { pageNo } });
    page = response.data;
  } catch (error) {
    if (error.response.status === 403) {
      if (await apiAuth.refreshToken()) {
        const response = await axios.get("/board/list", { params: { pageNo } });
        page = response.data;
      }
    }
  }
  return page;
}

async function getBoard(bno, hit) {
  let board = null;
  try {
    const response = await axios.get(`/board/${bno}`, { params: { hit } });
    board = response.data;
  } catch (error) {
    if (error.response.status === 403) {
      if (await apiAuth.refreshToken()) {
        const response = await axios.get(`/board/${bno}`, { params: { hit } });
        board = response.data;
      }
    }
  }
  return board;
}

async function writeBoard(multipartFormData) {
  let createdBoard = null;
  try {
    const response = await axios.post("/board/", multipartFormData);
    createdBoard = response.data;
  } catch (error) {
    if (error.response.status === 403) {
      if (await apiAuth.refreshToken()) {
        const response = await axios.post("/board/", multipartFormData);
        createdBoard = response.data;
      }
    }
  }
  return createdBoard;
}

async function updateBoard(multipartFormData) {
  let updatedBoard = null;
  try {
    const response = await axios.put("/board/", multipartFormData);
    updatedBoard = response.data;
  } catch (error) {
    if (error.response.status === 403) {
      if (await apiAuth.refreshToken()) {
        const response = await axios.put("/board/", multipartFormData);
        updatedBoard = response.data;
      }
    }
  }
  return updatedBoard;
}

async function deleteBoard(bno) {
  let result = null;
  try {
    const response = await axios.delete(`/board/${bno}`);
    result = response.data;
  } catch (error) {
    if (error.response.status === 403) {
      if (await apiAuth.refreshToken()) {
        const response = await axios.delete(`/board/${bno}`);
        result = response.data;
      }
    }
  }
  return result;
}

async function download(bno) {
  let blob = null;
  try {
    const response = await axios.get(`/board/battach/${bno}`, { responseType: "blob" });
    blob = response.data;
  } catch (error) {
    if (error.response.status === 403) {
      if (await apiAuth.refreshToken()) {
        const response = await axios.get(`/board/battach/${bno}`, { responseType: "blob" });
        blob = response.data;
      }
    }
  }
  return blob;
}

export default {
  getBoards,
  download,
  getBoard,
  deleteBoard,
  writeBoard,
  updateBoard,
};
