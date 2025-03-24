<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CIlIAC.Dz</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: url('images/Black Bones.png') no-repeat center center/cover;
            background-position: right top
                                  left top           ;
            margin: 0;
            padding: 0;
        }
        header {
            background-color: #388e3c;
            color: white;
            padding: 20px;
            font-size: 26px;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            border-radius: 0 0 15px 15px;
        }
        .language-switch {
            margin: 20px;
        }
        .language-switch button {
            padding: 12px 24px;
            margin: 5px;
            font-size: 18px;
            cursor: pointer;
            border: none;
            border-radius: 20px;
            background-color: #00796b;
            color: white;
            transition: 0.3s;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .language-switch button:hover {
            background-color: #004d40;
        }
        .container {
            max-width: 900px;
            margin: 20px auto;
            text-align: center;
            padding: 20px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .menu {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
            margin-top: 20px;
        }
        .menu a {
            display: block;
            width: 200px;
            padding: 12px;
            background: linear-gradient(to right, #66bb6a, #81c784);
            color: white;
            text-decoration: none;
            font-size: 18px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: 0.3s;
        }
        .menu a:hover {
            background: linear-gradient(to right, #2e7d32, #66bb6a);
            transform: scale(1.05);
        }
        .welcome {
            font-size: 18px;
            margin-top: 20px;
            line-height: 1.6;
            color: #444;
        }
        .video-container {
            margin-top: 20px;
        }
    </style>
    <script>
        function switchLanguage(lang) {
            const text = {
                "ar": {
                    title: "CILIAC.Dz",
                    welcome: "مرحبًا بكم في موقعنا المخصص لدعم مرضى السيلياك!",
                    tips: "نصائح حول مرض السيلياك",
                    doctors: "عناوين الأطباء",
                    scanner: "ماسح أكواد المنتجات",
                    restaurants: "المطاعم والمخابز",
                    recipes: "الوصفات"
                },
                "fr": {
                    title: "Gluten Free Celiac",
                    welcome: "Bienvenue sur notre site dédié au soutien des patients atteints de la maladie cœliaque!",
                    tips: "Conseils sur la maladie cœliaque",
                    doctors: "Adresses des médecins",
                    scanner: "Scanner de code produit",
                    restaurants: "Restaurants et boulangeries",
                    recipes: "Recettes"
                }
            };
            document.getElementById("page-title").innerText = text[lang].title;
            document.getElementById("welcome-text").innerText = text[lang].welcome;
            document.getElementById("tips").innerText = text[lang].tips;
            document.getElementById("doctors").innerText = text[lang].doctors;
            document.getElementById("scanner").innerText = text[lang].scanner;
            document.getElementById("restaurants").innerText = text[lang].restaurants;
            document.getElementById("recipes").innerText = text[lang].recipes;
        }
    </script>
</head>
<body onload="switchLanguage('ar')">
    <header id="page-title">Gluten Free Celiac</header>
    <div class="language-switch">
        <button onclick="switchLanguage('ar')">🇩🇿 العربية</button>
        <button onclick="switchLanguage('fr')">🇫🇷 Français</button>
    </div>
    <div class="container">
        <p class="welcome" id="welcome-text">مرحبًا بكم في موقعنا...</p>
        <div class="menu">
            <a href="index(2).html" id="tips">نصائح حول مرض السيلياك</a>
            <a href="doctors.html" id="doctors">عناوين الأطباء</a>
            <a href="INDEX (3).HTML" id="scanner">ماسح أكواد المنتجات</a>
            <a href="maps.html" id="restaurants">المطاعم والمخابز</a>
            <a href="recipes.html" id="recipes">الوصفات</a>
        </div>
        <div class="video-container">
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/7JFz3AMytW8" frameborder="0" allowfullscreen></iframe>
        </div>
       
    </div>
</body>
</html>

