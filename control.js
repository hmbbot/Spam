// زانیاری نموونەیی گۆرانییەکان بۆ هەر پلاتفۆرمێک
const playlist = {
    youtube: { title: "گۆرانی سەر یوتیوب - بەشی ١", artist: "کەناڵی یوتیوب", badgeClass: "youtube", name: "یوتیوب" },
    spotify: { title: "پلەیلیستی سپۆتیفای هێمن", artist: "سپۆتیفای ئارتست", badgeClass: "spotify", name: "سپۆتیفای" },
    tiktok: { title: "ترێندی تازەی تیک تۆک", artist: "تیک تۆکە مۆسیقا", badgeClass: "tiktok", name: "تیک تۆک" }
};

let currentPlatform = 'youtube';
let isPlaying = false;

// گۆڕینی پلاتفۆرم (ڕاستەوخۆ یان لە ڕێگەی کلیکەوە)
function switchPlatform(platform) {
    if (!playlist[platform]) return;
    currentPlatform = platform;
    
    // نوێکردنەوەی شاشە
    document.getElementById('song-title').innerText = playlist[platform].title;
    document.getElementById('artist-name').innerText = playlist[platform].artist;
    
    let badge = document.getElementById('platform-badge');
    badge.className = `badge ${playlist[platform].badgeClass}`;
    badge.innerText = playlist[platform].name;

    // دیاریکردنی کارتی چالاک لە بەشی مۆدێرن
    document.querySelectorAll('.player-card').forEach(card => {
        if(card.getAttribute('data-platform') === platform) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

// بەستنەوەی کارتی مۆدێرن بە گۆڕینی پلاتفۆرم
document.querySelectorAll('.player-card').forEach(card => {
    card.addEventListener('click', () => {
        switchPlatform(card.getAttribute('data-platform'));
    });
});

// کۆنتڕۆڵی لێدان و وەستان
function togglePlay() {
    isPlaying = !isPlaying;
    const playBtn = document.getElementById('play-btn');
    if (isPlaying) {
        playBtn.innerText = "⏸ وەستاندن (Ctrl + Space)";
    } else {
        playBtn.innerText = "⏵ لێدان (Ctrl + Space)";
    }
}

// بەستنەوەی دوگمەکان بە دەسەڵاتی کلیکی گشتی
document.getElementById('play-btn').addEventListener('click', togglePlay);

// فەرمانی تەنها بە (Ctrl) کاربکات
window.addEventListener('keydown', (event) => {
    // دەبێت کلیلی Control داگیرابێت لەگەڵ دوگمەیەکی تر
    if (event.ctrlKey) {
        switch (event.code) {
            case 'Space': // Ctrl + Space بۆ لێدان و وەستان
                event.preventDefault();
                togglePlay();
                break;
            case 'ArrowRight': // Ctrl + تیرەی ڕاست بۆ گۆڕینی پلاتفۆرم بۆ دواتر
                event.preventDefault();
                if (currentPlatform === 'youtube') switchPlatform('spotify');
                else if (currentPlatform === 'spotify') switchPlatform('tiktok');
                else switchPlatform('youtube');
                break;
            case 'ArrowLeft': // Ctrl + تیرەی چەپ بۆ گۆڕینی پلاتفۆرم بۆ پێشوو
                event.preventDefault();
                if (currentPlatform === 'tiktok') switchPlatform('spotify');
                else if (currentPlatform === 'spotify') switchPlatform('youtube');
                else switchPlatform('tiktok');
                break;
        }
    }
});

// دەستپێک لەسەر یوتیوب
switchPlatform('youtube');
