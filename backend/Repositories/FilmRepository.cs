using Npgsql;
using FilmManagement.Models.DTO;
using System.Collections.Generic;
using FilmManagement.Models.Request;

// https://www.npgsql.org/ (docs)
// https://zetcode.com/csharp/postgresql/ (tutorial)
namespace FilmManagement.Repositories
{
    public class FilmRepository
    {
        private readonly string _connextionString = "Host=localhost;Username=postgres;Password=pgadmin1234;Database=film";

        public List<FilmDTO> FetchFilms(FetchBundleRequest bundleRequest)
        {
            using var connection = new NpgsqlConnection(_connextionString);
            connection.Open();

            using var command = new NpgsqlCommand("SELECT * FROM show_film();", connection);
            if (bundleRequest != null)
            {
                command.CommandText = "SELECT * FROM show_suggestion(@editedFilmId, @username);";
                command.Parameters.AddWithValue("@editedFilmId", bundleRequest.EditedFilmId);
                command.Parameters.AddWithValue("@username", bundleRequest.Username);
            }  
            using var reader = command.ExecuteReader();

            var resultFromDB = new List<FilmDTO>();
            while (reader.Read())
            {
                resultFromDB.Add(new FilmDTO
                {
                    Id = !reader.IsDBNull(0) ? reader.GetInt32(0) : 0,
                    Title = !reader.IsDBNull(1) ? reader.GetString(1) : string.Empty,
                    ReleaseYear = !reader.IsDBNull(2) ? reader.GetInt32(2) : 0,
                    Subordinate = !reader.IsDBNull(3) ? reader.GetString(3) : string.Empty,
                    Genre = !reader.IsDBNull(4) ? reader.GetFieldValue<string[]>(4) : new string[0],

                    Director = !reader.IsDBNull(5) ? reader.GetString(5) : string.Empty,
                    Writer = !reader.IsDBNull(6) ? reader.GetString(6) : string.Empty,
                    Producer = !reader.IsDBNull(7) ? reader.GetString(7) : string.Empty,
                    Actor = !reader.IsDBNull(8) ? reader.GetString(8) : string.Empty,

                    Distributor = !reader.IsDBNull(9) ? reader.GetString(9) : string.Empty,
                    Overview = !reader.IsDBNull(10) ? reader.GetString(10) : string.Empty,
                    Rating = !reader.IsDBNull(11) ? reader.GetInt32(11) : 0,
                });
            }
            return resultFromDB;
        }

        public List<PersonDTO> FetchPersons()
        {
            using var connection = new NpgsqlConnection(_connextionString);
            connection.Open();
            
            using var command = new NpgsqlCommand("SELECT * FROM show_person();", connection);
            using var reader = command.ExecuteReader();

            var resultFromDB = new List<PersonDTO>();
            while (reader.Read())
            {
                resultFromDB.Add(new PersonDTO
                {
                    Id = !reader.IsDBNull(0) ? reader.GetInt32(0) : 0,
                    Name = !reader.IsDBNull(1) ? reader.GetString(1) : string.Empty,
                    Dob = !reader.IsDBNull(2) ? reader.GetString(2) : string.Empty,
                    Sex = !reader.IsDBNull(3) ? reader.GetString(3) : string.Empty,
                    Roles = !reader.IsDBNull(4) ? reader.GetFieldValue<string[]>(4) : new string[0],
                    Films = !reader.IsDBNull(5) ? reader.GetFieldValue<string[]>(5) : new string[0],
                });
            }
            return resultFromDB;
        }

        public bool AddFilm(AddedFilm film)
        {
            using var connection = new NpgsqlConnection(_connextionString);
            connection.Open();

            using var cmd = new NpgsqlCommand("SELECT * FROM add_film(@title, @release, @subordinate, @genre, @distributor, @overview)", connection);
            cmd.Parameters.AddWithValue("@title", film.Title);
            cmd.Parameters.AddWithValue("@release", film.ReleaseYear);
            cmd.Parameters.AddWithValue("@subordinate", film.Subordinate);
            cmd.Parameters.AddWithValue("@genre", film.Genre);
            cmd.Parameters.AddWithValue("@distributor", film.Distributor);
            cmd.Parameters.AddWithValue("@overview", film.Overview);
            using var reader = cmd.ExecuteReader();

            reader.Read();
            return !reader.IsDBNull(0) ? reader.GetBoolean(0) : false;
        }

