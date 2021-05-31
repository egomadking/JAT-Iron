Rails.application.routes.draw do
  resources :jobs, only: [:show, :create, :update, :destroy]
  resources :job_searches, only: [:index, :show, :create]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
