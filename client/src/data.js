import countriesData from './world-data/countries.json'
import bordersData from './world-data/bordering_countries.json'

const countries = Object.keys(countriesData)
export const countryStatesDefault = new Map();
export const countryNames = new Map()
for (var i in countries) {
    countryStatesDefault.set(countries[i], "hidden");
    countryNames.set(countries[i], countriesData[countries[i]]);
}

export const defaultMatrix = new Map()
for (i in countries) {
    defaultMatrix.set(countries[i], new Map());
    for (var j in countries) {
        defaultMatrix.get(countries[i]).set(countries[j], undefined);
        if (i === j) {
            defaultMatrix.get(countries[i]).set(countries[j], 0);
        }
    }
}
for (i in bordersData) {
    for (j of bordersData[i]) {
        defaultMatrix.get(i).set(j, 0);
    }
}

export const countriesDist = new Map();
for (var x of defaultMatrix.keys()) {
    countriesDist.set(x, new Map(defaultMatrix.get(x)));
}

for (var k of countries) {
    for (i of countries) {
        for (j of countries) {
            const dist1 = countriesDist.get(i).get(k)
            if (dist1 === undefined) continue;
            const dist2 = countriesDist.get(k).get(j)
            if (dist2 === undefined) continue;
            const dist = countriesDist.get(i).get(j);
            if (dist === undefined || dist > dist1 + dist2 + 1) {
                countriesDist.get(i).set(j, dist1 + dist2 + 1);
            }
        }
    }
}

export const possiblePlayPairs = []

for (i of countries) {
    for (j of countries) {
        const dist = countriesDist.get(i).get(j);
        if (dist >= 3 && dist <= 10) {
            possiblePlayPairs.push({from: i, to: j});
        }
    }
}