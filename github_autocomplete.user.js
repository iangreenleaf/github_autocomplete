// ==UserScript==
// @name           Github autocomplete
// @namespace      iangreenleaf.com
// @include        https://github.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

$(".comment-form").keyup(function(event) {
  var lastWord = $(event.target).val().split(/ |\n/).pop();
  if (lastWord[0] != "@" || lastWord.length < 5) return;
  var search = lastWord.slice(1);
  $.get(
    "https://github.com/api/v2/json/user/search/" + search,
    function(data) {
      console.log(data);
    }
    );
});
