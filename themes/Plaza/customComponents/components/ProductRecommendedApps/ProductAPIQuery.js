export function  productInfoFromResponse(data){

    var application_id = data.id
    const billingFrequencyMap = {
        "MONTHLY": "/ Mo",
        "YEARLY": "/ Yr",
        "ONE_TIME": "One Time",
        "null": "/ Mo"
    }
    var billing_frequency = data.startingPrice.billingFrequency

    var frequency_string
    if (billing_frequency in data){
        frequency_string = billingFrequencyMap[data.startingPrice.billingFrequency]
    } else {
        frequency_string = "/ Mo"
    }

    return {
        name: data.name,
        id: data.id,
        vendorName: 'AppSmart',
        blurb: data.listing.blurb,
        description: data.features[0].description,
        hidePricings: false,
        startingPrice: {
            priceCaption: 'Starting at ',
            formattedFullPrice: `$${data.startingPrice.amount.USD} ${frequency_string}`
        },
        url: `/en-US/apps/${application_id}/`,
        iconUrl: data.listing.myAppLogoIconUrl,
        rating: data.rating,
        numRatings: data.numRatings,
        tags: data.tags,
        badges: [],
        productRibbon: data.productRibbon
    }
}

var queryProductAPI = async function(application_id, marketplace_url) {
    const url = `${marketplace_url}/api/marketplace/v1/products/${application_id}`
    var response = fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        console.log(response.ok)
        if (response.ok){
        return response.json()
        } else {
        return null
            }
        }
    );
    }

export var getAllProductDetails = async function(application_id_list, marketplace_url) {
    const queryPromises = application_id_list.map(app_id => queryProductAPI(app_id, marketplace_url));

    const statusesPromise = await Promise.allSettled(queryPromises);
    return statusesPromise
}