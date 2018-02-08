class Todo < ApplicationRecord
  module FilterStatus
    ALL = "All"
    ACTIVE = "Active"
    COMPLETED = "Completed"
  end
end
