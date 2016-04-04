class StoriesController < ApplicationController
  def index
    @stories = Story.all
    render status: 200, json: @stories
  end

  def show
    @story = Story.find(params[:id])
    render status: 200, json: @stories
  end

  def create
    @story = Story.new(story_params)

    if @story.save
      render status: 200, json: @stories
    else
      render status: 200, json: @stories
    end
  end

  private
  def story_params
    params.require(:story).permit(:name, :age, :cause, :photo_url, :story, :created_at, :updated_at)
  end

end
