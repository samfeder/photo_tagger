var PT = window.PT = window.PT || {};

var PhotoFormView = PT.PhotoFormView = function(){
  this.$el = $('<div>');
  this.$el.on('submit', 'form', this.submit)
};

PhotoFormView.prototype.render = function() {
  var template = JST["photo_form"]

  this.$el.html(template)
  return this
}

PhotoFormView.prototype.submit = function(event){
  event.preventDefault();
  var formData = $(event.currentTarget).serializeJSON()
  var photo = new PT.Photo(formData)

  photo.create(function() {
    console.log(photo);
  })

  return this;
}