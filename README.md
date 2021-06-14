Technologies:

Ruby version => '3.0.1'
Rails version => '6.1.1'
React version => "17.0.2"

Deployed at heroku:
check http://covid-help-desk.herokuapp.com/

React Packages used:
'material-ui' -> theme
'react-query' -> for data fetching and updating
'react-table' -> for showing data in table with filtering
'moment' -> for DateTime format and calculation
"react-toast-notifications" -> for toastr

Gem used:
'activeadmin' -> quick and easy way to perform CURD operations
'devise' -> for superadmin access for admin


to fireup the app:
Clone the repository:
make sure postgres is installed
inside main folder

1. rails db:create --- to create database
2. rails db:migrate --- to migrate database
3. rails db:seed --- to seed default data
4. rails s --- to start server at port 3000
