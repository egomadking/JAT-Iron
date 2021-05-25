class JobSearchesController < ApplicationController

  def show
    job_search = JobSearch.find_by(id: params[:id])
    render json: JobSearchSerializer.new(job_search).to_serialized_json
  end
end
