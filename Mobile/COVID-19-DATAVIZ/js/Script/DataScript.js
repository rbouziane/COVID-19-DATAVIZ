export function numberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export async function getCountryConfirmedDeaths(dataJson, countryName) {
    var confirmedCountry = 0
    var deathCountry = 0
    var countryRegionsNumbers = Object.keys(dataJson[countryName]).length;

    for (var j = 0; j < countryRegionsNumbers; j++) {
      var regionName = Object.keys(dataJson[countryName])[j];
      confirmedCountry += parseInt(dataJson[countryName][regionName].Confirmed)
      deathCountry += parseInt(dataJson[countryName][regionName].Deaths)
    }
    return {confirmedCountry, deathCountry}
}

export async function getWorldConfirmedDeaths(dataJson, countriesNumbers) {
  var worldArray = []

  for (var i = 0; i < countriesNumbers; i++) {
    var countryName = Object.keys(dataJson)[i];
    var countryRegionsNumbers = Object.keys(dataJson[countryName]).length;
    var confirmedCountry = 0
    var deathCountry = 0

    for (var j = 0; j < countryRegionsNumbers; j++) {
      var regionName = Object.keys(dataJson[countryName])[j];
      confirmedCountry += parseInt(dataJson[countryName][regionName].Confirmed)
      deathCountry += parseInt(dataJson[countryName][regionName].Deaths)
    }
    worldArray.push({name: countryName, confirmed: confirmedCountry, death: deathCountry})
  }
  return worldArray
}

export async function getTotalsConfirmedDeaths(dataJson, countriesNumbers) {
  var totalsConfirmed = 0;
  var totalsDeath = 0;

  for (var i = 0; i < countriesNumbers; i++) {
    var countryName = Object.keys(dataJson)[i];
    var countryRegionsNumbers = Object.keys(dataJson[countryName]).length;
    for (var j = 0; j < countryRegionsNumbers; j++) {
      var regionName = Object.keys(dataJson[countryName])[j];
      totalsConfirmed += parseInt(dataJson[countryName][regionName].Confirmed)
      totalsDeath += parseInt(dataJson[countryName][regionName].Deaths)
    }
  }
  return {totalsConfirmed, totalsDeath}
}
