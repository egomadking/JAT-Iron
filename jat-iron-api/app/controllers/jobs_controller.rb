class JobsController < ApplicationController
  def show
    job = Job.find_by(params[:id])
    render json: JobSerializer.new(job).to_serialized_json
  end
end
