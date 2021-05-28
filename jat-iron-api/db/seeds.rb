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

def f_date
  Faker::Date.between(from: 1.month.ago, to: Date.today)
end

def f_date_and_10(date)
  date + 10.days
end

search = JobSearch.create!(name: "test search")

jobs_array = [
  ["Full-stack web developer(2 notes)", "new"],
  ["Front-end web developer(1 note)", "new"],
  ["Web developer II", "applied"],
  ["Jr. Software Engineer", "applied"],
  ["Growth Engineer", "interviewing"],
  ["JavaScript Developer", "interviewing"],
  ["UI Front End Developer", "offer"],
  ["Developer, Worpress", "offer"],
  ["JavaScript Engineer", "accepted"],
  ["React Developer", "rejected"],
  ["Email Front-End Developer", "declined"],
  ["UX Frontend Engineer", "closed"],
  ["Staff UI Engineer" "closed"]
]


jobs_array.each do |job|
  date = f_date
  date_and_10 = date + 10.days
  search.jobs << Job.new(title: job[0],
                      status: job[1],
                      posted: date, 
                      closed: date_and_10, 
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