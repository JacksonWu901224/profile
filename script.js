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
