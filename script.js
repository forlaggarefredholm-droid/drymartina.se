const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const checkboxes = [...document.querySelectorAll('.checklist input[type="checkbox"]')];
const storageKey = "drymartina-checklistor";

function saveChecklistState() {
  localStorage.setItem(storageKey, JSON.stringify(checkboxes.map((box) => box.checked)));
}

try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
  checkboxes.forEach((box, index) => {
    box.checked = Boolean(saved[index]);
    box.addEventListener("change", saveChecklistState);
  });
} catch {
  checkboxes.forEach((box) => box.addEventListener("change", saveChecklistState));
}

document.querySelector("#reset-checklists")?.addEventListener("click", () => {
  checkboxes.forEach((box) => { box.checked = false; });
  saveChecklistState();
});
