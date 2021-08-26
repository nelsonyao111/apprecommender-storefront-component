import React from 'react';

import ProductSimilarApps from '@appdirect/sfb-theme-components/src/components/product-similar-apps/ProductSimilarApps';
import Tile from '@appdirect/sfb-theme-components/src/atoms/tile/Tile';
import withListener from '@appdirect/sfb-theme-components/src/components/withListener';


export const ProductRecommendedAppsComponent = props => ({

    const SETTINGS = Tile.schema().form;
    const { settings = {}} = props;
    const tile = Tile({
        data: {
            name: 'Application',
            id: 0,
            vendorName: '',
            blurb: 'This is an app',
            description: '',
            hidePricings: false,
            startingPrice: {
                priceCaption: '',
                formattedFullPrice: ''
            },
            url: '',
            iconUrl: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F69%2FHow_to_use_icon.svg%2F1200px-How_to_use_icon.svg.png&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AHow_to_use_icon.svg&tbnid=qr7OC_o-LJ2zFM&vet=12ahUKEwjyzbGVnc_yAhWOo3IEHZ9xCPQQMygBegUIARDLAQ..i&docid=2BPS9DMOFiAuyM&w=1200&h=1110&q=icon&ved=2ahUKEwjyzbGVnc_yAhWOo3IEHZ9xCPQQMygBegUIARDLAQ",
            rating: 3,
            numRatings: 20,
            tags: null,
            badges: [],
            productRibbon: null
        },
        settings: {
            layout: SETTINGS.layout.defaultValue,
            tileBackgroundColor: "blue",
            isDescriptionVisible: true,
            isRatingsVisible: true,
            size: SMALL.value,
            borderRadius: 8
        },
        isMobile: false,
        tileIndex: 0,
        reportHeight: null, // deliberately setting this to null because an empty function is truthy
        height: 0,
        ctaLabel: 'Buy Now'
        } 
    )
    

    const recommendation_data =  {
        data: {
        recommendations: {
            items: [
                tile
            ],
            viewAllLink: '',
            i18n: {
                title: 'Recommended Apps',
                titleProduct: 'Recommended Products',
                viewAll: 'View All'
                    }
                }
            },
        settings: {
            ...sliderDefaultSettings,
            sliderTitle: undefined,
            sortBy: null
        }
    };
    return (<ProductSimilarApps data= {recommendation_data}/>);
});

export default withListener(ProductRecommendedAppsComponent);
