// ==UserScript==
// @name           Github autocomplete
// @namespace      iangreenleaf.com
// @include        https://github.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

var getAutocompleteResults = function(forTextField) {
  var results = $("#user_autocomplete_results");
  if (results.length == 0) {
    results = $("<ul id='user_autocomplete_results' class='ac_results'></ul>");
  }
  results.data("activeFormId", forTextField.prop("id"));
  return results;
}

$("#user_autocomplete_results li").live("click", function() {
  var username = $(this).text();
  console.log(username);
  console.log($(this).parent().data("activeFormId"));
});

$(".comment-form textarea").keyup(function(event) {
  var activeField = $(this);
  var lastWord = $(event.target).val().split(/ |\n/).pop();
  if (lastWord[0] != "@" || lastWord.length < 4) {
      getAutocompleteResults(activeField).empty();
      return;
  }
  var search = lastWord.slice(1);
  $.get(
    "https://github.com/autocomplete/users?q=" + search + "&limit=10",
    function(data) {
      var box = getAutocompleteResults(activeField);
      box.empty();
      $.each(data.split("\n"), function(i,str) {
        username = str.split(" ")[0];
        gravatar = str.split(" ")[1];
        var item = $("<li></li>").text(username);
        item.prepend($("<img src='https://secure.gravatar.com/avatar/" + gravatar + "?s=140&d=https%3A%2F%2Fgithub.com%2Fimages%2Fgravatars%2Fgravatar-140.png' />").prop("width", 20).prop("height", 20));
        box.append(item);
      });
      activeField.after(box);
    }
  );
});
