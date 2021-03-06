WebsocketRails::EventMap.describe do
  # You can use this file to map incoming events to controller actions.
  # One event can be mapped to any number of controller actions. The
  # actions will be executed in the order they were subscribed.
  #
  # Uncomment and edit the next line to handle the client connected event:
  #   subscribe :client_connected, :to => Controller, :with_method => :method_name
  #
  # Here is an example of mapping namespaced events:
  #   namespace :product do
  #     subscribe :new, :to => ProductController, :with_method => :new_product
  #   end
  # The above will handle an event triggered on the client like `product.new`.

  namespace :game do
    subscribe :connection, :to => GameController, :with_method => :initial_connection
    subscribe :room_connect, :to => GameController, :with_method => :room_connect
    subscribe :info, :to => GameController, :with_method => :info
    subscribe :get_card, :to => GameController, :with_method => :get_card
    subscribe :disconnect, :to => GameController, :with_method => :room_disconnect
    subscribe :ready_game, :to => GameController, :with_method => :ready_game
    subscribe :play_turn, :to => GameController, :with_method => :ngame
  end


end
