**Technologies**:

1. Ruby version => '3.0.1'
2. Rails version => '6.1.1'
3. React version => "17.0.2"

Deployed at heroku:

check http://covid-help-desk.herokuapp.com/

React Packages used:
1. 'material-ui' -> theme
2. 'react-query' -> for data fetching and updating
3. 'react-table' -> for showing data in table with filtering
4. 'moment' -> for DateTime format and calculation
5. "react-toast-notifications" -> for toastr

Gem used:
1. 'activeadmin' -> quick and easy way to perform CURD operations
2. 'devise' -> for superadmin access for admin


to fireup the app:

Clone the repository:

make sure postgres is installed

Inside main folder:
1. rails db:create --- to create database
2. rails db:migrate --- to migrate database
3. rails db:seed --- to seed default data
4. rails s --- to start server at port 3000
