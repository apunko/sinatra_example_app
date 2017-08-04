class AddTimestampsToTaskList < ActiveRecord::Migration[5.1]
  def change
    add_column :task_lists, :created_at, :datetime
    add_column :task_lists, :updated_at, :datetime
  end
end
