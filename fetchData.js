const axios = require('axios');
const connectDB = require('./database');
const Food = require('./models/Food');

connectDB();

const fetchData = async () => {
    try {
        const response = await axios.get('https://world.openfoodfacts.org/api/v0/product/737628064502.json');
        const product = response.data.product;

        const foodItem = new Food({
            product_name: product.product_name || "غير معروف",
            brands: product.brands || "غير محدد",
            ingredients_text: product.ingredients_text || "لا توجد مكونات",
            nutriscore_grade: product.nutriscore_grade || "N/A",
            image_url: product.image_url || ""
        });

        await foodItem.save();
        console.log("✅ تم حفظ البيانات بنجاح:", foodItem);
    } catch (err) {
        console.error("❌ خطأ في جلب البيانات:", err);
    }
};

fetchData();

