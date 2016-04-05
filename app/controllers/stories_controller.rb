class StoriesController < ApplicationController
  def index
    @stories = Story.all
    respond_to do |format|
      format.html
      format.json{render status: 200, json: @stories }
    end
  end
  #
  # def show
  #   @story = Story.find(params[:id])
  #   render status: 200, json: @stories
  # end

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
    params.require(:story).permit(:name, :age, :cause, :photo_url, :created_at, :updated_at)
  end

end
