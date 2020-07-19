export function numberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
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

export async function getPlotsConfirmedDeaths(dataGraphicalJson, dataNumbers) {
  var confirmedArray = []
  var deathArray = []
  var monthNameTab = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  var monthArray = []

  for (var i = 0; i < dataNumbers; i++) {
    var date = Object.keys(dataGraphicalJson)[i];
    var month = date.split('-')[0]
    month = parseInt(month) - 1
    if (monthArray.indexOf(monthNameTab[month]) == -1)
      monthArray.push(monthNameTab[month])
    confirmedArray.push(parseInt(dataGraphicalJson[date].Total_Confirmed) / 1000000)
    deathArray.push(parseInt(dataGraphicalJson[date].Total_Deaths) / 1000)
  }
  return {monthArray, confirmedArray, deathArray}
}

export async function getSearchCountryConfirmedDeaths(dataJson, countryName) {
  var countryArray = []
  var confirmedCountry = 0
  try {
    var countryRegionsNumbers = Object.keys(dataJson[countryName]).length;
  } catch (error) {
    return {confirmedCountry, countryArray}
  }
  for (var j = 0; j < countryRegionsNumbers; j++) {
    var regionName = Object.keys(dataJson[countryName])[j];
    if (regionName != "Unknown" && regionName != "Recovered") {
      if (regionName == "") {
        countryArray.push({name: countryName, confirmed: parseInt(dataJson[countryName][regionName].Confirmed), death: parseInt(dataJson[countryName][regionName].Deaths)})
      }
      else {
        countryArray.push({name: regionName, confirmed: parseInt(dataJson[countryName][regionName].Confirmed), death: parseInt(dataJson[countryName][regionName].Deaths)})
      }
      confirmedCountry += parseInt(dataJson[countryName][regionName].Confirmed)
    }
  }
  return {confirmedCountry, countryArray}
}
