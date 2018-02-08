class TodosController < ApplicationController
  before_action :set_todo, only: [:update, :destroy]

  def index
    @todos = Todo.all
    @all_todos = @todos
    @status = Todo::FilterStatus::ALL
    if !params[:checked].nil?
      @todos = @todos.where(checked: params[:checked] == "true")
      @status = (params[:checked] == "true") ? Todo::FilterStatus::COMPLETED : Todo::FilterStatus::ACTIVE
    end
  end

  def create
    @todo = Todo.new(todo_params)
    @todo.save!
    redirect_to todos_path
  end

  def update
    @todo.update!(todo_params)
    redirect_to todos_path
  end

  def destroy
    @todo.destroy
    redirect_to todos_url
  end

  def clear_completed
    Todo.where(checked: true).destroy_all
    redirect_to todos_path
  end

  def toggle_all
    ApplicationRecord.transaction do
      Todo.all.each { |todo| todo.update!(checked: !todo.checked) }
    end
    redirect_to todos_path
  end

  private

    def set_todo
      @todo = Todo.find(params[:id])
    end

    def todo_params
      params.require(:todo).permit(:name, :checked)
    end
end
