import React from 'react';

import ProductSimilarApps from '@appdirect/sfb-theme-components/src/components/product-similar-apps/ProductSimilarApps';
import Slider, { sliderSchemaForm, sliderSettingShape, sliderDefaultSettings } from '@appdirect/sfb-theme-components/src/atoms/slider/Slider';
import Tile from '@appdirect/sfb-theme-components/src/atoms/tile/Tile';
import withListener from '@appdirect/sfb-theme-components/src/components/withListener';
import { SMALL, MEDIUM, LARGE } from '@appdirect/sfb-theme-components/src/constants/sizes';
import { createNamespace } from '@appdirect/sfb-theme-components/src/tools/namingTools';

import { productInfoFromResponse } from './ProductAPIQuery';

export const ProductRecommendedAppsComponent = function(props){

    const namespace = createNamespace('ProductSimilarApps');

    var queryProductAPI = async function(application_id, marketplace_url) {
        const url = `${marketplace_url}/api/marketplace/v1/products/${application_id}`
        return fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    }

    var getAllProductDetails = function(application_id_list, marketplace_url) {
        const queryPromises = application_id_list.map(app_id => 
            queryProductAPI(app_id, marketplace_url));

        const statusesPromise = Promise.allSettled(queryPromises);
        return statusesPromise;
    }

    const responses = getAllProductDetails([310674, 147651, 147651], "https://marketplace.appsmart.com")
    var tile_data = [];

    for (var i = 0; i < responses.length; i++){
        console.log(responses[i])
        if (responses[i].status === "fulfilled") {
            tile_data.push(productInfoFromResponse(responses[i].value.json()))
        }
    }
    // var tile_data = responses.map(product => productInfoFromResponse(product))
    // console.log(tile_data)
    var tile_settings = {
        // layout: SETTINGS.layout.defaultValue,
        tileBackgroundColor: "blue",
        isDescriptionVisible: true,
        isRatingsVisible: true,
        size: SMALL.value,
        borderRadius: 8
    }



    var tile_content = {
        data: tile_data,
        settings: tile_settings,
        isMobile: false,
        tileIndex: 0,
        reportHeight: null, // deliberately setting this to null because an empty function is truthy
        height: 500,
        ctaLabel: 'Buy Now'
        } 


    var slider_settings ={
        layout: "classic",
        borderRadius: 8,
        size: MEDIUM.value,
        tileBackgroundColor: '#EAEAEA',
        tileCtaLabel: 'Buy now',
        sliderTitle: "Recommended Products"
    }


    var i18n = {
            title: 'Recommended Apps',
            titleProduct: 'Recommended Products',
            viewAll: 'https://news.google.com/'
        }

    // var slider_content = {
    //     name: "Recommendations",
    //     url: "",
    //     items: [tile],
    //     staticTitle: "Recommended Apps",
    //     // although component's main purpose is being a slider, it can also show a static list of elements
    //     isSlider: true,
    //     maxRows: 1,
    //     buttonLabel: null,
    //     contentType: 'manual',
    //     i18n: {
    //         title: 'Recommended Apps',
    //         titleProduct: 'Recommended Products',
    //         viewAll: 'View All'
    //         },
    //     settings: slider_settings
            
    // }

    var recommendation_data = {
        recommendations: {
            items: tile_data,
            viewAllLink: 'https://www.cbc.ca',
            i18n:i18n
        }

    }

    var recommendation_settings = {
        sliderTitle: "Recommended Applications",
        sortBy: "nothing"
    }

    var recommendation_content = {
        data: recommendation_data,
        settings: recommendation_settings
    }

    return (
        <div>
            <ProductSimilarApps 
                data={recommendation_data} 
                settings={recommendation_settings} 
            />
        </div>);
};


ProductRecommendedAppsComponent.defaultProps = {
};

export default withListener(ProductRecommendedAppsComponent);
