var supply_card = function(url, title, image_url) {
  console.log('supplying card...')
  $('#anomaly-cards').append(`
          <div class='card' style='width: 18rem;'>
            <img class='card-img-top' src=` + image_url + ` alt='Card image cap'>
            <div class='card-body'>
              <h5 class='card-title'>` + title + `</h5>
              <a href=` + url + ` class='btn btn-primary'>See more</a>
            </div>
          </div>`);
}

var supply_all_cards_for_this_anomaly = function(i) {
  console.log('supplying all cards for ' + anomalies[i]);
  for (var j = 0; j < urls[i].length; j++) {
    url = urls[i][j];  // url_list for this anomaly
    image = ((images[i].length >= j + 1) ? images[i][j] : '');
    title = ((titles[i].length >= j + 1) ? titles[i][j] : '');
    supply_card(urls[i][j], titles[i][j], images[i][j]);
  }
}

var update_graph = function(i) {
  var graphDiv = document.getElementsByClassName('plotly-graph-div')[0];
  for (var j = 0; j < anomalies.length; j++) {
    var temp = 'shapes.' + j + '.fillcolor';
    if (i == j) {
      Plotly.relayout(graphDiv, {[temp]: 'black'});
    } else {
      Plotly.relayout(graphDiv, {[temp]: 'red'});
    }
  }
}

var supply_summary = function(i) {
  console.log('supplying summaries for ' + anomalies[i]);
  if (Object.keys(summs[1]).length === 0) {
    $('#summaries').append('Some summaries of the different article clusters for this anomaly:' + '<br><br>')
  }
  for (var key in summs[i]) {
    if (summs[i].hasOwnProperty(key)) {
      $('#summaries').append(summs[i][key] + '<br><br>')
    }
  }
}

// jQuery.noConflict()(function ($) { // this was missing for me
$(document).ready(function() {
  console.log('document ready.');
  for (var i = 0; i < anomalies.length; i++) {
    document.getElementById("anomaly-bar").innerHTML += `
      <button type="button" class="btn btn-dark btn-outline-warning" id=` + i + `>` + anomalies[i] + `
      </button>`;
  }
  for (var i = 0; i < anomalies.length; i++) {
    document.getElementById(i).addEventListener("click", function(){
      $('#anomaly-cards').html('');
      $('#summaries').html('');
      update_graph(this.id);
      supply_summary(this.id);
      supply_all_cards_for_this_anomaly(this.id);
    });
  }
  // for (var i = 0; i < anomalies.length; i++) {  // iterate through each anomaly
  //   url = urls[i][0];  // url_list for this anomaly
  //   image = ((images[i].length >= 1) ? images[i][0] : '');
  //   title = ((titles[i].length >= 1) ? titles[i][0] : '');
  //   supply_card(url, title, image);

    // for (var j = 0; j < url_list.length; j++) {  // iterate through each url in this anomaly
    //   supply_card(url_list[j], 'title here', url_list[j])  // supply a card
    // }
  // }
  console.log('touchdown');
});
// });
