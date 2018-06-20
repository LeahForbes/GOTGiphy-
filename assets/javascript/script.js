$ (document).ready(function() {

var gifCategories = ["Daenerys Targaryen", "Jon Snow", "Gregor Clegane", "Cersei Lannister", "Tyrion Lannister", "Arya Stark", "Khal Drogo", "Sansa Stark", "Joffrey Baratheon", "Petyr Baelish", "Sandor Clegane", "Eddard Stark", "Melisandre"];
var apiKey = "9a7fa4fcadec44039b9827a6100853a9"
var rating = "pg"
var searchTerm;
var newSearchTerm;
var moving = false;

particlesJS("particles-js", {"particles":{"number":{"value":400,"density":{"enable":true,"value_area":800}},"color":{"value":"#fff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.3367165327817598,"random":true,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":7.891476416322726,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":false,"distance":500,"color":"#ffffff","opacity":0.4,"width":2},"move":{"enable":true,"speed":6,"direction":"bottom","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"bubble"},"onclick":{"enable":true,"mode":"repulse"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":0.5}},"bubble":{"distance":400,"size":4,"duration":0.3,"opacity":1,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;
for (var i = 0; i < gifCategories.length; i++) {
	$("#buttons").append("<button class='btn btn-secondary' id='gifFilter' value='" + gifCategories[i] + "'>" + gifCategories[i] + "</button>");
};

$(".btn-secondary").on("click",function(){
    $("#gifs").html("");
	   searchTerm = this.value;
     getData();
    });

$(".btn-primary").on("click",function(){
  if ($("#newSearchBox").val() != ""){
  $("#gifs").html("");
  appendSearchTerm();
  searchTerm = newSearchTerm;
  getData();
  $("#newSearchBox").val("");
}
});


$('body').on('click','img',function(){
  if (moving === false) {
var movingGifURL = $(this).attr("alt-src");
var stillGifURL = $(this).attr("src");
$(this).attr("alt-src", stillGifURL);
$(this).attr("src", movingGifURL);
moving = true;
}

if (moving === true) {
  var stillGifURL = $(this).attr("alt-src");
  var movingGifURL = $(this).attr("src");

  $(this).attr("alt-src", movingGifURL);
  $(this).attr("src", stillGifURL);
}
});

function appendStillGifs(response){
        var gifs = response.data; // array of gifs
        for(var i=0; i < gifs.length; i++) {
          var stillImg = gifs[i].images.fixed_width_still.url;
          var movingGif = gifs[i].images.fixed_width.url;
          var rating = gifs[i].rating.toUpperCase();
          // List them on the page
        	$("#gifs").append("<div class='col-lg-2' id='gif'> <img id='clickToMove' alt-src='" + movingGif + "' src='" + stillImg + "'> </img> <p> Rating: " + rating + "</p> </div> " );
         }
	};

function appendSearchTerm() {
  newSearchTerm = $("#newSearchBox").val();
    $("#buttons").append("<button class='btn btn-secondary' id='gifFilter' value='" + newSearchTerm + "'>" + newSearchTerm + "</button>");
}

function getData() {
        $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm + "&rating=" + rating,
        method: "GET"
        }).done(function(response) {

          appendStillGifs(response);

        });
}

});
