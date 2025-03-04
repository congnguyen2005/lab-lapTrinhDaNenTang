import axios from "axios";

const API_KEY = "AIzaSyBU6cKbwt0mNdXfTfKc3sLDCqdR661AoDg"; // ⚠️ Thay bằng API Key của bạn

export const sendMessageToAI = async (message) => {
  try {
    const response = await axios.post(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: message }] }],
      }
    );
    
    return response.data.candidates[0]?.content?.parts[0]?.text || "Không có phản hồi từ AI.";
  } catch (error) {
    console.error("Lỗi gọi API:", error);
    return "Lỗi khi kết nối với AI.";
  }
};
