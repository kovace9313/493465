// Fajl: api/get-data.js

// import fetch from 'node-fetch';

// --- 1. KOMPLETAN RED VOŽNJE (Vaši podaci) ---
const timetableMapA = {
    "05:40:00": "1",
    "06:00:00": "2",
    "06:30:00": "4",
	"06:45:00": "?",
    "07:10:00": "6",
    "07:15:00": "7",
    "07:50:00": "1",
    "08:15:00": "2",
    "08:40:00": "9",
    "09:00:00": "4",
    "09:30:00": "6",
    "10:15:00": "1",
    "10:50:00": "8",
    "11:45:00": "5",
    "12:30:00": "2",
    "13:05:00": "7",
    "13:20:00": "3",
    "13:45:00": "1",
    "14:00:00": "9",
    "14:20:00": "8",
    "15:10:00": "4",
    "16:00:00": "3",
    "16:20:00": "1",
    "16:40:00": "8",
    "17:20:00": "6",
    "17:45:00": "4",
    "18:10:00": "2",
    "18:45:00": "7",
    "19:40:00": "3",
    "20:00:00": "6",
    "20:20:00": "4",
    "20:50:00": "2",
    "21:20:00": "7",
    "22:00:00": "10",
    "22:30:00": "3",
    "23:30:00": "6"
};
const timetableMapB = {
"04:30:00": "1",
    "04:50:00": "2",
    "05:20:00": "4",
	"05:30:00": "?",
    "05:50:00": "6",
    "06:00:00": "7",
    "06:15:00": "8",
    "06:30:00": "1",
    "06:50:00": "2",
    "07:20:00": "9",
    "07:45:00": "4",
    "08:15:00": "6",
    "09:05:00": "1",
    "09:40:00": "8",
    "10:15:00": "5",
    "10:50:00": "2",
    "11:45:00": "7",
    "12:00:00": "1",
    "12:15:00": "8",
    "12:30:00": "9",
    "13:10:00": "6",
    "13:45:00": "4",
    "14:15:00": "2",
    "14:45:00": "3",
    "15:00:00": "1",
    "15:15:00": "8",
    "16:05:00": "6",
    "16:30:00": "4",
    "16:45:00": "2",
    "17:30:00": "7",
    "17:50:00": "1",
    "18:10:00": "3",
    "18:40:00": "6",
    "19:05:00": "4",
    "19:30:00": "2",
    "20:05:00": "7",
    "20:30:00": "10",
    "21:10:00": "3",
    "22:10:00": "6"
};
const URLS = [
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=27094", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=28618", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=27052", timetable: timetableMapA },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=29559", timetable: timetableMapB },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=20391", timetable: timetableMapB },
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=29533", timetable: timetableMapB }
];
const CLEAN_REGEX = /[^\d:.]/g;

// --- 2. OVO JE GLAVNA VERCEL FUNKCIJA ---
export default async function handler(request, response) {
    let allResults = [];
    
    for (const { url, timetable } of URLS) {
        try {
            const apiResponse = await fetch(url);
            if (!apiResponse.ok) continue;
            
            const data = await apiResponse.json();
            const arrivals = data.data && data.data.arrivals ? data.data.arrivals : null;
            if (!arrivals || arrivals.length === 0) continue;

            arrivals
                .filter((bus) => bus.lc === "465")
                .forEach((bus) => {
                    const vehicleId = bus.i;
                    let apiTime = bus.dt;
                    if (!apiTime) return;

                    apiTime = apiTime.trim().replace(CLEAN_REGEX, '');
                    if (apiTime.includes('.')) apiTime = apiTime.split('.')[0];
                    if (apiTime.length === 5 && apiTime.includes(':')) apiTime = apiTime + ":00";
                    
                    const blockNumber = timetable[apiTime];

                    if (blockNumber) {
                        allResults.push({
                            time: apiTime,
                            block: blockNumber,
                            vehicle: vehicleId,
                        });
                    }
                });
        } catch (error) {
            // Ignorišemo greške pojedinačnih stanica
            console.error(`Greška pri dohvatanju ${url}:`, error.message);
        }
    }

    // Filtriranje i sortiranje
    const uniqueResults = allResults.filter((item, index, self) =>
        index === self.findIndex((t) => (t.block === item.block && t.vehicle === item.vehicle))
    );
    uniqueResults.sort((a, b) => a.block - b.block);

    // --- 3. SLANJE PODATAKA STRANICI ---
    // Umesto console.log, šaljemo JSON odgovor
    
    // Kažemo pregledaču da kešira odgovor na 1 minut (60 sekundi)
    // Ovo sprečava da vaš sajt obara prometko.si ako imate puno poseta
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    
    response.status(200).json({
        lastUpdated: new Date().toISOString(),
        results: uniqueResults
    });
}
