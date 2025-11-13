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

    const output = `
        Je zit jaarlijks <strong>${totaalUren.toFixed(0)} uur</strong> op je smartphone. 
        Dat is ongeveer <strong>${afgerondeDagen} dagen</strong> per jaar!<br><br>
        In een gemiddeld mensenleven van ${levensverwachting} jaar betekent dat 
        ongeveer <strong>${levensJaren.toFixed(1)} jaar</strong> aan schermtijd!
    `;
    document.getElementById("output").innerHTML = output;
    document.getElementById("resultaat").classList.remove("hidden");
    document.getElementById("levensbalkContainer").classList.remove("hidden");

    const schermtijdBalk = document.getElementById("schermtijdBalk");
    const levensbalkTekst = document.getElementById("levensbalkTekst");
    schermtijdBalk.style.width = "0%";

    let currentPercentage = 0;
    const step = 0.5; // Hoe snel de balk groeit, in %
    const intervalTime = 20; // interval in ms

    const interval = setInterval(() => {
        if (currentPercentage >= percentageLeven) {
            currentPercentage = percentageLeven; // exact percentage
            schermtijdBalk.style.width = currentPercentage + "%";
            levensbalkTekst.textContent = `${levensJaren.toFixed(1)} van ${levensverwachting} levensjaren = ${percentageLeven.toFixed(1)}% schermtijd`;
            clearInterval(interval);

            // Printen automatisch 10 seconden na animatie
            setTimeout(() => {
                genereerEnPrintTicket(urenPerDag);
            }, 10000);
            return;
        }

        schermtijdBalk.style.width = currentPercentage + "%";
        const jarenLopend = (percentageLeven / 100) * levensverwachting;
        levensbalkTekst.textContent = `${(currentPercentage / 100 * levensverwachting).toFixed(1)} van ${levensverwachting} levensjaren = ${(currentPercentage).toFixed(1)}% schermtijd`;
        currentPercentage += step;
    }, intervalTime);

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

// Functie om het ticket te genereren en printen
function genereerEnPrintTicket(urenPerDag) {
    const dagenPerJaar = 365;
    const totaalUren = urenPerDag * dagenPerJaar;
    const totaalDagen = totaalUren / 24;
    const afgerondeDagen = totaalDagen.toFixed(1);
    const levensverwachting = 80;
    const levensUren = totaalUren * levensverwachting;
    const levensJaren = levensUren / 24 / 365;
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

    const ticketHTML = `
    <html>
    <head>
        <title>Beschermtijd Ticket</title>
        <style>
            body { font-family: 'Segoe UI', sans-serif; text-align: center; padding: 20px; background: #f9f9f9; }
            h1 { color: red; }
            .ticket { border: 2px dashed #2e2929; padding: 20px; border-radius: 10px; background: white; width: 80%; margin: auto; }
            ul { text-align: left; display: inline-block; }
            .boekenleggerTitel { font-size: 1.2em; font-weight: bold; margin-top: 40px; color: #2e2929; }
            .boekenleggerContainer {
                border: 2px dashed #555;
                width: 18cm; height: 5cm; margin: 10px auto 30px auto;
                background: linear-gradient(to right, #ff0000 ${percentageLeven.toFixed(1)}%, #4CAF50 ${percentageLeven.toFixed(1)}%);
                color: white; font-size: 2em; font-weight: bold;
                display: flex; align-items: center; justify-content: center;
                letter-spacing: 4px; text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
            }
            @media print {
                * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            }
        </style>
    </head>
    <body>
        <div class="ticket">
            <h1>Beschermtijd Ticket</h1>
            <p>Je zit jaarlijks <strong>${totaalUren.toFixed(0)} uur</strong> op je smartphone.</p>
            <p>Dat is ongeveer <strong>${afgerondeDagen} dagen</strong> per jaar!</p>
            <p>In een gemiddeld mensenleven van ${levensverwachting} jaar betekent dat ongeveer 
               <strong>${levensJaren.toFixed(1)} jaar</strong> aan schermtijd!</p>
            <p>Levensbalk: ${asciiBalk}</p>
            <h3>Wat had je kunnen doen met die tijd?</h3>
            <ul>${alternatievenBerekening.map(a => `<li>${a}</li>`).join('')}</ul>
        </div>
        <div class="boekenleggerTitel"> Knip jouw boekenlegger uit!</div>
        <div class="boekenleggerContainer">BESCHERMTIJD!</div>
    </body>
    </html>
    `;

    const printVenster = window.open("", "_blank");
    printVenster.document.open();
    printVenster.document.write(ticketHTML);
    printVenster.document.close();

    // Printen direct na het laden van het printvenster
    printVenster.focus();
    printVenster.print();
    setTimeout(() => printVenster.close(), 1500);
}
