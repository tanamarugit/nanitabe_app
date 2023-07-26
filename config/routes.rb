Rails.application.routes.draw do
  get '/home', to: 'home#index'
  get '/maps', to: 'maps#search'
  get '/maps/index', to: 'maps#index'
  get '/maps/random', to: 'maps#random'
  post '/maps/random', to: 'maps#random'
  post '/maps/index', to: 'maps#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
