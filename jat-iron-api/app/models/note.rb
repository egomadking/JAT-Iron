class Note < ApplicationRecord
  belongs_to :job

  validates :content, presence: true
end
