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

    // Bereken levensschermtijd
    const levensverwachting = 80; // jaren
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

    // Update visuele balk met animatie
    const schermtijdBalk = document.getElementById("schermtijdBalk");
    const balkTekst = document.getElementById("balkTekst");
    const levensbalkTekst = document.getElementById("levensbalkTekst");

    schermtijdBalk.style.width = "0%";
    balkTekst.textContent = "";

    let currentPercentage = 0;
    const step = 0.5; // animatie stapgrootte
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

    if (isNaN(urenPerDag) || urenPerDag < 0 || urenPerDag > 24) {
        alert("Voer een geldig aantal uren in tussen 0 en 24.");
        return;
    }

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

    // ✅ HTML voor printweergave met boekenlegger
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
            p { margin: 5px 0; }

            .boekenleggerTitel {
                font-size: 1.2em;
                font-weight: bold;
                margin-top: 40px;
                margin-bottom: 10px;
                color: #2e2929;
            }

            .boekenleggerContainer {
                border: 2px dashed #555;
                margin: 10px auto 30px auto;
                width: 18cm;
                height: 5cm;
                background: linear-gradient(
                    to right,
                    #ff0000 ${percentageLeven.toFixed(1)}%, 
                    #4CAF50 ${percentageLeven.toFixed(1)}%
                );
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

            .kniptekst {
                font-style: italic;
                margin-top: 10px;
                font-size: 0.9em;
                color: #333;
            }

            @media print {
                body { background: white; }
                .ticket { box-shadow: none; }

                /* ✅ Forceer kleuren bij printen */
                * {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    color-adjust: exact !important;
                }
            }
        </style>
    </head>
    <body>
        <div class="ticket">
            <h1>Tijdsloket Ticket</h1>
            <p>Je zit jaarlijks <strong>${totaalUren.toFixed(0)} uur</strong> op je smartphone.</p>
            <p>Dat is ongeveer <strong>${afgerondeDagen} dagen</strong> per jaar!</p>
            <p>In een gemiddeld mensenleven van ${levensverwachting} jaar betekent dat ongeveer 
               <strong>${levensJaren.toFixed(1)} jaar</strong> aan schermtijd!</p>
            <p>Levensbalk: ${asciiBalk}</p>

            <h3>Wat had je kunnen doen met die tijd?</h3>
            <ul>
                ${alternatievenBerekening.map(a => `<li>${a}</li>`).join('')}
            </ul>
        </div>

        <div class="boekenleggerTitel">✂️ Knip jouw boekenlegger uit!</div>
        <div class="boekenleggerContainer">BESCHERMTIJD!</div>
    </body>
    </html>
    `;

    // ✅ Open printvenster
    const printVenster = window.open("", "", "height=800,width=1000");
    printVenster.document.write(ticketHTML);
    printVenster.document.close();
    printVenster.focus();
    printVenster.print();
    printVenster.close();

    // ✅ Download ook als .txt-bestand
    const tekst = `
Je zit jaarlijks ${totaalUren.toFixed(0)} uur op je smartphone.
Dat is ongeveer ${afgerondeDagen} dagen per jaar.
In een gemiddeld mensenleven van ${levensverwachting} jaar betekent dat ongeveer ${levensJaren.toFixed(1)} jaar aan schermtijd.

Wat had je kunnen doen met die tijd?
${alternatievenBerekening.map(a => `- ${a}`).join('\n')}

Levensbalk: ${asciiBalk} (${percentageLeven.toFixed(1)}% schermtijd)
`;

    const blob = new Blob([tekst], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tijdsloket-ticket.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

