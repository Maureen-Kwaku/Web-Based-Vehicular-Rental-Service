<script
  src="https://code.jquery.com/jquery-3.6.0.js"
  integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
  crossorigin="anonymous"
></script>;

function doToggle() {
  var main = document.querySelector(".main");
  main.classList.toggle("active");
}

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

$(document).ready(function () {
  $(".list").click(function () {
    const value = $(this).attr("data-filter");
    if (value == "all") {
      $(".itembox").show("1000");
    } else {
      $(".itembox")
        .not("." + value)
        .hide("1000");
      $(".itembox")
        .filter("." + value)
        .show("1000");
    }
  });

  $(".list").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
  });
});
