class Api::PhotosController < ApplicationController
  before_filter :require_current_user!, :only => [:create]

  def create
    @photo = Photo.new(params[:photo])
    @photo.owner_id = current_user.id
    if @photo.save
      render :json => @photo
    else
      render(
        :json => @photo.errors.full_messages,
        :status => :unprocessible_entity
      )
    end
  end

  def index
    @photos = Photo.where("user_id = ?", params[:user_id])
    render :json => @photos
  end
end