class EventsController < ApplicationController

  def index
    @events = Event.all
    respond_to do |format|
      format.html
      format.json{ render status: 200, json: @events }
    end
  end

  # def show
  #   @event = Event.find(params[:id])
  #   render status: 200, json: @events
  # end

  private
  def event_params
    params.require(:event).permit(:title, :organizer, :focus_area, :description, :start_date, :end_date, :start_time, :end_time, :address, :created_at, :updated_at)
  end
end
