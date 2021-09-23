import React, { useEffect, useState } from 'react';

import ProductSimilarApps from '@appdirect/sfb-theme-components/src/components/product-similar-apps/ProductSimilarApps';
import Slider, { sliderSchemaForm, sliderSettingShape, sliderDefaultSettings } from '@appdirect/sfb-theme-components/src/atoms/slider/Slider';
import Tile from '@appdirect/sfb-theme-components/src/atoms/tile/Tile';
import withListener from '@appdirect/sfb-theme-components/src/components/withListener';
import { SMALL, MEDIUM, LARGE } from '@appdirect/sfb-theme-components/src/constants/sizes';
import { createNamespace } from '@appdirect/sfb-theme-components/src/tools/namingTools';

import { productInfoFromResponse, getAllProductDetails} from './ProductAPIQuery';
import {getRecommendations} from './AppRecommenderQuery.js';

export const ProductRecommendedAppsComponent = function(props){

    const namespace = createNamespace('ProductSimilarApps');

    const [recommendation_data, setData] = useState({});

    useEffect(() => {
        // getRecommendations()
        // .then(app_list => getAllProductDetails(app_list, "https://marketplace.appsmart.com"))
        getAllProductDetails([318673, 234576], "https://marketplace.appsmart.com")
          .then(promises => {
                var tile_data = [];
                for (var i = 0; i < promises.length; i++){
                    console.log(promises[i])
                    if (promises[i].status === "fulfilled") {
                        tile_data.push(productInfoFromResponse(promises[i].value))
                    }
                };
                setData({
                    recommendations: {
                        items: tile_data,
                        viewAllLink: 'https://www.cbc.ca',
                        i18n:{
                            title: 'Recommended Apps',
                            titleProduct: 'Recommended Products',
                            viewAll: 'https://news.google.com/'
                        }
                    }
                })
            })
    }, [])

    var recommendation_settings = {
        sliderTitle: "Recommended Applications",
        sortBy: "nothing"
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
