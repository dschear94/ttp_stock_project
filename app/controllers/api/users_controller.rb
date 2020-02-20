class Api::UsersController < ApplicationController

  def show
    @user = User.find_by(email: params[:id])

    if @user
        render "api/users/show"
    else
        render json: ["no user found"], status: 404
    end

  end

    def create
        @user = User.new(user_params)
        if @user.save
            login(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end

    end

    def update
        @user = User.find_by(email: params[:user][:email])
        @user.update!(user_params)
        render "api/users/show"
    end

    private

    def user_params
        params.require(:user).permit(
            :name,
            :email, 
            :password, 
            :balance
        )
    end
end
