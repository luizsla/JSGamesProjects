$("header button").click(function(event) {
  event.preventDefault();
  $("input[type=text]").fadeToggle(200);
});


$("ul").on("click", "li", function() {
  $(this).toggleClass("--done");
})


//Create new Todos.
$("main input").keypress(function(event) {
  if (event.which === 13) {
    var fieldValue = $(this).val();
    $("ul").append("<li><span class='list-delete'><i class='far fa-trash-alt'></i></span>" + fieldValue + "</li>");
    $(this).val("");
  }
});

//Delete to-dos.
$("ul").on("click", "span", function(event) {
  $(this).parent().fadeOut(500, function() {
    $(this).remove();
  });
  event.stopPropagation();
});