        public bool AddPerson(AddedPerson person)
        {
            using var connection = new NpgsqlConnection(_connextionString);
            connection.Open();

            using var cmd = new NpgsqlCommand("SELECT * FROM add_person(@name, @dob, @sex, @roles, @films)", connection);
            cmd.Parameters.AddWithValue("@name", person.Name);
            cmd.Parameters.AddWithValue("@dob", person.Dob);
            cmd.Parameters.AddWithValue("@sex", person.Sex);
            cmd.Parameters.AddWithValue("@roles", person.Roles);
            cmd.Parameters.AddWithValue("@films", person.Films);
            using var reader = cmd.ExecuteReader();

            reader.Read();
            return !reader.IsDBNull(0) ? reader.GetBoolean(0) : false;
        }

        public bool EditFilm(EditedFilm film)
        {
            using var connection = new NpgsqlConnection(_connextionString);
            connection.Open();

            using var cmd = new NpgsqlCommand("SELECT * FROM edit_film(@id, @title, @release, @subordinate, @genre, @distributor, @overview, @rating, @username)", connection);
            cmd.Parameters.AddWithValue("@id", film.Id);
            cmd.Parameters.AddWithValue("@title", film.Title);
            cmd.Parameters.AddWithValue("@release", film.ReleaseYear);
            cmd.Parameters.AddWithValue("@subordinate", film.Subordinate);
            cmd.Parameters.AddWithValue("@genre", film.Genre);
            cmd.Parameters.AddWithValue("@distributor", film.Distributor);
            cmd.Parameters.AddWithValue("@overview", film.Overview);
            cmd.Parameters.AddWithValue("@rating", film.Rating);
            cmd.Parameters.AddWithValue("@username", film.Username);
            using var reader = cmd.ExecuteReader();

            reader.Read();
            return !reader.IsDBNull(0) ? reader.GetBoolean(0) : false;
        }

        public bool EditPerson(EditedPerson person)
        {
            using var connection = new NpgsqlConnection(_connextionString);
            connection.Open();

            using var cmd = new NpgsqlCommand("SELECT * FROM edit_person(@id, @name, @dob, @sex, @roles, @films)", connection);
            cmd.Parameters.AddWithValue("@id", person.Id);
            cmd.Parameters.AddWithValue("@name", person.Name);
            cmd.Parameters.AddWithValue("@dob", person.Dob);
            cmd.Parameters.AddWithValue("@sex", person.Sex);
            cmd.Parameters.AddWithValue("@roles", person.Roles);
            cmd.Parameters.AddWithValue("@films", person.Films);
            using var reader = cmd.ExecuteReader();

            reader.Read();
            return !reader.IsDBNull(0) ? reader.GetBoolean(0) : false;
        }

        public bool DeleteFilm(DeletedFilm film)
        {
            using var connection = new NpgsqlConnection(_connextionString);
            connection.Open();

            using var cmd = new NpgsqlCommand("SELECT * FROM remove_film(@title, @subordinate, @director, @writer, @producer, @actor)", connection);
            cmd.Parameters.AddWithValue("@title", film.Title);
            cmd.Parameters.AddWithValue("@subordinate", film.Subordinate);
            cmd.Parameters.AddWithValue("@director", film.Director);
            cmd.Parameters.AddWithValue("@writer", film.Writer);
            cmd.Parameters.AddWithValue("@producer", film.Producer);
            cmd.Parameters.AddWithValue("@actor", film.Actor);
            using var reader = cmd.ExecuteReader();

            reader.Read();
            return !reader.IsDBNull(0) ? reader.GetBoolean(0) : false;
        }

        public bool DeletePerson(DeletedPerson person)
        {
            using var connection = new NpgsqlConnection(_connextionString);
            connection.Open();

            using var cmd = new NpgsqlCommand("SELECT * FROM remove_person(@name, @films)", connection);
            cmd.Parameters.AddWithValue("@name", person.Name);
            cmd.Parameters.AddWithValue("@films", person.Films);
            using var reader = cmd.ExecuteReader();

            reader.Read();
            return !reader.IsDBNull(0) ? reader.GetBoolean(0) : false;
        }
    }
}
