document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".hero-video") || document.getElementById("splashVideo");
    const contenedorTarjetas = document.querySelector(".menu-float-container");
    const tarjetas = document.querySelectorAll(".menu-float");

    if (video && contenedorTarjetas) {
        // Aseguramos que todas las tarjetas arranquen invisibles y en tamaño cero
        tarjetas.forEach(tarjeta => {
            tarjeta.style.opacity = "0";
            tarjeta.style.transform = "scale(0)";
            tarjeta.style.transition = "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s ease";
        });

        // Escuchamos el avance del video en tiempo real
        video.addEventListener("timeupdate", () => {
            // 🚀 DETECCIÓN INMEDIATA: Apenas arranca el video (0.1 segundos)
            if (video.currentTime >= 0.1) {
                
                // Encedemos el contenedor general de inmediato
                contenedorTarjetas.classList.add("visible");

                // Animamos cada tarjeta una por una en cascada
                tarjetas.forEach((tarjeta, index) => {
                    // Ponemos un retraso multiplicando el índice por 1000 milisegundos (1 segundo)
                    setTimeout(() => {
                        tarjeta.style.opacity = "1";
                        tarjeta.style.transform = "scale(1)"; // Escala elástica al tamaño real
                    }, index * 1000); // Tarjeta 1: 0s, Tarjeta 2: 1s, Tarjeta 3: 2s, Tarjeta 4: 3s
                });
            }
        });
    }
});

// ===================================
// CARRUSEL APILADO DE TESTIMONIOS (4 SEGUNDOS)
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".testimonial-card");
  if (cards.length === 0) return;

  let currentIndex = 0;

  function updateStack() {
    cards.forEach((card, index) => {
      card.classList.remove("active", "next", "prev");

      if (index === currentIndex) {
        card.classList.add("active");
      } else if (index === (currentIndex + 1) % cards.length) {
        card.classList.add("next");
      } else {
        card.classList.add("prev");
      }
    });
  }

  function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateStack();
  }

  // Cambia automáticamente cada 4000 milisegundos (4 segundos)
  let autoRotate = setInterval(nextCard, 4000);

  // Permite hacer clic en la tarjeta para adelantarla manualmente
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      clearInterval(autoRotate);
      nextCard();
      autoRotate = setInterval(nextCard, 4000);
    });
  });
});

