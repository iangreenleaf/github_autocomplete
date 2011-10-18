// ==UserScript==
// @name           Github autocomplete
// @namespace      iangreenleaf.com
// @description    Autocompletion for @-mentions on GitHub
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

var autocompleteSelected = function(username, sender) {
  var textfield = $("#" + sender.data("activeFormId"));
  var text = textfield.val();
  var start = text.lastIndexOf("@");
  textfield.val(text.substr(0, start + 1) + username + " ");
  textfield[0].focus();
  sender.empty();
}

$("#user_autocomplete_results li").live("click", function() {
  var username = $(this).text();
  var box = $(this).parent();
  autocompleteSelected(username, box);
});

$("#user_autocomplete_results li").live("mouseenter", function() { $(this).addClass("ac_over"); });
$("#user_autocomplete_results li").live("mouseleave", function() { $(this).removeClass("ac_over"); });

$("#user_autocomplete_results").live("mouseenter", function() { $($("li", this).first()).removeClass("ac_over"); });
$("#user_autocomplete_results").live("mouseleave", function() { $($("li", this).first()).addClass("ac_over"); });

$(".comment-form textarea").keydown(function(e) {
  var activeField = $(this);
  var box = getAutocompleteResults(activeField);

  if (
    (e.keyCode == 13 || e.keyCode == 9)
    && (items = $("li", box)).length > 0
  ) {
    e.preventDefault();
    autocompleteSelected($(items.first()).text(), box);
    return false;
  }
});

$(".comment-form textarea").keyup(function(e) {
  var activeField = $(this);
  var box = getAutocompleteResults(activeField);

  var lastWord = $(e.target).val().split(/ |\n/).pop();
  if (lastWord[0] != "@" || lastWord.length < 3) {
      box.empty();
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
      box.trigger("mouseleave");
    }
  );
});
