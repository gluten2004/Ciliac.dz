const axios = require('axios');
const connectDB = require('./database');
const Food = require('./models/Food');

connectDB();

const fetchData = async (barcode) => {
    try {
        const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
        const response = await axios.get(apiUrl);
        const product = response.data.product;

        if (!product) {
            console.log("⚠️ المنتج غير موجود في قاعدة البيانات!");
            return;
        }

        const productName = product.product_name || "غير معروف";
        const brand = product.brands || "غير محدد";
        const ingredients = product.ingredients_text || "❌ لا توجد مكونات متاحة";
        const nutriscore = product.nutriscore_grade || "N/A";
        const imageUrl = product.image_url || "";
        let glutenStatus = "🚨 غير محدد"; // الحالة الافتراضية

        // ✅ 1️⃣ فحص الغلوتين باستخدام تحليل Open Food Facts API
        if (product.ingredients_analysis_tags && Array.isArray(product.ingredients_analysis_tags)) {
            if (product.ingredients_analysis_tags.includes("en:gluten-free")) {
                glutenStatus = "✅ خالٍ من الغلوتين";
            } else if (product.ingredients_analysis_tags.includes("en:contains-gluten")) {
                glutenStatus = "❌ يحتوي على الغلوتين";
            }
        }

        // ✅ 2️⃣ فحص المكونات يدويًا إذا لم يحدد الـ API الحالة
        if (glutenStatus === "🚨 غير محدد") {
            const glutenKeywords = ["قمح", "فرينة", "جلوتين", "شعير", "كسكس", "شوفان", "سميد القمح", "malt", "wheat", "barley", "oats"];
            const containsGluten = glutenKeywords.some(word => ingredients.toLowerCase().includes(word.toLowerCase()));

            if (containsGluten) {
                glutenStatus = "❌ يحتوي على الغلوتين (تحليل المكونات)";
            } else {
                glutenStatus = "✅ خالٍ من الغلوتين (تحليل المكونات)";
            }
        }

        // ✅ حفظ البيانات في قاعدة البيانات
        const foodItem = new Food({
            product_name: productName,
            brands: brand,
            ingredients_text: ingredients,
            nutriscore_grade: nutriscore,
            image_url: imageUrl,
            gluten_status: glutenStatus // 🆕 إضافة حالة الغلوتين
        });

        await foodItem.save();
        console.log("✅ تم حفظ البيانات بنجاح:", foodItem);
    } catch (err) {
        console.error("❌ خطأ في جلب البيانات:", err);
    }
};

// 👇 تجربة البحث عن منتج معين باستخدام الباركود
fetchData("737628064502"); 
