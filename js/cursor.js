document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("smooth-cursor");

  if (!cursor) return;

  const trailCount = 30; // liczba punktów w trailu
  const trail = [];

  // tworzymy trail elements
  for (let i = 0; i < trailCount; i++) {
    const div = document.createElement("div");
    div.classList.add("cursor-trail");
    document.body.appendChild(div);
    trail.push({el: div, x: 0, y: 0});
  }

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    let x = mouseX;
    let y = mouseY;

    // każdy punkt trail podąża za poprzednim
    trail.forEach((point, i) => {
      point.x += (x - point.x) * 0.3; // im mniejsza liczba, tym wolniej punkt podąża
      point.y += (y - point.y) * 0.3;
      point.el.style.transform = `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`;
      point.el.style.opacity = 1 - i / trailCount; // dalsze punkty bardziej przezroczyste

      // następny punkt podąża za tym
      x = point.x;
      y = point.y;
    });

    // główny kursor na końcu
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animate);
  }

  animate();

  // powiększenie nad linkami/przyciskami
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hovered"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hovered"));
  });
});
