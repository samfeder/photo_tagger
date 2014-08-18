class Api::PhotosController < ApplicationController
  before_filter :require_current_user!, :only => [:create]

  def create
    @photo = current_user.photos.new(photo_params)
    if @photo.save
      render :json => @photo
    else
      render(
        :json => @photo.errors.full_messages,
        :status => :unprocessable_entity
      )
    end
  end

  def index
    @photos = Photo.where("owner_id = ?", params[:user_id])
    render :json => @photos
  end

  def update
    @photo = current_user.photos.find(params[:id])
    if @photo.update(photo_params)
      render :json => @photo
    else
      render(
        :json => @photo.errors.full_messages,
        :status => :unprocessable_entity
      )
    end

  end

  private
  def photo_params
    params.require(:photo).permit(:title, :url)
  end
end
