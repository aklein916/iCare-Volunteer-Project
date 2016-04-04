class EventsController < ApplicationController
  def index
    @events = Event.all
    render status: 200, json: @events 
  end
end
