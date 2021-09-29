import React, { useEffect, useState } from 'react';

import ProductSimilarApps from '@appdirect/sfb-theme-components/src/components/product-similar-apps/ProductSimilarApps';
import withListener from '@appdirect/sfb-theme-components/src/components/withListener';
import { createNamespace } from '@appdirect/sfb-theme-components/src/tools/namingTools';

import { productInfoFromResponse, getAllProductDetails} from './ProductAPIQuery';
import {getRecommendations} from './AppRecommenderQuery.js';

export const ProductRecommendedAppsComponent = function(props){

    const [recommendation_data, setData] = useState({});

    const BASE_URL = "https://marketplace.appsmart.com"
    // const APP_401 = [314517] for testing how to handle 401 apps
    useEffect(() => {
        getRecommendations()
        .then(app_list => getAllProductDetails(app_list, BASE_URL))
          .then(promises => {
                var tile_data = [];
                for (var i = 0; i < promises.length; i++){
                    if (promises[i].status === "fulfilled") {
                        var response_json = promises[i].value
                        if (response_json !== null){
                            tile_data.push(productInfoFromResponse(response_json))
                        }
                    }
                };
                tile_data.sort((a, b) => (a.recommendation_rank > b.recommendation_rank) ? 1 : -1)
                setData({
                    recommendations: {
                        items: tile_data,
                        viewAllLink: '',
                        i18n:{
                            title: 'Recommended Apps',
                            titleProduct: 'Recommended Products',
                            viewAll: 'View All'
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
