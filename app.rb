require 'rubygems'
require 'sinatra'
require 'json'
require 'omniauth'
require 'omniauth-github'
require 'sinatra/activerecord'
require './models/user'
require './models/task_list'
require './models/item'

secrets = YAML.load_file('secrets.yml')

configure do
  set :sessions, true
  set :inline_templates, true
end

use OmniAuth::Builder do
  provider :github, secrets['github_key'], secrets['github_secret']
end

get '/' do
  if session[:authenticated] 
    @user = User.find(session[:user_id])
  end

  erb :index
end
 
get '/auth/:provider/callback' do
  auth = request.env['omniauth.auth']
  @user = User.from_omniauth(auth)
  if !@user.nil?
    session[:user_id] = @user.id
    session[:user_name] = @user.name
    session[:authenticated] = true
    redirect '/'
  else 
    erb "<h1>Can's create session</h1><h3>message:<h3> <pre>#{params}</pre>"
  end
end

get '/auth/failure' do
  erb "<h1>Authentication Failed:</h1><h3>message:<h3> <pre>#{params}</pre>"
end

get '/logout' do
  session[:authenticated] = false
  puts session[:authenticated]
  redirect '/'
end
