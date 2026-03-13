/**
 * Backend server cho hệ thống coaching
 * - Xử lý gửi email cho mentor
 * - Có thể mở rộng thêm tính năng khác
 */

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ═══════════════ EMAIL CONFIG ═══════════════
// Sử dụng Gmail hoặc email provider khác
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Test connection khi start server
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email service error:", error);
  } else {
    console.log("✅ Email service ready");
  }
});

// ═══════════════ ROUTES ═══════════════

/**
 * POST /api/send-email
 * Gửi email từ student tới mentor
 */
app.post("/api/send-email", async (req, res) => {
  try {
    const { to, subject, message, senderEmail, courseId } = req.body;

    // Validate
    if (!to || !subject || !message || !senderEmail) {
      return res.status(400).json({
        error: "Missing required fields: to, subject, message, senderEmail"
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to) || !emailRegex.test(senderEmail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Tạo HTML template cho email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%); padding: 20px; border-radius: 8px; color: white; margin-bottom: 20px;">
          <h2 style="margin: 0;">Tin nhắn mới từ học viên</h2>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 0 0 10px 0;"><strong>Từ:</strong> ${senderEmail}</p>
          <p style="margin: 0 0 10px 0;"><strong>Tiêu đề:</strong> ${subject}</p>
          ${courseId ? `<p style="margin: 0;"><strong>Khóa học ID:</strong> ${courseId}</p>` : ""}
        </div>

        <div style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #1e293b;">Nội dung:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6; color: #475569;">${message}</p>
        </div>

        <div style="color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
          <p style="margin: 0;">Đây là email tự động từ hệ thống BCN Coach.</p>
          <p style="margin: 0;">Vui lòng trả lời email này hoặc liên hệ qua dashboard để phản hồi học viên.</p>
        </div>
      </div>
    `;

    const plainText = `
Tin nhắn mới từ học viên
========================

Từ: ${senderEmail}
Tiêu đề: ${subject}
${courseId ? `Khóa học ID: ${courseId}` : ""}

Nội dung:
${message}

---
Đây là email tự động từ hệ thống BCN Coach.
    `;

    // Gửi email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: `[BCN Coach] ${subject}`,
      text: plainText,
      html: htmlContent,
      replyTo: senderEmail
    });

    // Log để tracking
    console.log(`📧 Email sent: ${senderEmail} → ${to}`);

    res.json({
      success: true,
      message: "Email gửi thành công"
    });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({
      error: "Không thể gửi email",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

/**
 * GET /api/mentor-info/:courseId
 * Lấy thông tin mentor cho khóa học
 */
app.get("/api/mentor-info/:courseId", (req, res) => {
  const { courseId } = req.params;

  // TODO: Lấy từ database thực
  const mentors = {
    "khoa-git": {
      id: "mentor-001",
      name: "Mentor Mikademy",
      email: "mentor.mikademy@example.com",
      role: "Mentor phụ trách khóa 'Git Foundation'",
      avatar: "M"
    },
    "khoa-react": {
      id: "mentor-002",
      name: "Mentor React Pro",
      email: "mentor.react@example.com",
      role: "Mentor phụ trách khóa 'React Advanced'",
      avatar: "R"
    }
  };

  const mentorInfo = mentors[courseId] || {
    name: "Mentor của bạn",
    email: "mentor@example.com",
    role: "Coach 1-1"
  };

  res.json(mentorInfo);
});

// ═══════════════ AI CHAT (GROQ) ═══════════════
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";

const BCN_COACH_CONTEXT = `
Bạn là trợ lý ảo của BCN Coach - nền tảng học lập trình 1-1. Trả lời ngắn gọn, thân thiện, bằng tiếng Việt.

Thông tin cần nhớ:
- Khóa học: có nhiều khóa như Nhập môn lập trình, OOP, Git Foundation, Angular căn bản, Next.js 15, NestJS, Cơ sở dữ liệu & Data Engineering, Flutter, Firebase, 2K Preparation for Dev, LLM & GenAI, DevOps, v.v. Học viên xem chi tiết tại trang Khóa học.
- Ưu đãi: Khóa học đầu tiên giảm 10%; Combo Full Stack (Git, Next.js, NestJS, Cơ sở dữ liệu) giảm 15% khi đã có ít nhất 1 khóa Full Stack.
- Lộ trình Full Stack gợi ý: Git → Next.js → NestJS → Cơ sở dữ liệu.
- Liên hệ: Hotline 123 456 789, email mentor mentor@example.com, trang Liên hệ để gửi form.
- Chỉ tư vấn trong phạm vi khóa học, lộ trình, ưu đãi, đăng ký, liên hệ. Nếu hỏi ngoài phạm vi, nhẹ nhàng hướng về các chủ đề trên.
`;

/**
 * POST /api/chat
 * Chat với AI (Groq). Body: { message: string, history?: { role: "user"|"assistant", content: string }[] }
 * Cần cấu hình GROQ_API_KEY trong .env (lấy free tại https://console.groq.com)
 */
app.post("/api/chat", async (req, res) => {
  try {
    if (!GROQ_API_KEY) {
      return res.status(503).json({
        error: "AI_CHAT_UNAVAILABLE",
        message: "Chat AI chưa được cấu hình (thiếu GROQ_API_KEY). Dùng trợ lý nội bộ.",
      });
    }

    const { message, history = [] } = req.body || {};
    const userMessage = typeof message === "string" ? message.trim() : "";

    if (!userMessage) {
      return res.status(400).json({ error: "Missing or empty message" });
    }

    const messages = [
      { role: "system", content: BCN_COACH_CONTEXT },
      ...history.slice(-10).map((h) => ({
        role: h.role === "assistant" ? "assistant" : "user",
        content: h.content || "",
      })),
      { role: "user", content: userMessage },
    ];

    const response = await fetch(GROQ_CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages,
        max_tokens: 512,
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", response.status, errText);
      return res.status(502).json({
        error: "AI_REQUEST_FAILED",
        message: "Không thể xử lý câu hỏi. Bạn thử lại hoặc dùng trợ lý nội bộ.",
      });
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content?.trim() || "Xin lỗi, tôi chưa trả lời được. Bạn thử hỏi về khóa học, lộ trình hoặc ưu đãi nhé.";

    res.json({ reply: content });
  } catch (error) {
    console.error("❌ /api/chat error:", error);
    res.status(500).json({
      error: "AI_ERROR",
      message: "Lỗi xử lý. Bạn thử lại hoặc dùng trợ lý nội bộ.",
    });
  }
});

/**
 * POST /api/chat/save
 * Lưu tin nhắn chat (nếu có database)
 */
app.post("/api/chat/save", (req, res) => {
  try {
    const { courseId, from, message } = req.body;

    if (!courseId || !from || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // TODO: Lưu vào database
    console.log(`💬 Chat: ${from} → Course ${courseId}: ${message}`);

    res.json({
      success: true,
      message: "Chat saved"
    });
  } catch (error) {
    console.error("❌ Error saving chat:", error);
    res.status(500).json({ error: "Không thể lưu chat" });
  }
});

// ═══════════════ ERROR HANDLING ═══════════════
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// ═══════════════ START SERVER ═══════════════
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_SERVICE || "gmail"}`);
});
