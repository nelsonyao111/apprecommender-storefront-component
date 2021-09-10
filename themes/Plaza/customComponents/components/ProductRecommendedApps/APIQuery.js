function  productInfoFromJson(json_response, application_id){
    const billingFrequencyMap = {
        "MONTHLY": "Mo",
        "YEARLY": "Yr",
        "ONE_TIME": "One Time",
        "null": ""
    }
    console.log(Object.keys(json_response))
    var billing_frequency = json_response.startingPrice.billingFrequency

    var frequency_value
    if (billing_frequency in json_response){
        frequency_value = billingFrequencyMap[json_response.startingPrice.billingFrequency]
    } else {
        frequency_value = ""
    }

    return {
        name: json_response.name,
        id: json_response.id,
        vendorName: 'AppSmart',
        blurb: json_response.listing.blurb,
        description: json_response.features[0].description,
        hidePricings: false,
        startingPrice: {
            priceCaption: 'Starting at ',
            formattedFullPrice: `$${json_response.startingPrice.amount.USD} /${frequency_value}`
        },
        url: `/en-US/apps/${application_id}/`,
        iconUrl: json_response.listing.myAppLogoIconUrl,
        rating: json_response.rating,
        numRatings: json_response.numRatings,
        tags: json_response.tags,
        badges: [],
        productRibbon: product_json.productRibbon
    }
}


export var queryProductAPI = async function(application_id, marketplace_url) {
    const url = `${marketplace_url}/api/marketplace/v1/products/${application_id}`

    return await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => productInfoFromJson(response, application_id));
  }

export var getProductDetails = (application_id, marketplace_url)=>{
    var response = queryProductAPI(application_id, marketplace_url);
    return productInfoFromJson(response, application_id)
}
