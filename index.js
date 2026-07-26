<!DOCTYPE html>
<html lang="ku" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مۆسیقا و گۆرانی - کۆنتڕۆڵی گشتگیر</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="main-container">
        <!-- سەردێڕی پڕۆژە -->
        <header>
            <h1>پڕۆژەی کۆنتڕۆڵی گۆرانی</h1>
            <p>یوتیوب • سپۆتیفای • تیک تۆک</p>
        </header>

        <!-- بەشی پیشاندانی کەنال و دۆخی ئێستا -->
        <div class="display-screen">
            <div id="platform-badge" class="badge youtube">یوتیوب</div>
            <h2 id="song-title">ناوی گۆرانی لێرە دەردەکەوێت</h2>
            <p id="artist-name">هونەرمەند</p>
        </div>

        <!-- بەشی ١: کۆنتڕۆڵی مۆدێرن (ڕووکاری شوشەیی) -->
        <section class="control-section modern-ui">
            <h3>شێوازی مۆدێرن</h3>
            <div class="players-grid">
                <div class="player-card" data-platform="youtube">
                    <span>YouTube</span>
                </div>
                <div class="player-card" data-platform="spotify">
                    <span>Spotify</span>
                </div>
                <div class="player-card" data-platform="tiktok">
                    <span>TikTok</span>
                </div>
            </div>
        </section>

        <!-- بەشی ٢: کۆنتڕۆڵی کلاسیک (دوگمەی ڕەقی دەستی) -->
        <section class="control-section classic-ui">
            <h3>شێوازی کلاسیک</h3>
            <div class="classic-buttons">
                <button class="c-btn" onclick="switchPlatform('youtube')">YouTube</button>
                <button class="c-btn" onclick="switchPlatform('spotify')">Spotify</button>
                <button class="c-btn" onclick="switchPlatform('tiktok')">TikTok</button>
            </div>
        </section>

        <!-- دوگمە سەرەکییەکانی کۆنتڕۆڵ (بە فەرمانی Control کاردەکەن) -->
        <div class="global-controls">
            <button id="prev-btn" class="ctrl-main-btn">⏮ پێشوو (Ctrl + ←)</button>
            <button id="play-btn" class="ctrl-main-btn primary">⏵ لێدان / وه‌ستان (Ctrl + Space)</button>
            <button id="next-btn" class="ctrl-main-btn">دواتر (Ctrl + →) ⏭</button>
        </div>
    </div>

    <script src="control.js"></script>
</body>
</html>
