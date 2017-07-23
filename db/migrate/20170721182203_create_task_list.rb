class CreateTaskList < ActiveRecord::Migration[5.1]
  def change
    create_table :task_lists do |t|
      t.references :users, index: true, foreign_key: true

      t.string :title, null: false
      t.text :description
    end
  end
end
