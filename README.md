# FilmManagement

  This WEB API is about Backoffice of Film Managment, which have many features; Show Film/Person, Add Film/Person, Edit Film/Person, Delete Film/Person, Add Film Rating and Show Film suggestion; The application have 3 sections which are Client(HTML Javascript), Sever(.NET C#) and Database(Postgresql PL/pgSQL). All of the logics will be implemented under function in the database.

## Getting Started

Before running the application, there are required programs which need to installed on local computer. 
*Please note that, this application is implemented base on Window OS.*
1. **'pgAdmin 4'** or any IDE that can open Postgresql Database.
2. **'Microsoft Visual Studio 2019'** or newest version.

### Import Tables and Functions to Local Database

1. After extract the **FilmManagement.zip** file, inside folder **FilmManagement** you will see folder **database** which have SQL file call 'db_data' inside.
```
db_data.sql
```
2. Open **'pgAdmin 4'** from the programe menu click on **'Tools>Query Tool'**.
3. At Editoe area, you can find **Open File** icon, click on it and choose **'db_data.sql'**.
4. After file open, click on **Execute** icon (or press 'F5'). Tables and Functions will successfully create.

### Run Server side via Microsoft Visual Studio

1. After extract the **FilmManagement.zip** file, you will see folder **FilmManagement**. inside of it must have .sln file call **FilmManagement.sln**.
```
FilmManagement.sln
```
2. Double click on it will open the project on Microsoft visual studio.
3. Go to file **'FilmRepository.cs'** in **Repositories** folder, and change database username and password to match your own local database.
```
private readonly string _connextionString = "Host=localhost;Username=postgres;Password=admin1234;Database=film";
```
4. Excecute the program (press F5). Terminal will open up with successfully connection.
```
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: ~\FilmManagement\backend
```

### Open Webpage

1. After extract the **FilmManagement.zip** file, inside folder **FilmManagement** you will see folder **frontend** which have HTML file call 'index' inside.
```
index.html
```
2. Double click on it will open the browser with FilmManagment application.


## Testing application with different username

For user features will be controlled by putting the query string **‘?username=value’** which value is an admin1, admin2, admin3, admin4 and admin5.
```
file:~/FilmManagement/frontend/index.html?username=admin1
```

1. **admin1** have rate 5 out of 10 films in the database.
2. **admin2** have rate 5 out of 10 films in the database.
3. **admin3** have rate 5 out of 10 films in the database.
4. **admin4** have rate 8 out of 10 films in the database.
5. **admin5** have rate no film.

