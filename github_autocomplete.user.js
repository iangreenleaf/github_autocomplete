// ==UserScript==
// @name           Github autocomplete
// @namespace      iangreenleaf.com
// @include        https://github.com/*
// ==/UserScript==

(function(unsafeWindow, $){
  try {
    var GM_log = function(obj) { unsafeWindow.console.log(obj); }

    // Assume jQuery because GitHub uses jquery
    $(".comment-form").keyup(function(ev) {
      GM_log("keypress");
    });

  } catch(e) {
    GM_log(e);
  }
})(unsafeWindow, unsafeWindow.jQuery);
