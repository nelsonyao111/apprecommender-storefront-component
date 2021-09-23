import React, { useEffect, useState } from 'react';

import ProductSimilarApps from '@appdirect/sfb-theme-components/src/components/product-similar-apps/ProductSimilarApps';
import withListener from '@appdirect/sfb-theme-components/src/components/withListener';
import { createNamespace } from '@appdirect/sfb-theme-components/src/tools/namingTools';

import { productInfoFromResponse, getAllProductDetails} from './ProductAPIQuery';
import {getRecommendations} from './AppRecommenderQuery.js';

export const ProductRecommendedAppsComponent = function(props){

    const namespace = createNamespace('ProductSimilarApps');

    const [recommendation_data, setData] = useState({});

    useEffect(() => {
        getRecommendations()
        .then(app_list => getAllProductDetails(app_list, "https://marketplace.appsmart.com"))
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
