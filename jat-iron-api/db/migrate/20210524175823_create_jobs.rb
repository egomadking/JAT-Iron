class CreateJobs < ActiveRecord::Migration[6.1]
  def change
    create_table :jobs do |t|
      t.references :job_search, null: false, foreign_key: true
      t.string :title
      t.string :url
      t.string :company_logo
      t.text :description
      t.date, :posted
      t.date :closed
      t.string :status

      t.timestamps
    end
  end
end
