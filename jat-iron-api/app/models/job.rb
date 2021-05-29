class Job < ApplicationRecord
  belongs_to :job_search

  validates :title, presence: true
  validates :posted, presence: true
  validates :status, inclusion: {in: ["new", "applied", "interviewing", "offer", "accepted", "rejected", "decline", "closed"]}
end
