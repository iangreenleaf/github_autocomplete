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
    "https://github.com/autocomplete/users?q=" + search + "&limit=10",
    function(data) {
      $.each(data.split("\n"), function(i,str) {
        username = str.split(" ")[0];
        gravatar = str.split(" ")[1];
        console.log(username);
        console.log(gravatar);
      });
    }
  );
});
