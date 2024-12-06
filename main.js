"use strict";
/**
 * Hanterar secret-santa-grejer
 */

const bg = document.getElementById("background");

// Spawna random snöflingor
async function handleSnowflakes() {
  // Spawna en random snöflinga
  const w = document.body.offsetWidth;
  const h = document.body.offsetHeight;
  const x = Math.random() * (w - 100);
  const y = Math.random() * (h - (w < 800 ? 50 : 150));

  addSnowflake(x, y);

  await new Promise((r) => setTimeout(r, 100000000 / (w * h)));
  requestAnimationFrame(handleSnowflakes);
}
handleSnowflakes();

// Spawna en snöflinga
async function addSnowflake(x, y) {
  // Ny snöflinga
  const obj = document.createElement("img");
  obj.src = "snowflake.svg";
  obj.classList = "snowflake";
  obj.style.top = y + "px";
  obj.style.left = x + "px";
  obj.onclick = removeSnowflake;
  bg.appendChild(obj);

  // Vänta tills animationen är klar (dvs 4s)
  await new Promise((r) => setTimeout(r, 4000));

  // Ta bort elementet
  obj.remove();
}

let numSnowflakes = 0;
function removeSnowflake(e) {
  e.target.style.display = "none";
  document.getElementById("numSnowflakes").innerText =
    "Du har klickat på " +
    ++numSnowflakes +
    " snöfling" +
    (numSnowflakes == 1 ? "a." : "or.");
}

// Visa output för det givna namnet
function revealName() {
  const string = document.getElementById("inputName").value;

  // Gå igenom regex-dictionaryn
  for (const [key, value] of Object.entries(prompts)) {
    console.log(key);
    if (new RegExp(key, "i").test(string)) {
      const out = value.replace(
        "$",
        "Du ska ge en present för mindre än 40kr till:"
      );
      output(out);
      return;
    }
  }
  // Matchade inget - ge output
  output(
    "Programmet hittade inte ditt namn, kontrollera din stavning. <br/>Kontakta Karl om allt verkar rätt."
  );
}

// Ge output-text
function output(string) {
  document.getElementById("output").innerHTML = string;
}

// Alla prompts för programmet
const prompts = {
  // ^Förnamn *(e(fternamn)?)? *$
  "^tove *(l(eander)?)? *(r(önngren)?)? *$":
    "$ Karl, Malin, Bonx, Bånx och påven",
  "^svante *(n(elander)?)? *$": "$ Karl, Malin, Bonx, Bånx och påven",
};

// Blanda en lista, använd när deltagare ska få målpersoner
function shuffleList(list) {
  const out = [];
  while (list.length > 0) {
    const i = Math.floor(Math.random() * list.length);
    out.push(list.splice(i, 1)[0]);
  }
  return out;
}
