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
//= require_tree ../templates
//
//= require_tree .

Photo = function(options){
  this.attributes = {};
  _.extend(this.attributes, options);
}

Photo.all = [];

Photo.fetchByUserId = function(userID, callback) {
  $.ajax({
    url: "/api/users/" + userID + "/photos",
    type: "GET",
    success: function(data){
      var photos = data.map(function(obj){
        return new Photo(obj);
      })

      Photo.all.concat(photos);
      callback(photos);
    }
  })
}

Photo.prototype.get = function(attr_name) {
  return this.attributes[attr_name];
}

Photo.prototype.set = function(attr_name, val) {
  this.attributes[attr_name] = val;
}

Photo.prototype.create = function(callback) {
  var photo = this
  if (!_.isUndefined(this.get("id"))) {
    return false;
  }

  $.ajax({
    url: "/api/photos",
    type: "POST",
    data: {"photo": this.attributes},
    success: function(data){
      _.extend(photo.attributes, data)

      Photo.all.push(photo);
      return callback(photo);
    }
  });
};

Photo.prototype.save = function(callback) {
  var photo = this;
  if (_.isUndefined(this.get("id"))) {
    this.create(callback);
  } else {
    $.ajax({
      url: "/api/photos/" + this.get("id"),
      type: "PUT",
      data: {"photo": this.attributes}, //Is this most optimal way to format?
      success: function(data){
        _.extend(photo.attributes, data)
        return callback(photo);
      }
    })
  }

}