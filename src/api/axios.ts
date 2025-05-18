import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  // Bạn có thể thêm các cấu hình mặc định khác ở đây
});

export default api;
