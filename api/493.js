// Fajl: api/get-data.js

// import fetch from 'node-fetch';

// --- 1. KOMPLETAN RED VOŽNJE (Vaši podaci) ---
const timetableMapA = {
    "04:40:00": "1",
    "05:00:00": "2",
    "05:20:00": "4",
    "05:40:00": "13",
    "05:45:00": "8",
    "06:00:00": "6",
    "06:20:00": "11",
	"06:20:00": "9",
    "07:00:00": "1",
    "07:15:00": "2",
    "07:30:00": "3",
    "07:45:00": "4",
    "08:00:00": "5",
    "08:15:00": "6",
    "08:16:00": "14",
    "08:30:00": "7",
    "08:45:00": "8",
    "09:00:00": "10",
    "09:15:00": "11",
    "09:30:00": "1",
    "09:45:00": "2",
    "10:00:00": "3",
    "10:15:00": "4",
    "10:30:00": "5",
    "10:45:00": "6",
    "11:00:00": "7",
    "11:15:00": "8",
    "11:30:00": "10",
    "11:45:00": "11",
    "12:00:00": "1",
    "12:15:00": "2",
    "12:30:00": "3",
    "12:45:00": "4",
    "13:00:00": "5",
    "13:15:00": "6",
    "13:30:00": "7",
    "13:45:00": "8",
    "14:00:00": "10",
    "14:10:00": "12",
    "14:15:00": "11",
    "14:30:00": "1",
    "14:45:00": "2",
    "15:00:00": "3",
    "15:30:00": "5",
    "15:45:00": "6",
    "16:00:00": "7",
    "16:15:00": "8",
    "16:25:00": "9",
    "16:30:00": "10",
    "16:45:00": "11",
    "17:00:00": "1",
    "17:15:00": "2",
    "17:30:00": "3",
    "17:45:00": "4",
    "17:55:00": "17",
    "18:00:00": "5",
    "18:15:00": "6",
    "18:30:00": "7",
    "18:45:00": "8",
    "18:55:00": "9",
    "19:00:00": "10",
    "19:15:00": "11",
    "19:20:00": "16",
    "19:30:00": "1",
    "19:45:00": "2",
    "20:00:00": "3",
    "20:15:00": "4",
    "20:30:00": "5",
    "20:50:00": "7",
    "21:10:00": "8",
    "21:50:00": "1",
    "22:30:00": "4",
    "22:50:00": "5",
    "23:45:00": "1",
	"23:45:00": "11"
};
const timetableMapB = {
	"04:00:00": "2",
    "04:20:00": "4",
    "04:40:00": "13",
    "04:55:00": "7",
    "05:05:00": "9",
    "05:10:00": "10",
    "05:25:00": "11",
    "05:40:00": "1",
    "06:00:00": "2",
    "06:10:00": "3",
    "06:25:00": "4",
    "06:40:00": "5",
    "06:55:00": "6",
    "07:00:00": "14",
    "07:10:00": "7",
    "07:25:00": "8",
    "07:35:00": "9",
    "07:40:00": "10",
    "08:00:00": "11",
    "08:15:00": "1",
    "08:30:00": "2",
    "08:45:00": "3",
    "09:00:00": "4",
    "09:15:00": "5",
    "09:30:00": "6",
    "09:45:00": "7",
    "10:00:00": "8",
    "10:15:00": "10",
	"10:30:00": "11",
    "10:45:00": "1",
	"11:00:00": "2",
    "11:15:00": "3",
    "11:30:00": "4",
    "11:45:00": "5",
    "12:00:00": "6",
    "12:15:00": "7",
    "12:30:00": "8",
    "12:45:00": "10",
    "12:55:00": "12",
    "13:00:00": "11",
    "13:15:00": "1",
    "13:30:00": "2",
    "13:45:00": "3",
    "14:15:00": "5",
    "14:30:00": "6",
    "14:45:00": "7",
    "15:00:00": "8",
    "15:10:00": "9",
    "15:15:00": "10",
    "15:30:00": "11",
    "15:45:00": "1",
    "16:00:00": "2",
    "16:15:00": "3",
    "16:30:00": "4",
    "16:35:00": "17",
    "16:45:00": "5",
    "17:00:00": "6",
    "17:15:00": "7",
    "17:30:00": "8",
    "17:40:00": "9",
    "17:45:00": "10",
    "18:00:00": "11",
    "18:15:00": "1",
    "18:30:00": "2",
    "18:45:00": "3",
    "19:00:00": "4",
    "19:20:00": "5",
    "19:40:00": "7",
    "20:00:00": "8",
    "20:20:00": "11",
    "20:40:00": "1",
    "21:00:00": "9",
    "21:20:00": "4",
    "21:40:00": "5",
    "22:05:00": "7",
    "22:35:00": "11",
	"22:35:00": "1",
    "23:10:00": "12",
    "23:50:00": "1/493N"
};
const URLS = [
    { url: "https://beograd.prometko.si/api/stations/arrivals?station=28344", timetable: timetableMapA },
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
                .filter((bus) => bus.lc === "493")
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
