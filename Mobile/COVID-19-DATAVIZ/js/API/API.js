export async function getLatLong(country) {
    var key = "5JfT6iFVD8cIebc5OOGQpJVUOB9QT51v"

    var url = "http://open.mapquestapi.com/geocoding/v1/address?key=" + key + "&location=" + country + "&thumbMaps=false&maxResults=1"

    let result = await fetch(url).then(response => response.json());
    return (result.results[0].locations[0].latLng)
}
