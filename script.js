function berekenTijd() {
  const urenPerDag = parseFloat(document.getElementById("hoursInput").value);
  if (isNaN(urenPerDag) || urenPerDag < 0 || urenPerDag > 24) {
    alert("Voer een geldig aantal uren in tussen 0 en 24.");
    return;
  }

  const dagenPerJaar = 365;
  const totaalUren = urenPerDag * dagenPerJaar;
  const totaalDagen = totaalUren / 24;
  const afgerondeDagen = totaalDagen.toFixed(1);

  const levensverwachting = 80;
  const levensUren = totaalUren * levensverwachting;
  const levensDagen = levensUren / 24;
  const levensJaren = levensDagen / 365;
  const percentageLeven = Math.min((levensJaren / levensverwachting) * 100, 100);

  // Tekstuele output
  const output = `
    Je zit jaarlijks <strong>${totaalUren.toFixed(0)} uur</strong> op je smartphone. 
    Dat is ongeveer <strong>${afgerondeDagen} dagen</strong> per jaar!<br><br>
    In een gemiddeld mensenleven van ${levensverwachting} jaar betekent dat 
    ongeveer <strong>${levensJaren.toFixed(1)} jaar</strong> aan schermtijd!
  `;
  document.getElementById("output").innerHTML = output;
  document.getElementById("resultaat").classList.remove("hidden");
  document.getElementById("downloadBtn").classList.remove("hidden");
  document.getElementById("levensbalkContainer").classList.remove("hidden");

  // Visuele balk met animatie
  const schermtijdBalk = document.getElementById("schermtijdBalk");
  const balkTekst = document.getElementById("balkTekst");
  const levensbalkTekst = document.getElementById("levensbalkTekst");

  schermtijdBalk.style.width = "0%";
  balkTekst.textContent = "";

  let currentPercentage = 0;
  const step = 0.5;
  const interval = setInterval(() => {
    if (currentPercentage >= percentageLeven) {
      clearInterval(interval);
      currentPercentage = percentageLeven;
    }
    schermtijdBalk.style.width = currentPercentage + "%";
    balkTekst.textContent = `${currentPercentage.toFixed(1)}% schermtijd`;
    currentPercentage += step;
  }, 20);

  levensbalkTekst.textContent = `${levensJaren.toFixed(1)} van ${levensverwachting} levensjaren = ${percentageLeven.toFixed(1)}% schermtijd`;

  // Alternatieven
  const alternatieven = [
    { activiteit: "een boek lezen (van 300 pagina's)", tijdPer: 6 },
    { activiteit: "een online cursus afronden", tijdPer: 20 },
    { activiteit: "met vrienden afspreken", tijdPer: 2 },
    { activiteit: "een workout doen van 45 minuten", tijdPer: 0.75 }
  ];

  const altList = document.getElementById("alternatieven");
  altList.innerHTML = "";

  alternatieven.forEach(item => {
    const aantal = Math.floor(totaalUren / item.tijdPer);
    const li = document.createElement("li");
    li.textContent = `${aantal} × ${item.activiteit}`;
    altList.appendChild(li);
  });
}

