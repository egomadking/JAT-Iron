class CreateJobSearches < ActiveRecord::Migration[6.1]
  def change
    create_table :job_searches do |t|
      t.string :name

      t.timestamps
    end
  end
end
