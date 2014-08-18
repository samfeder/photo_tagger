var PT = window.PT = window.PT || {};

var PhotosListView = PT.PhotosListView = function(){
  this.$el = $("<div>");
  PT.Photo.on("add", this.render.bind(this));
  this.$el.on('click', "a.photo-link", this.showDetail);
};

PhotosListView.prototype.render = function(){
  this.$el.empty();
  $ul = $("<ul>");
  this.$el.html($ul);


  PT.Photo.all.forEach(function(photo) {
    $li = $("<li>");

    var idTag = 'data-photo-id="' + photo.get("id") + '"';

    $li.html('<a class="photo-link" ' + idTag + ' href="#">' + photo.get("title") + "</a>")
    $ul.append($li);
  })

  return this;
};

PhotosListView.prototype.showDetail = function(event){
  event.preventDefault();
  var id = $(event.currentTarget).attr("data-photo-id");
  var photo = PT.Photo.find(id)

  PT.showPhotoDetail(photo)
}