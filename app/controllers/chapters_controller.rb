class ChaptersController < ApplicationController
    before_action :authorized, only: [:create, :destroy]
    before_action :is_author, only: [:create, :destroy]

    def create
        chapter = Chapter.new(params.permit(:title, :content))
        chapter.story_id = params[:id]
        last_index = Chapter.where(story_id: params[:id]).maximum(:order)
        chapter.order = (last_index || 0)  + 1
        chapter.save
        story = chapter.story
        story.updated_at = DateTime.now
        story.save

        render :json => chapter
    end

    def show
        render :json => Chapter.where(story_id: params[:id], id: params[:chapter_id]).first
    end

    def destroy
        Chapter.where(story_id: params[:id], id: params[:chapter_id]).first.destroy
    end

    def is_author
        authorized
        render json: { message: 'Please log in' }, status: :unauthorized unless Story.find_by(id: params[:id]).user_id == @user.id
    end
end
