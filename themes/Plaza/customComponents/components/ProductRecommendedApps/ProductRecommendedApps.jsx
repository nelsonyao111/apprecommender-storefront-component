import React from 'react';

import ProductSimilarApps from '@appdirect/sfb-theme-components/src/components/product-similar-apps/ProductSimilarApps';
import Slider, { sliderSchemaForm, sliderSettingShape, sliderDefaultSettings } from '@appdirect/sfb-theme-components/src/atoms/slider/Slider';
import Tile from '@appdirect/sfb-theme-components/src/atoms/tile/Tile';
import withListener from '@appdirect/sfb-theme-components/src/components/withListener';
import { SMALL, MEDIUM, LARGE } from '@appdirect/sfb-theme-components/src/constants/sizes';
import { createNamespace } from '@appdirect/sfb-theme-components/src/tools/namingTools';

export const ProductRecommendedAppsComponent = props => {



    const namespace = createNamespace('ProductSimilarApps');

    // const SETTINGS = Tile.schema().form;
    var tile_settings = {
        // layout: SETTINGS.layout.defaultValue,
        tileBackgroundColor: "blue",
        isDescriptionVisible: true,
        isRatingsVisible: true,
        size: SMALL.value,
        borderRadius: 8
    }

    var tile_data = {
        name: 'Application',
        id: 310993,
        vendorName: 'Vendor',
        blurb: 'This is an app',
        description: 'A geat app',
        hidePricings: false,
        startingPrice: {
            priceCaption: '232',
            formattedFullPrice: '333'
        },
        url: '',
        iconUrl: "",
        rating: 3,
        numRatings: 20,
        tags: null,
        badges: [], //{id:"23", label:"label", type:"success"}
        productRibbon: null
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


    var tile = Tile(
        tile_content
    )

    var slider_settings ={
        layout: "classic",
        borderRadius: 8,
        size: MEDIUM.value,
        tileBackgroundColor: '#EAEAEA',
        tileCtaLabel: 'Buy now',
        // displayOptions: SETTINGS.displayOptions.defaultValue,
        // quickviewOptions: SETTINGS.quickviewOptions.defaultValue,
        // quickviewDisplayOptions: productQuickviewSchemaForm.quickviewDisplayOptions.defaultValue,
        // quickviewViewMode: productQuickviewSchemaForm.quickviewViewMode.defaultValue
    }


    var i18n = {
            title: 'Recommended Apps',
            titleProduct: 'Recommended Products',
            viewAll: 'https://news.google.com/',
            quickview: 'Quickview',
            defaultTitlePlaceholder: 'Product Name',
            defaultDescriptionPlaceholder: 'Product description goes here in this space provided.',
            defaultPricePlaceholder: 'From'
        }

    var slider_content = {
        name: "Recommendations",
        url: "",
        items: [tile],
        staticTitle: "Recommended Apps",
        // although component's main purpose is being a slider, it can also show a static list of elements
        isSlider: true,
        maxRows: 1,
        buttonLabel: null,
        contentType: 'manual',
        i18n: {
            title: 'Recommended Apps',
            titleProduct: 'Recommended Products',
            viewAll: 'View All'
            },
        settings: slider_settings
            
    }

    var recommendation_data = {
        recommendations: {
            items: [tile, tile],
            viewAllLink: '',
            i18n:i18n
        }

    }

    var recommendation_settings = {
        ...sliderDefaultSettings,
        sliderTitle: "Recommended Applications",
        sortBy: "nothing"
    }

    var recommendation_content = {
        data: recommendation_data,
        settings: recommendation_settings
    }

    // return (
    //     <div>
    //         <ProductSimilarApps 
    //             data={recommendation_data} 
    //             settings={recommendation_settings} 
    //         />
    //     </div>);

    return (<div {...namespace('container').props}>
                <Slider 
                    // data={slider_data}
                    // name={"Slider"}
                    items={[tile]}
                    // url={"https://news.google.com/"}
                    i18n={i18n}
                    // staticTitle={'Recommended Products'}
                    // contentType={"manual"}
                    // settings={slider_settings}
                />
            </div>);

    // return (<div><Tile data={tile_data} settings={tile_settings} /></div>);

};


ProductRecommendedAppsComponent.defaultProps = {
};

export default withListener(ProductRecommendedAppsComponent);
