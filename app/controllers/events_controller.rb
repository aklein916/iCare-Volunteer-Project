class EventsController < ApplicationController
  def index
    @events = Event.all
    render status: 200, json: @events
  end

  # def show
  #   @event = Event.find(params[:id])
  #   render status: 200, json: @events
  # end

  # def create
  #   @event = Event.new(event_params)
  #
  #   if @event.save
  #     render status: 200, json: @events
  #   else
  #     render status: 200, :created, json: @events
  # end

  private
  def event_params
    params.require(:event).permit(:title, :organizer, :focus_area, :description, :start_date, :end_date, :start_time, :end_time, :address, :created_at, :updated_at)
  end
end
