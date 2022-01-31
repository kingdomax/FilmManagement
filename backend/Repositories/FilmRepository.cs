using Npgsql;
using FilmManagement.Models.DTO;
using System.Collections.Generic;

// https://www.npgsql.org/ (docs)
// https://zetcode.com/csharp/postgresql/ (tutorial)
namespace FilmManagement.Repositories
{
    public class FilmRepository
    {
        private readonly NpgsqlConnection _connection;

        public FilmRepository()
        {
            _connection = new NpgsqlConnection("Host=localhost;Username=postgres;Password=pgadmin1234;Database=film");
            _connection.Open();
        }

        public List<FilmDTO> FetchAllFilms()
        {
            var resultFromDB = new List<FilmDTO>();
            
            using var cmd = new NpgsqlCommand("SELECT * FROM show_film();", _connection);
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                resultFromDB.Add(new FilmDTO
                {
                    Title = !reader.IsDBNull(0) ? reader.GetString(0) : string.Empty,
                    ReleaseYear = !reader.IsDBNull(1) ? reader.GetInt32(1) : 0,
                    Subordinate = !reader.IsDBNull(2) ? reader.GetString(2) : string.Empty,
                    Genre = !reader.IsDBNull(3) ? reader.GetFieldValue<string[]>(3) : new string[0],

                    Director = !reader.IsDBNull(4) ? reader.GetString(4) : string.Empty,
                    Writer = !reader.IsDBNull(5) ? reader.GetString(5) : string.Empty,
                    Producer = !reader.IsDBNull(6) ? reader.GetString(6) : string.Empty,
                    Actor = !reader.IsDBNull(7) ? reader.GetString(7) : string.Empty,

                    Distributor = !reader.IsDBNull(8) ? reader.GetString(8) : string.Empty,
                    Overview = !reader.IsDBNull(9) ? reader.GetString(9) : string.Empty,
                    Rating = !reader.IsDBNull(10) ? reader.GetInt32(10) : -1,
                });
            }

            return resultFromDB;
        }
    }
}
