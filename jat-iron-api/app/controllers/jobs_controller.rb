class JobsController < ApplicationController
  def show
    job = Job.find_by(id: params[:id])
    render json: JobSerializer.new(job).to_serialized_json
  end

  def create
    job = Job.find_by(id: params[:job_id])
    job_search = JobSearch.find_by(id: params[job_search_id])
    byebug

    #TODO: Jobs create action
  end

  def update
    job = Job.find_by(id: params[:id])
    if job
      job.update(job_params)
      render json: JobSerializer.new(job).to_serialized_json, status:200
    else
    
    end
  end

  def delete
    byebug
    #TODO: Jobs delete action
  end
end


def job_params
  params.require(:job).permit(:title, :status, :url, :company_logo, :recruiter_name, :recruiter_email, :recruiter_phone, :poc_notes, :posted, :closed, :description)
end