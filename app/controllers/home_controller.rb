class HomeController < ApplicationController

  def index
    @events = Event.all
    respond_to do |format|
      format.html
      format.json{ render status: 200, json: @events }
    end
  end
end
