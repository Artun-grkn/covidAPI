const url = "https://disease.sh/v3/covid-19/historical/all?lastdays=all";
const covidDiv = document.getElementById("Covid-data");

async function getData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("HTTP error");
        }
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error("Er ging iets fout met het verkrijgen van de data", error);
        covidDiv.innerHTML = `<p class="error-message">Oeps... Het werkt even niet. Kom later terug.</p>`;
    }
}

function displayData(covidData) {
    const { cases, deaths, recovered, timeline } = covidData;

    // Bereken de totalen door de objecten om te zetten naar arrays en de waarden op te tellen
    const totalCases = Object.values(cases).reduce((total, num) => total + num, 0);
    const totalDeaths = Object.values(deaths).reduce((total, num) => total + num, 0);
    const totalRecovered = Object.values(recovered).reduce((total, num) => total + num, 0);

    // Maak de container aan en voeg de data toe aan de HTML
    const container = document.createElement("div");
    covidDiv.appendChild(container);

    // Voeg de data in de container toe met een nette weergave
    container.innerHTML = `
        <div class="data-box cases" onclick="toggleDetails('cases', timeline)">
            <h2>Totale Cases</h2>
            <p>${totalCases.toLocaleString()}</p>
            <div class="details" id="cases-details"></div>
        </div>
        <div class="data-box deaths" onclick="toggleDetails('deaths', timeline)">
            <h2>Totale Deaths</h2>
            <p>${totalDeaths.toLocaleString()}</p>
            <div class="details" id="deaths-details"></div>
        </div>
        <div class="data-box recovered" onclick="toggleDetails('recovered', timeline)">
            <h2>Totale Recovered</h2>
            <p>${totalRecovered.toLocaleString()}</p>
            <div class="details" id="recovered-details"></div>
        </div>
    `;

    // Functie om de details van een box te tonen of te verbergen
    window.toggleDetails = function (category, timeline) {
        const detailsContainer = document.getElementById(`${category}-details`);
        
        // Controleer of de details al getoond worden
        if (detailsContainer.style.display === "block") {
            detailsContainer.style.display = "none"; // Verberg de details
        } else {
            detailsContainer.style.display = "block"; // Toon de details
            showDetails(category, timeline, detailsContainer);
        }
    };

    // Functie om de datums en waarden weer te geven in de details
    function showDetails(category, timeline, detailsContainer) {
        let data = [];
        if (category === 'cases') {
            data = Object.entries(timeline.cases);
        } else if (category === 'deaths') {
            data = Object.entries(timeline.deaths);
        } else if (category === 'recovered') {
            data = Object.entries(timeline.recovered);
        }

        let detailsContent = "<ul>";
        data.forEach(([date, value]) => {
            detailsContent += `<li><strong>${date}:</strong> ${value}</li>`;
        });
        detailsContent += "</ul>";

        detailsContainer.innerHTML = detailsContent;
    }
}

getData();



