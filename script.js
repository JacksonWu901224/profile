// 切換側邊選單的顯示和隱藏
function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    var mainContent = document.getElementById("main-content");
    if (sidebar.style.width === "150px") {
        sidebar.style.width = "0"; // 隱藏
        mainContent.style.marginLeft = "0";
    } else {
        sidebar.style.width = "150px"; // 顯示
        mainContent.style.marginLeft = "150px";
    }
}

// 當點擊頁面其他區域時，關閉側邊選單
window.onclick = function(event) {
    var sidebar = document.getElementById("sidebar");
    var mainContent = document.getElementById("main-content");
    if (!event.target.matches('.menu-button') && !event.target.matches('#sidebar') && !event.target.matches('.sidebar a')) {
        if (sidebar.style.width === "150px") {
            sidebar.style.width = "0"; // 隱藏
            mainContent.style.marginLeft = "0";
        }
    }
}

// 針對觸控設備，使用 touchstart 事件來捕捉觸摸
window.addEventListener('touchstart', function(event) {
    var sidebar = document.getElementById("sidebar");
    var mainContent = document.getElementById("main-content");

    // 如果點擊的位置不是側邊選單或側邊選單的鏈接
    if (!event.target.matches('.menu-button') && 
        !event.target.matches('#sidebar') && 
        !event.target.matches('.sidebar a')) {

        // 如果側邊選單是開啟的，點擊其他地方時關閉側邊選單
        if (sidebar.style.width === "150px") {
            sidebar.style.width = "0"; // 隱藏
            mainContent.style.marginLeft = "0"; // 恢復原來的位置
        }
    }
});
