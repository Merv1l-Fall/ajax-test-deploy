// skolan ligger på latitud=57.6731597 och longitud=11.8787299
// Standard URL:
// https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873

const cageApiKey = '4ae855aa96af4920848bf2cfbd201500'

async function getPlaceSuntimes(lat, lng, saveData) {
	const place = { lat: lat, lng: lng }
	const url = `https://api.sunrisesunset.io/json?lat=${place.lat}&lng=${place.lng}`
	const settings = {}
	try {
		const response = await fetch(url, settings)
			const data = await response.json()
			// { results: { sunrise, sunset }}
			const result = { sunrise: data.results.sunrise, sunset: data.results.sunset }
			console.log('Datan från API: ', data)
			// console.log('Förenklad data: ', result)
			if (typeof saveData === 'function') {
				saveData(result) // only call if saveData is provided
			}
			return(result)

	} catch(error) {
		console.error('Fel från API:', error.message)
	}
}

async function getCitySuntimes(setData, address ) {
	const url = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${cageApiKey}`
	const settings = {}
	try {
		const response = await fetch(url, settings)
		const data = await response.json()
		// console.log('Datan från geo API: ', data)
		// { results: [ { formatted, geometry: { lat, lng } } ]}
		const results = {
			city: data.results[0].formatted,
			lat: data.results[0].geometry.lat,
			lng: data.results[0].geometry.lng,
		}
		// console.log('Förenklad data: ', results)

		const suntimes = await getPlaceSuntimes(results.lat, results.lng)
		setData({ ...suntimes, city: results.city })


		getPlaceSuntimes( results.lat, results.lng)
		return

	} catch(error) {
		console.error('Fel från API:', error.message)
	}

}

export { getPlaceSuntimes, getCitySuntimes }
