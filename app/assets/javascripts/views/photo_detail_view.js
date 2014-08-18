var PT = window.PT = window.PT || {};

var PhotoDetailView = PT.PhotoDetailView = function(photo){
  this.$el = $("<div>");
  this.photo = photo;
  this.template = JST["photo_detail"];
  this.$el.on('click', '#back-link', this.showIndex);
  this.$el.on('click', 'img', this.commenceTagging);
};

PhotoDetailView.prototype.render = function() {
  this.$el.html(this.template({photo: this.photo}));
}

PhotoDetailView.prototype.showIndex = function(){
    event.preventDefault();
    PT.showPhotosIndex()
}

PhotoDetailView.prototype.commenceTagging = function(){
  var x = (event.offsetX / $(event.target).width())*100
  var y = (event.offsetY / $(event.target).height())*100
  console.log(x)
  console.log(y)
  $(".photo-tag").css({
    top: y + "%",
    left: x + "%"
  })

};