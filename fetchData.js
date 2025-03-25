async function fetchProductData(barcode) {
    try {
        let apiUrl = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
        let response = await fetch(apiUrl);
        let data = await response.json();

        console.log("📢 البيانات الكاملة من API:", data); // ✅ طباعة البيانات لفحصها

        if (!data || !data.product) {
            document.getElementById('result').innerText = "⚠️ المنتج غير موجود في قاعدة البيانات!";
            return;
        }

        let product = data.product;
        let productName = product.product_name || "غير معروف";
        let brand = product.brands || "غير محدد";

        // 🛑 التحقق من المكونات بـ 3 لغات 🛑
        let ingredients = (
            product.ingredients_text ||
            product.ingredients_text_ar ||
            product.ingredients_text_fr ||
            product.ingredients_text_en ||
            "لا توجد مكونات"
        ).toLowerCase();

        let gluten_status = "🚨 غير محدد"; // الافتراضي

        // ✅ طباعة المكونات
        console.log("🍽️ المكونات:", ingredients);

        // 1️⃣ **إذا كانت هناك بيانات Open Food Facts عن الغلوتين**
        if (product.ingredients_analysis_tags && Array.isArray(product.ingredients_analysis_tags)) {
            if (product.ingredients_analysis_tags.includes("en:gluten-free")) {
                gluten_status = "✅ خالٍ من الغلوتين";
            } else if (product.ingredients_analysis_tags.includes("en:contains-gluten")) {
                gluten_status = "❌ يحتوي على الغلوتين";
            }
        }

        // 2️⃣ **إذا لم تكن هناك بيانات، نفحص المكونات يدويًا**
        if (gluten_status === "🚨 غير محدد") {
            let glutenKeywords = [
                "قمح", "فرينة", "جلوتين", "شعير", "كسكس", "شوفان", "نشا القمح", // بالعربية
                "wheat", "flour", "gluten", "barley", "couscous", "oats", "wheat starch", // بالإنجليزية
                "blé", "farine", "gluten", "orge", "couscous", "avoine", "amidon de blé" // بالفرنسية
            ];

            let containsGluten = glutenKeywords.some(word => ingredients.includes(word));

            if (containsGluten) {
                gluten_status = "❌ يحتوي على الغلوتين (تحليل المكونات)";
            } else {
                gluten_status = "✅ خالٍ من الغلوتين (تحليل المكونات)";
            }
        }

        // ✅ تحديث النتيجة في الصفحة
        document.getElementById('result').innerHTML = `
            📦 المنتج: ${productName} <br>
            🏭 العلامة التجارية: ${brand} <br>
            🍽️ المكونات: ${ingredients} <br>
            ⚠️ حالة الغلوتين: ${gluten_status}
        `;
    } catch (error) {
        document.getElementById('result').innerText = "❌ خطأ في جلب البيانات!";
        console.error("❌ خطأ:", error);
    }
}

function onScanSuccess(decodedText, decodedResult) {
    document.getElementById('result').innerText = "جارٍ جلب البيانات...";
    fetchProductData(decodedText);
}

function onScanFailure(error) {
    console.warn(`خطأ في المسح: ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess, onScanFailure);
