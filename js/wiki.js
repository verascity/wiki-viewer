function wikiSearch() {
  var $wikiElem = $('#wikiList');
  $wikiElem.text("");
  var searchText = $("input[name='search']").val();
  var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchText + "&format=json&callback=wikiCallback";
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");}, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function(response) {
            var articleList = response[1];
            var synopsList = response[2];
            var urlList = response[3];

          for (var i = 0; i < articleList.length; i++){
            $wikiElem.append('<div class="well bounce"><a href="' + urlList[i] + '" target="_blank">' + '<h3>'+articleList[i] + '</h3><hr><p>'+synopsList[i]+'..</p></a></div>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$(document).ready(function (){
  $("#submit").click(wikiSearch);
});
