class StaticPagesController < ApplicationController
  skip_before_action :authorized

  def landing
  end
end
