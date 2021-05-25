def f_recruiter
  Faker::Name.name
end

def f_email
  Faker::Internet.email
end

def f_phone
  Faker::PhoneNumber.phone_number
end

def f_description
  Faker::Lorem.paragraphs(number: 5).join
end

def f_note
  Faker::Lorem.sentences(number: 2).join
end

search = JobSearch.create!(name: "test search")

job_titles = ["Full-stack web developer","Front-end web developer","Web developer II","Jr. Software Engineer"]


job_titles.each do |job|
  search.jobs << Job.new(title: job, 
                      posted: 20210501, 
                      closed: 20210530, 
                      description: f_description, 
                      recruiter_name: f_recruiter, 
                      recruiter_phone: f_phone, 
                      recruiter_email: f_email, )
end

job = Job.first
job_2 = Job.second



job.notes << Note.new(content: f_note)
job.notes << Note.new(content: f_note)
job_2.notes << Note.new(content: "Call me maybe.")