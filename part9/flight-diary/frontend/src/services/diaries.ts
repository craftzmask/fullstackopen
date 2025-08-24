import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "/api/diaries";

const getAll = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((res) => res.data);
};

const create = (object: NewDiaryEntry) => {
  return axios.post<DiaryEntry>(baseUrl, object).then((res) => res.data);
};

export default { getAll, create };
