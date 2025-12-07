const API_URL = "https://script.google.com/macros/s/AKfycbx7Yi4M59PMAWVDpm7IaiEfbysS43Vu_Jrbku71LA4OoQ5zVrZTnh2dTe3LpeVQCqeM/exec";

async function fetchHistory() {
  const list = document.getElementById("historyList");
  list.innerHTML = "讀取中...";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      list.innerHTML = "";
      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <p class="number"><strong>${item.number}</strong></p>
          <p class="mood"><strong>心情：</strong>${item.mood}</p>
          ${item.note ? `<p class="note"><strong>備註：</strong>${item.note}</p>` : ""}
          <p class="timestamp">${item.timestamp}</p>
        `;
        list.appendChild(card);
      });
    } else {
      list.innerHTML = "<p>目前沒有紀錄 ✨</p>";
    }

  } catch (err) {
    list.innerHTML = `<p>⚠️ 讀取失敗：${err}</p>`;
  }
}

// 頁面載入時自動抓資料
window.addEventListener("DOMContentLoaded", fetchHistory);
