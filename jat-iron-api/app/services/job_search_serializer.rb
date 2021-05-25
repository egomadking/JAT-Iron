class JobSearchSerializer
  def initialize(job_search_obj)
    @job_search_obj = job_search_obj
  end

  def to_serialized_json
    @job_search_obj.to_json(only: :name,
        include: {jobs:{ except: [:created_at, :updated_at]}}
      )
  end
end