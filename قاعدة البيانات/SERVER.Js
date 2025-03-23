const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ✅ الاتصال بقاعدة البيانات بدون الخيارات القديمة
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ تم الاتصال بقاعدة البيانات بنجاح!"))
  .catch(err => console.error("❌ فشل الاتصال بقاعدة البيانات:", err));

app.get("/", (req, res) => {
  res.send("🚀 الخادم يعمل بنجاح!");
});

app.listen(PORT, () => {
  console.log(`✅ الخادم يعمل على http://localhost:${PORT}`);
});
