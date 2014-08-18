var PT = window.PT = window.PT || {};

var Photo = PT.Photo = function(options){
  this.attributes = {};
  _.extend(this.attributes, options);
}

Photo.all = [];

Photo.fetchByUserId = function(userID, callback) {
  $.ajax({
    url: "/api/users/" + userID + "/photos",
    type: "GET",
    success: function(data){
      var photos = [];
      data.forEach(function(obj){
        var newPhoto = new Photo(obj);
        photos.push(newPhoto);
        Photo.all.push(newPhoto);
      })

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