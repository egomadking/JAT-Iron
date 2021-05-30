class JobsController < ApplicationController
  def show
    job = Job.find_by(id: params[:id])
    render json: JobSerializer.new(job).to_serialized_json
  end

  def create
    job_search = JobSearch.find_by(id: params[:job_search_id])
    if job_search.jobs << Job.create(job_params)
      job = job_search.jobs.last
      render json: JobSerializer.new(job).to_serialized_json
    else
      render json: {error: "Job was not saved."}, status: :bad_request
    end

  end

  def update
    job = Job.find_by(id: params[:id])
    if job.update(job_params)
      render json: JobSerializer.new(job).to_serialized_json
    else
      render json: {error: "Job was not saved."}, status: :bad_request
    end
  end

  def destroy
    job = Job.find_by(id: params[:id])
    if job
      job.destroy
      render json: {success: "Job id #{params[:id]} deleted."}
    else
      render json: {error: "Job was not deleted."}, status: :bad_request
    end
  end
end


def job_params
  params.require(:job).permit(:title, :status, :url, :company_logo, :recruiter_name, :recruiter_email, :recruiter_phone, :poc_notes, :posted, :closed, :description, :company, :location, :notes)
end