document.getElementById("downloadBtn").addEventListener("click", function () {
  const urenPerDag = parseFloat(document.getElementById("hoursInput").value) || 0;
  const dagenPerJaar = 365;
  const totaalUren = urenPerDag * dagenPerJaar;
  const totaalDagen = totaalUren / 24;
  const afgerondeDagen = totaalDagen.toFixed(1);

  const levensverwachting = 80;
  const levensUren = totaalUren * levensverwachting;
  const levensDagen = levensUren / 24;
  const levensJaren = levensDagen / 365;
  const percentageLeven = Math.min((levensJaren / levensverwachting) * 100, 100);

  const alternatieven = [
    { activiteit: "een boek lezen (van 300 pagina's)", tijdPer: 6 },
    { activiteit: "een online cursus afronden", tijdPer: 20 },
    { activiteit: "met vrienden afspreken", tijdPer: 2 },
    { activiteit: "een workout doen van 45 minuten", tijdPer: 0.75 }
  ];
  const alternatievenBerekening = alternatieven.map(item => {
    const aantal = Math.floor(totaalUren / item.tijdPer);
    return `${aantal} × ${item.activiteit}`;
  });

  const totaalBlokjes = 20;
  const rodeBlokjes = Math.round((percentageLeven / 100) * totaalBlokjes);
  const groeneBlokjes = totaalBlokjes - rodeBlokjes;
  const asciiBalk = "🟥".repeat(rodeBlokjes) + "🟩".repeat(groeneBlokjes);

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  if (!isMobile) {
    // 💻 DESKTOP: printvenster
    const ticketHTML = `
    <html>
    <head>
        <title>Tijdsloket Ticket</title>
        <style>
            body { 
                font-family: 'Segoe UI', sans-serif; 
                text-align: center; 
                padding: 20px; 
                background-color: #f9f9f9;
            }
            h1 { color: red; }
            .ticket { 
                border: 2px dashed #2e2929; 
                padding: 20px; 
                border-radius: 10px; 
                display: inline-block; 
                width: 80%; 
                max-width: 500px; 
                background-color: white;
            }
            ul { 
                text-align: left; 
                margin: 10px auto; 
                display: inline-block; 
            }
            .boekenleggerContainer {
                border: 2px dashed #555;
                margin: 20px auto 30px auto;
                width: 18cm;
                height: 5cm;
                background: linear-gradient(to right,
                    #ff0000 ${percentageLeven.toFixed(1)}%, 
                    #4CAF50 ${percentageLeven.toFixed(1)}%);
                color: white;
                font-size: 2em;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                letter-spacing: 4px;
                text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
            }
            @media print {
                * {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
            }
        </style>
    </head>
    <body>
        <div class="ticket">
            <h1>Tijdsloket Ticket</h1>
            <p>Je zit jaarlijks <strong>${totaalUren.toFixed(0)} uur</strong> op je smartphone.</p>
            <p>Dat is ongeveer <strong>${afgerondeDagen} dagen</strong> per jaar.</p>
            <p>In een gemiddeld mensenleven betekent dat ongeveer <strong>${levensJaren.toFixed(1)} jaar</strong> aan schermtijd!</p>
            <p>Levensbalk: ${asciiBalk}</p>
            <h3>Wat had je kunnen doen met die tijd?</h3>
            <ul>${alternatievenBerekening.map(a => `<li>${a}</li>`).join("")}</ul>
        </div>
        <div class="boekenleggerContainer">BESCHERMTIJD!</div>
        <p><em>✂️ Knip jouw boekenlegger uit als reminder van jouw schermtijd!</em></p>
    </body>
    </html>
    `;

    const printVenster = window.open("", "", "height=800,width=1000");
    printVenster.document.write(ticketHTML);
    printVenster.document.close();
    printVenster.focus();
    printVenster.print();
    printVenster.close();

  } else {
    // 📱 MOBIEL: PDF-versie via jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const centerX = 105;

    // Titel
    doc.setFontSize(20);
    doc.setTextColor(220, 0, 0);
    doc.text("Tijdsloket Ticket", centerX, 25, { align: "center" });

    // Tekst
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    const tekstregels = [
      `Je zit jaarlijks ${totaalUren.toFixed(0)} uur op je smartphone.`,
      `Dat is ongeveer ${afgerondeDagen} dagen per jaar.`,
      `In een mensenleven van ${levensverwachting} jaar is dat ${levensJaren.toFixed(1)} jaar (${percentageLeven.toFixed(1)}%).`
    ];
    tekstregels.forEach((regel, i) => {
      doc.text(regel, centerX, 45 + i * 8, { align: "center" });
    });

    // Alternatieven
    doc.setFontSize(13);
    doc.text("Wat had je kunnen doen met die tijd?", centerX, 75, { align: "center" });
    doc.setFontSize(11);
    let yPos = 85;
    alternatievenBerekening.forEach(item => {
      doc.text(`• ${item}`, centerX, yPos, { align: "center" });
      yPos += 7;
    });

    // Boekenleggerbalk
    const balkBreedte = 160;
    const balkHoogte = 25;
    const startX = centerX - balkBreedte / 2;
    const startY = yPos + 20;

    doc.setFillColor(255, 0, 0);
    doc.rect(startX, startY, (balkBreedte * percentageLeven) / 100, balkHoogte, "F");
    doc.setFillColor(76, 175, 80);
    doc.rect(startX + (balkBreedte * percentageLeven) / 100, startY, balkBreedte * (1 - percentageLeven / 100), balkHoogte, "F");

    // ✅ Nauwkeurig gecentreerde boekenleggertekst
    const tekst = "BESCHERMTIJD!";
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    const textWidth = doc.getTextWidth(tekst);
    const textX = startX + (balkBreedte - textWidth) / 2;
    doc.text(tekst, textX, startY + 17);

    // Kniptekst met automatische wrapping
    const knipTekst = "Knip jouw boekenlegger uit als reminder van jouw schermtijd!";
    const lines = doc.splitTextToSize(knipTekst, 180);
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.text(lines, centerX, startY + 40, { align: "center" });

    doc.save("tijdsloket-ticket.pdf");
  }
});
