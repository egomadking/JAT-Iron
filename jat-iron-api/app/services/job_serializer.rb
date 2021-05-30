class JobSerializer
  def initialize(job_obj)
    @job_search_obj = job_obj
  end

  def to_serialized_json
    @job_search_obj.to_json(
      except: [:created_at, :updated_at]
    )
  end

end