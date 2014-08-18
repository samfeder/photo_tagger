// This is a manifest file that'll be compiled into application.js,
// which will include all the files listed below.
//
// Any JavaScript/Coffee file within this directory,
// lib/assets/javascripts, vendor/assets/javascripts, or
// vendor/assets/javascripts of plugins, if any, can be referenced
// here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll
// appear at the bottom of the the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE
// PROCESSED, ANY BLANK LINE SHOULD GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery.serializeJSON
//= require underscore
//
//= require_tree ./models
//= require_tree ./views
//= require_tree ../templates
//
//= require_tree .

var PT = window.PT = window.PT || {}

PT.initialize = function() {

  this.Photo.fetchByUserId(currentUserId, function(photos){
    PT.showPhotosIndex();
    //
    // var listView = new PhotosListView();
    // listView.render()
    // $('div#content').append(listView.$el);
    //
    // var formView = new PhotoFormView();
    // formView.render()
    // $('div#content').append(formView.$el);
  });
};

PT.renderViews = function(){
  var viewNames = Array.prototype.slice.call(arguments);
  viewNames.forEach(function(ViewClass){
    var view = new ViewClass()
    view.render();
    $('div#content').append(view.$el);
  })
}

PT.showPhotosIndex = function(){
  $("#content").empty()
  PT.renderViews(PhotosListView, PhotoFormView);
}

PT.showPhotoDetail = function(photo){
  $("#content").empty()
  var view = new PhotoDetailView(photo)
  view.render();
  $('div#content').append(view.$el);
}


