const API_URL = "https://script.google.com/macros/s/AKfycbyk6Xyegsfs4ej6BsFEzfbSWEEt6ehNACQJ9hQFxfDFiN4b4zNSV8-QLwUyLyDn__t_/exec"; // <<< 你的 Apps Script URL 放這裡

const form = document.getElementById("angelForm");
const msg = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const number = document.getElementById("number").value.trim();
  const mood = document.getElementById("mood").value.trim();
  const note = document.getElementById("note").value.trim();

  msg.textContent = "送出中...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        number,
        mood,
        note
      })
    });

    const data = await res.json();

    if (data.status === "success") {
    msg.textContent = "✨ 已成功寫入！即將跳轉歷史紀錄...";
    form.reset();
    setTimeout(() => {
        window.location.href = "history.html"; // 跳轉到歷史頁
    }, 1200); // 1.2秒後跳轉
}

    else {
      msg.textContent = "寫入失敗：" + data.message;
    }

  } catch (error) {
    msg.textContent = "⚠️ 連線錯誤：" + error;
  }
});
