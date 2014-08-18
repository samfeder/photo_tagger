var PT = window.PT = window.PT || {};

var PhotosListView = PT.PhotosListView = function(){
  this.$el = $("<div>");
};

PhotosListView.prototype.render = function(){
  this.$el.empty();
  $ul = $("<ul>")
  this.$el.html($ul)


  PT.Photo.all.forEach(function(photo) {
    $li = $("<li>")
    $li.html('<a href="' + photo.get("url") + '">' + photo.get("title") + "</a>")
    $ul.append($li)
  })

  return this;
};