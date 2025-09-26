(function () {
  const items = Array.from(document.querySelectorAll(".list .item"));
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const dots = Array.from(document.querySelectorAll(".indicators .dot"));
  const numbersEl = document.querySelector(".indicators .numbers");

  if (!items.length) return;

  let current = Math.max(
    0,
    items.findIndex((el) => el.classList.contains("active"))
  );
  if (current === -1) current = 0;

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function setActive(index) {
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;

    items.forEach((el, i) => {
      el.classList.toggle("active", i === index);
    });

    if (dots.length) {
      dots.forEach((d, i) => d.classList.toggle("active", i === index));
    }

    if (numbersEl) {
      numbersEl.textContent = pad2(index + 1);
    }

    current = index;
  }

  if (prevBtn) prevBtn.addEventListener("click", () => setActive(current - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => setActive(current + 1));

  if (dots.length) {
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => setActive(i));
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") setActive(current - 1);
    if (e.key === "ArrowRight") setActive(current + 1);
  });

  setActive(current);
})();
