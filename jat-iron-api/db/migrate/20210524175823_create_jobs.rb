class CreateJobs < ActiveRecord::Migration[6.1]
  def change
    create_table :jobs do |t|
      t.references :job_search, null: false, foreign_key: true
      t.string :title
      t.string :url
      t.string :company
      t.string :company_logo
      t.string :location
      t.text :description
      t.string :recruiter_name
      t.string :recruiter_phone
      t.string :recruiter_email
      t.text :poc_notes
      t.text :notes
      t.date :posted
      t.date :closed
      t.string :status, default: "new"
      t.timestamps
    end
  end
end
