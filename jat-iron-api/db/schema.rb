# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_24_175929) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "job_searches", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "jobs", force: :cascade do |t|
    t.bigint "job_search_id", null: false
    t.string "title"
    t.string "url"
    t.string "company_logo"
    t.text "description"
    t.date "posted"
    t.date "closed"
    t.string "status", default: "new"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["job_search_id"], name: "index_jobs_on_job_search_id"
  end

  create_table "notes", force: :cascade do |t|
    t.text "content"
    t.bigint "job_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["job_id"], name: "index_notes_on_job_id"
  end

  add_foreign_key "jobs", "job_searches"
  add_foreign_key "notes", "jobs"
end
