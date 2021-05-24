Rails.application.routes.draw do
  resources :notes
  resources :jobs
  resources :job_searches
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
