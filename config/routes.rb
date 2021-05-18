Rails.application.routes.draw do
  scope 'api' do
    controller :stories do
      get 'stories' => :index
      post 'stories' => :create
      get 'stories/:id' => :show
      get 'my-stories' => :my
      delete 'stories/:id' => :destroy
    end

    controller :chapters do
      post 'stories/:id/chapters' => :create
      get 'stories/:id/chapters/:chapter_id' => :show
      delete 'stories/:id/chapters/:chapter_id' => :destroy
    end
    
    resource :users, only: [:create]
    post '/login', to: 'users#login'
    get '/auto_login', to: 'users#auto_login'
    match '*path', via: :all, to: proc { [404, {}, ['']] }
  end
  root to: 'static_pages#landing'
  get '/', to: redirect('/app/home')
  get 'app/*path', to: 'static_pages#landing', via: :all
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
