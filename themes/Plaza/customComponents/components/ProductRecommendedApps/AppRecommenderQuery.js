export var getRecommendations = async function(){
    var app_id = window.location.href.match(/(?<=apps\/)\d+/)
    var endpoint = 'api/apprecommender/v1';
    const BASE_URL = 'https://marketplace.appsmart.com';
    var recommender_url = `${BASE_URL}/${endpoint}/similar/${app_id}`; // for getting apps recommended for buyers of ${app_id}
    // var recommender_url = `${BASE_URL}/${endpoint}/top`;  // returns a list of application 

    return fetch(recommender_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(data => data.json())
      .then(data => data.content);
}