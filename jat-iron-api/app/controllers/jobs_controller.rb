class JobsController < ApplicationController
  def show
    job = Job.find_by(id: params[:id])
    render json: JobSerializer.new(job).to_serialized_json
  end

  def create
    #TODO: Jobs create action
  end

  def update
    #TODO: Jobs update action
  end

  def delete
    #TODO: Jobs delete action
  end
end
