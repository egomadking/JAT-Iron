class JobsController < ApplicationController
  def show
    job = Job.find_by(id: params[:id])
    render json: JobSerializer.new(job).to_serialized_json
  end
end
