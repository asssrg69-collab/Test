lucide.createIcons();

const menuBtn = document.querySelector('.menu-button');
const sidebar = document.getElementById('sidebar');

// toggle sidebar โดยใช้ปุ่มเท่านั้น
menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  menuBtn.classList.toggle('active');
});

// ลบ event listener ที่ปิด sidebar เมื่อคลิกที่อื่น
// document.addEventListener('click', ...) <- ไม่ต้องใช้แล้ว

// Dropdown menu
function setupDropdown(dropdownSelector, linkSelector) {
  const dropdown = document.querySelector(dropdownSelector);
  const link = dropdown.querySelector(linkSelector);

  link.addEventListener('click', e => {
    e.preventDefault();
    dropdown.classList.toggle('open');
  });

  // ปิด dropdown ถ้าคลิกที่อื่น (ยกเว้น sidebar)
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target) && e.target !== link) {
      dropdown.classList.remove('open');
    }
  });
}

setupDropdown('.dropdown', '.Doujin-link');
setupDropdown('.dropdown-XXXVideo', '.XXXVideo');
setupDropdown('.dropdown-Hentai', '.Hentai-link');

function openPopup(event, url) {
  event.preventDefault(); // 🔥 กันไม่ให้เปลี่ยนหน้า
  event.stopPropagation(); // กัน dropdown ปิด

  const popup = document.getElementById("popup");
  const frame = document.getElementById("popupFrame");

  frame.src = url;
  popup.style.display = "block";
}


function closePopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("popupFrame").src = "";
}

function openPopup(event, url) {
  event.preventDefault();
  event.stopPropagation();

  const frame = document.getElementById("popupFrame");

  try {
    frame.src = url;
    document.getElementById("popup").style.display = "block";
  } catch {
    window.open(url, "_blank");
  }
}

function openPopup(event, url) {
  event.preventDefault();
  event.stopPropagation();

  document.getElementById("popupFrame").src = url;
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popupFrame").src = "";
  document.getElementById("popup").style.display = "none";
}

function goBack() {
  const frame = document.getElementById("popupFrame");
  try {
    frame.contentWindow.history.back();
  } catch (e) {
    alert("ย้อนกลับไม่ได้ (เว็บนี้บล็อก iframe)");
  }
}

function goForward() {
  const frame = document.getElementById("popupFrame");
  try {
    frame.contentWindow.history.forward();
  } catch (e) {
    alert("ไปข้างหน้าไม่ได้ (เว็บนี้บล็อก iframe)");
  }
}

let lockedWindow = null;

function openLockedWindow(event, url) {
  event.preventDefault();

  const features = `
    width=1460,
    height=700,
    left=100,
    top=140,
    resizable=no,
    scrollbars=yes,
    toolbar=no,
    menubar=no,
    location=yes,
    status=no
  `;

  if (lockedWindow && !lockedWindow.closed) {
    lockedWindow.focus();
    lockedWindow.location.href = url;
  } else {
    lockedWindow = window.open(
      url,
      "LOCKED_WINDOW",
      features
    );
  }
}

/* 🔒 ปิด window ลูก เมื่อ HTML ปิด */
window.addEventListener("beforeunload", () => {
  if (lockedWindow && !lockedWindow.closed) {
    lockedWindow.close();
  }
});
