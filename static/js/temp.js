var anomalies = [0, 1, 2, 3, 4, 5]
var index;

var add_card = function(id) {
  document.getElementById('row').innerHTML = '';
  document.getElementById('row').innerHTML += `
    <div class="col-sm-4">

      <div class="card">
        <img class="card-img-top img-fluid" src="http://placehold.it/750x325" alt="Card image cap">
        <div class="card-block">
          <h4 class="card-title">Card title</h4>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
        <div class="card-block">
          <a href="#" class="card-link">Card link</a>
        </div>
      </div>

    </div>`;
}

for (var i = 0; i < anomalies.length; i++) {
  document.getElementById(i+1).addEventListener("click", function(){
    index = this.id;
    document.getElementById('current_number').innerHTML = this.id;
    add_card(index);
  });
}
