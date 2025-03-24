const axios = require('axios');
const connectDB = require('./database');
const Food = require('./models/Food');

connectDB();

const fetchData = async () => {
    try {
        const response = await axios.get('https://world.openfoodfacts.org/api/v0/product/737628064502.json');
        const product = response.data.product;

        console.log("📦 البيانات الأصلية من API:", product); // عرض البيانات المسترجعة

        // التحقق مما إذا كانت العلامات التحليلية موجودة
        let gluten_status = "غير معروف"; // القيمة الافتراضية

        if (product.ingredients_analysis_tags) {
            if (product.ingredients_analysis_tags.includes("en:gluten-free")) {
                gluten_status = "خالٍ من الغلوتين ✅";
            } else if (product.ingredients_analysis_tags.includes("en:contains-gluten")) {
                gluten_status = "يحتوي على الغلوتين ❌";
            }
        }

        const foodItem = new Food({
            product_name: product.product_name || "غير معروف",
            brands: product.brands || "غير محدد",
            ingredients_text: product.ingredients_text || "لا توجد مكونات",
            nutriscore_grade: product.nutriscore_grade || "N/A",
            gluten_free: gluten_status, // عرض النتيجة بشكل نصي
            image_url: product.image_url || ""
        });

        await foodItem.save(); // حفظ المنتج في قاعدة البيانات
        console.log("✅ تم حفظ البيانات بنجاح:", foodItem);

        const allProducts = await Food.find(); // جلب جميع المنتجات بعد الحفظ
        console.log("🛒 جميع المنتجات المخزنة بعد الحفظ:", allProducts);

    } catch (err) {
        console.error("❌ خطأ في جلب البيانات:", err);
    }
};

fetchData();
