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
        productRibbon: data.productRibbon,
        recommendation_rank: data.recommendation_rank
    }
}

var queryProductAPI = async function(application_id, marketplace_url) {
    const url = `${marketplace_url}/api/marketplace/v1/products/${application_id}`
    return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        if (response.status == 200){
            return response.json()
        } else {
            return null
        }
          
        });
    }

export var getAllProductDetails = async function(application_list, marketplace_url) {
    const queryPromises = application_list.map(function(app){
                var app_info = queryProductAPI(app.application_id, marketplace_url);
                app_info.recommendation_rank = app.score
                return app_info
            }
        );

    const statusesPromise = await Promise.allSettled(queryPromises);
    return statusesPromise
}