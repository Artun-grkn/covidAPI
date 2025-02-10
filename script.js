const url = "https://disease.sh/v3/covid-19/historical/all?lastdays=all";
const covidDiv = document.getElementById("covid-data");


async function getData() {

    try {
        const response = await fetch(url);
        console.log(response);
        if(!response.ok){
            throw new Error(`http error: ${response.status} `);
        };
        let CovidData = await response.json();
        console.log("data, met results titel: ", data);
        const covidData = data.results;
        console.log(covidData);
        displayData(covidData);
    } catch (error) {
        console.error("er ging iets fout met het verkrijgen van de data", error);
        covidDiv.innerHTML=`<p style = "color:red;">oeps... Het werkt even niet. Kom later terug</p>`;
    } finally {
        console.log("getData finished");
    }
};
