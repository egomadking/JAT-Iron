class Job < ApplicationRecord
  belongs_to :job_search
  has_many :notes

  validates :title, presence: true
  validates :posted, presence: true
  validates :status, inclusion: {in: ["new", "applied", "interviewing", "offer", "accepted", "rejected", "decline", "closed"]}
end
