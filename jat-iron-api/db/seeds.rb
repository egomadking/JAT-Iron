def f_recruiter

end

def f_email

end

def f_phone

end

def f_description

end

def f_note
  Faker::Lorem.sentences(number: 2).join
end

search = JobSearch.create!(name: "test search")

search.jobs << Job.new(title: "Full-stack web developer", posted: 20210501, closed: 20210530, description: Faker::Lorem.paragraphs(number: 5).join)
search.jobs << Job.new(title: "Front-end web developer", posted: 20210504, closed: 20210523, description: Faker::Lorem.paragraphs(number: 5).join)
search.jobs << Job.new(title: "Full-stack web developer", posted: 20210420, closed: 20210526, description: Faker::Lorem.paragraphs(number: 5).join)
search.jobs << Job.new(title: "Full-stack web developer", posted: 20210512, closed: 20210610, description: Faker::Lorem.paragraphs(number: 5).join)

job = Job.first
job_2 = Job.second



job.notes << Note.new(content: f_note)
job.notes << Note.new(content: f_note)
job_2.notes << Note.new(content: "Call me maybe.")