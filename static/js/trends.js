var supply_card = function(url, title, image_url) {
  console.log('supplying card...')
  $('.anomaly_cards').append(`
          <div class='card' style='width: 18rem;'>
            <img class='card-img-top' src=` + image_url + ` alt='Card image cap'>
            <div class='card-body'>
              <h5 class='card-title'>` + title + `</h5>
              <p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href=` + url + ` class='btn btn-primary'>See more</a>
            </div>
          </div>`);
}

// jQuery.noConflict()(function ($) { // this was missing for me
$(document).ready(function() {
  console.log('document ready.')
  for (var i = 0; i < anomalies.length; i++) {  // iterate through each anomaly
    url_list = urls[i]  // url_list for this anomaly
    for (var j = 0; j < url_list.length; j++) {  // iterate through each url in this anomaly
        supply_card(url_list[j], 'title here', url_list[j])  // supply a card
    }
  }
  console.log('touchdown');
});
// });
