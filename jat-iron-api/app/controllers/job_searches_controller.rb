class JobSearchesController < ApplicationController

  def index
    job_searches = JobSearch.all
    render json: JobSearchSerializer.new(job_searches).to_serialized_json
  end

  def show
    job_search = JobSearch.find_by(id: params[:id])
    render json: JobSearchSerializer.new(job_search).to_serialized_json
  end

  def create
    #TODO: JobSearches create action
  end

  def delete
    #TODO: JobSearches delete action
  end
end
