$('#new-game').click(function(evt) {
  try {
    var model = new MarbleSolitaireModel($('#arm').val());
    var view = new MarbleSolitaireView(model.getSize());
    var controller = new MarbleSolitaireController(model, view);
  } catch(err) {
    alert(err);
  }
});