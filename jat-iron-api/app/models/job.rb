class Job < ApplicationRecord
  belongs_to :job_search
  has_many :notes
end
