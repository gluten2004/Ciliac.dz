async function fetchProductData(barcode) {
    try {
        let apiUrl = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
        let response = await fetch(apiUrl);
        let data = await response.json();

        console.log("📢 البيانات الكاملة من API:", data); // ✅ طباعة كل البيانات

        if (!data || !data.product) {
            document.getElementById('result').innerText = "⚠️ المنتج غير موجود في قاعدة البيانات!";
            return;
        }

        let product = data.product;
        let productName = product.product_name || "غير معروف";
        let brand = product.brands || "غير محدد";

        // 🔍 المكونات باللغات المتاحة
        let ingredients = (
            product.ingredients_text_ar || 
            product.ingredients_text_fr || 
            product.ingredients_text_en || 
            product.ingredients_text || 
            "لا توجد مكونات"
        ).toLowerCase().trim(); // تحويل إلى حروف صغيرة وإزالة الفراغات

        console.log("🍽️ المكونات المستخرجة:", ingredients);

        let gluten_status = "🚨 غير محدد"; // الافتراضي

        // ✅ التحقق مما إذا كانت بيانات الغلوتين متوفرة في API
        if (product.ingredients_analysis_tags && Array.isArray(product.ingredients_analysis_tags)) {
            console.log("🔍 تحليل المكونات من API:", product.ingredients_analysis_tags);
            if (product.ingredients_analysis_tags.includes("en:gluten-free")) {
                gluten_status = "✅ خالٍ من الغلوتين";
            } else if (product.ingredients_analysis_tags.includes("en:contains-gluten")) {
                gluten_status = "❌ يحتوي على الغلوتين";
            }
        }

        // ✅ إذا لم يكن هناك تحليل من API، نفحص يدويًا الكلمات في المكونات
        if (gluten_status === "🚨 غير محدد") {
            let glutenKeywords = [
                "قمح", "فرينة", "جلوتين", "شعير", "كسكس", "شوفان", "نشا القمح",  // بالعربية
                "wheat", "flour", "gluten", "barley", "couscous", "oats", "wheat starch", // بالإنجليزية
                "blé", "farine", "gluten", "orge", "couscous", "avoine", "amidon de blé" // بالفرنسية
            ];

            let containsGluten = glutenKeywords.some(word => {
                let found = ingredients.includes(word);
                if (found) console.log(`❗ تم العثور على مكون يحتوي على الغلوتين: ${word}`);
                return found;
            });

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
