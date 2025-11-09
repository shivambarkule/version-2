const nameInput = document.querySelector("#First-name");
const signatureContainer = document.querySelector(".signature-main");
const uppercase = document.querySelectorAll(".letter-bank .up");
const lowercase = document.querySelectorAll(".letter-bank .lo");
const signedBy = document.querySelector(".signed-by");
const modal = document.querySelector(".modal");

nameInput.addEventListener("keydown", (event) => {
  if (
    event.code === `Key${event.key.toUpperCase()}` ||
    event.code === "Space"
  ) {
    const key = event.key;
    draw(key, true);
  } else if (event.code === "Backspace") {
    setTimeout(() => {
      const value = nameInput.value;
      signatureContainer.innerHTML = "";
      const letters = value.split("");
      letters.forEach((item) => {
        draw(item, false);
      });
    }, 50);
  }
  setTimeout(() => {
    if (!nameInput.value) {
      modal.classList.remove("active");
    } else {
      modal.classList.add("active");
    }
  }, 50);
});

function draw(key, animate) {
  if (key === " ") {
    const space = document.createElement("div");
    space.style.minWidth = "12px";
    space.style.height = "51px";
    space.style.display = "inline-block";
    space.style.verticalAlign = "baseline";
    signatureContainer.appendChild(space);
  } else {
    const alphabet = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(97 + i)
    );

    for (let i = 0; i < alphabet.length; i++) {
      const item = alphabet[i];

      if (key.toLowerCase() === item) {
        const letter = document.createElement("div");
        if (key === item.toUpperCase()) {
          letter.innerHTML = uppercase[i].innerHTML;
          letter.classList.add("up");
        } else {
          letter.innerHTML = lowercase[i].innerHTML;
          letter.classList.add("lo");
        }
        letter.classList.add(item);

        // Ensure consistent styling
        letter.style.display = "inline-block";
        letter.style.verticalAlign = "baseline";
        letter.style.height = "51px";
        letter.style.lineHeight = "51px";

        if (animate) {
          setTimeout(() => {
            const path = letter.querySelector("svg path");
            if (path) {
              path.style.strokeDashoffset = "0";
            }
          }, 50);
        } else {
          const path = letter.querySelector("svg path");
          if (path) {
            path.style.strokeDashoffset = "0";
          }
        }
        signatureContainer.appendChild(letter);
        break;
      }
    }
  }
}
