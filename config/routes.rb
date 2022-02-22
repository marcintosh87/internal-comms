Rails.application.routes.draw do
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

 
  resources :news_comments
  resources :event_comments
  resources :event_posts
  resources :news_posts
  resources :users
  resources :departments
  resources :organizations

  get '/me', to: 'users#me'

  # sessions
  post '/login', to: 'sessions#login'
  delete '/logout', to: 'sessions#logout'
 
   # filters
   get '/news_date', to: 'news_posts#date'

# this will allow for the deployment to us react
get '*path',
to: 'fallback#index',
constraints: ->(req) { !req.xhr? && req.format.html? }
end
