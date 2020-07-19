export async function getLatLong(country) {
    var key = "pYiMIGj9oKsSUiMkqBH7kj46FKT4hDiL"
    // var key = "JQck4PKfMFp93hjgX3AWJqM65sjMTccr"

    var url = "http://open.mapquestapi.com/geocoding/v1/address?key=" + key + "&location=" + country + "&thumbMaps=false&maxResults=1"

    let result = await fetch(url).then(response => response.json());
    return (result.results[0].locations[0].latLng)
}
