// ==UserScript==
// @name           Github autocomplete
// @namespace      iangreenleaf.com
// @include        https://github.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

var getAutocompleteResults = function() {
  var results = $("#user_autocomplete_results");
  if (results.length == 0) {
    results = $("<ul id='user_autocomplete_results'></ul>");
  }
  return results;
}

$(".comment-form").keyup(function(event) {
  var lastWord = $(event.target).val().split(/ |\n/).pop();
  if (lastWord[0] != "@" || lastWord.length < 4) {
      getAutocompleteResults().empty();
      return;
  }
  var search = lastWord.slice(1);
  $.get(
    "https://github.com/autocomplete/users?q=" + search + "&limit=10",
    function(data) {
      var box = getAutocompleteResults();
      box.empty();
      $.each(data.split("\n"), function(i,str) {
        username = str.split(" ")[0];
        gravatar = str.split(" ")[1];
        box.append($("<li>" + username + "</li>"));
      });
      $(".comment-form").after(box);
    }
  );
});
