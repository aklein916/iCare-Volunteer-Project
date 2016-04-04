class StoriesController < ApplicationController
  def index
    @stories = Story.all
    render status: 200, json: @stories
  end
end
