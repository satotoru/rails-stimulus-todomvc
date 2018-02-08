Rails.application.routes.draw do
  resources :todos do
    collection do
      delete :clear_completed
      put :toggle_all
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
