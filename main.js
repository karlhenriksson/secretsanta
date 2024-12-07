"use strict";
/**
 * Hanterar secret-santa-grejer
 *
 * VARNING: Man kan se allas secret santa i den här filen! Det är inte mycket jag
 * kan göra åt det tyvärr, så jag får helt enkelt be snällt att du inte läser vidare
 * i filen.
 */

const bg = document.getElementById("background");

// Spawna random snöflingor
async function handleSnowflakes() {
  // Spawna en random snöflinga
  const w = document.body.offsetWidth;
  const h = document.body.offsetHeight;
  const x = Math.random() * (w - 100);
  const y = Math.random() * (h - (w < 800 ? 50 : 200));

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
// LÄS INTE DENNA OM DU INTE VILL SPOILA FÖR ANDRA!!!
const prompts = {
  "^arvid$":
    "Skriv första bokstaven på ditt efternamn också så att du inte råkar se fel person.",
  "^1234?5?6?7?8?9?$": "Vad är roten till x^2 - 16x + 64?",
  "^(8|åtta)$": "Att vara eller inte vara, det är [?]",
  "frågan??": "Frågan är, hur många dagar har Februari nästa år?",
  "28 *(|st|dagar)":
    '<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">https://forms.gle/Eg8sXi2f=</a>',
  bånx: "Testa med O i stället.",
  bonx: "Yay!",
  // ^Förnamn *(e(fternamn)?)? *$
  "^olof *(h(ylander)?)? *$": "$ Tove.",
  "^tove *(l(eander)?)? *(r(önngren)?)? *$": "$ Svante.",
  "^svante *(n(elander)?)? *$": "$ Jingrui.",
  "^jingrui *(g(uo)?)? *$": "$ Isabella.",
  "^isabella *(d'?arcy)? *$": "$ Matilda.",
  "^matilda *(k(ar(e|é|è)n)?)? *$": "$ Sinit.",
  "^sinit *(t(esfamichael)?)? *(f(eshaye)?)? *$": "$ Malin.",
  "^malin *((a|å)(sman)?)? *$": "$ Elly.",
  "^elly *(g(illgren)?)? *$": "$ Tamara.",
  "^tamara *(h(anifi)?)? *$": "$ Josephine.",
  "^josephine *(j(atzkowski)?)? *$": "$ Elsa.",
  "^elsa *(n(ordlund)?)? *$": "$ Stella.",
  "^stella *(a(fzelius)?)? *$": "$ Setayesh.",
  "^setayesh *(g(arousi)?)? *$": "$ Arvid S.",
  "^arvid *s(öderberg)? *$": "$ Emil.",
  "^emil *(l(indström)?)? *$": "$ Ellie.",
  "^ellie *(e(riksson)?)? *$": "$ Hannes.",
  "^hannes *(e(riksson)?)? *$": "$ Ines.",
  "^ines *((å|a)(sberg)?)? *$": "$ Olof.",
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

/*

'olof', 'tove', 'svante', 'Jingrui', 'isabella', 'Matilda', 'Sinit', 'malin', 'elly', 'tamara', 'Josephine', 'Elsa', 'stella', 'setayesh', 'arvid S', 'emil', 'Ellie', 'hannes', 'ines'

*/
