class StoriesController < ApplicationController
  before_action :authorized, only: [:my, :create, :destroy]
  before_action :is_author, only: [:destroy]
  
  def index
    paginate Story.order('updated_at DESC'), params[:page]
  end

  def create
    story = Story.create(params.permit(:title, :synopsis))
    story.user = @user
    if story.valid?
      story.save
      render :json => story
    else
      render :json => {errors: story.errors}
    end
  end

  def show
    story = Story.find_by(id: params[:id])
      .to_json(:include => { 
        :user => { :only => :nickname }, 
        :chapters => { :only => [:title, :id] } 
      })
    render :json => story
  end

  def destroy
    story = Story.find_by(id: params[:id])
    story.chapters.destroy_all
    story.destroy
  end

  def my
    render :json => Story.where(user_id: @user.id).order(id: :desc)
  end
  
  def is_author
    authorized
    render json: { message: 'Please log in' }, status: :unauthorized unless Story.find_by(id: params[:id]).user_id == @user.id
  end
end
