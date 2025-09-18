function berekenTijd() {
    const urenPerDag = parseFloat(document.getElementById("hoursInput").value);
    if (isNaN(urenPerDag) || urenPerDag < 0 || urenPerDag > 24) {
        alert("Voer een geldig aantal uren in tussen 0 en 24.");
        return;
    }

    const dagenPerJaar = 365;
    const totaalUren = urenPerDag * dagenPerJaar;
    const totaalDagen = (totaalUren / 24).toFixed(1);

    const output = `
        Je zit jaarlijks <strong>${totaalUren.toFixed(0)} uur</strong> op je smartphone. 
        Dat is ongeveer <strong>${totaalDagen} dagen</strong>!
    `;

    const alternatieven = [
        { activiteit: "boeken lezen (van 300 pagina's)", tijdPer: 6 },
        { activiteit: "online cursussen afronden", tijdPer: 20 },
        { activiteit: "keer met vrienden afspreken", tijdPer: 2 },
        { activiteit: "workouts doen van 45 minuten", tijdPer: 0.75 }
    ];

    const altList = document.getElementById("alternatieven");
    altList.innerHTML = "";

    alternatieven.forEach(item => {
        const aantal = Math.floor(totaalUren / item.tijdPer);
        const li = document.createElement("li");
        li.textContent = `${aantal} × ${item.activiteit}`;
        altList.appendChild(li);
    });

    document.getElementById("output").innerHTML = output;
    document.getElementById("resultaat").classList.remove("hidden");
    document.getElementById("downloadknop").classList.remove("hidden");

    function downloadTicket(tekst) {
    const blob = new Blob([tekst], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tijdticket.txt';
    a.click();
    
    URL.revokeObjectURL(url);
}
document.getElementById("downloadBtn").addEventListener("click", function() {
    const tijd = document.getElementById("hoursInput").value || 0;
    const tekst = `Je hebt vandaag ${tijd} uur op je telefoon gezeten.\n\nWat had je kunnen doen met die tijd?\n- Lezen\n- Sporten\n- Slapen\n\nTijdsloket – Geen oordeel, alleen inzicht.`;

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
}
