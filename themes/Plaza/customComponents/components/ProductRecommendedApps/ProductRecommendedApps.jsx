import React from 'react';

import ProductSimilarApps from '@appdirect/sfb-theme-components/src/components/product-similar-apps/ProductSimilarApps';
import Slider, { sliderSchemaForm, sliderSettingShape, sliderDefaultSettings } from '@appdirect/sfb-theme-components/src/atoms/slider/Slider';
import Tile from '@appdirect/sfb-theme-components/src/atoms/tile/Tile';
import withListener from '@appdirect/sfb-theme-components/src/components/withListener';
import { SMALL, MEDIUM, LARGE } from '@appdirect/sfb-theme-components/src/constants/sizes';
import { createNamespace } from '@appdirect/sfb-theme-components/src/tools/namingTools';

import { queryProductAPI, getProductDetails } from './APIQuery';

export const ProductRecommendedAppsComponent = props => {



    const namespace = createNamespace('ProductSimilarApps');

    var tile_data = queryProductAPI(126588, "https://testmarketplace.appdirect.com")

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
            items: [tile_data, tile_data, tile_data, tile_data, tile_data, tile_data, tile_data, tile_data, tile_data, tile_data, tile_data],
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
