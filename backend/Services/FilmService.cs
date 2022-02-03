using FilmManagement.Models;
using System.Collections.Generic;
using FilmManagement.Repositories;
using FilmManagement.Models.Request;

namespace FilmManagement.Services
{
    public class FilmService
    {
        private readonly FilmRepository _filmRepository;
        public FilmService() => _filmRepository = new FilmRepository();

        public BundleResult GetBundleResult(string username)
        {
            return new BundleResult
            {
                Films = GetFilms(),
                Persons = GetPersons(),
                SuggestionFilms = GetFilms(username), // todo-moch
            };
        }

        private IEnumerable<Film> GetFilms(string username = "")
        {
            var resultFromDB = _filmRepository.FetchFilms(username);

            var films = new List<Film>();
            for (var i=0; i<resultFromDB.Count; i++)
            {
                films.Add(new Film
                {
                    Title = resultFromDB[i].Title,
                    ReleaseYear = resultFromDB[i].ReleaseYear,
                    Subordinate = resultFromDB[i].Subordinate,
                    Genre = resultFromDB[i].Genre,

                    Director = resultFromDB[i].Director,
                    Writer = resultFromDB[i].Writer,
                    Producer = resultFromDB[i].Producer,
                    Actor = resultFromDB[i].Actor,

                    Distributor = resultFromDB[i].Distributor,
                    Overview = resultFromDB[i].Overview,
                    Rating = resultFromDB[i].Rating,
                    ImgPath = "film0.jpg",
                });
            }

            return films;
        }

        private IEnumerable<Person> GetPersons()
        {
            var resultFromDB = _filmRepository.FetchPersons();

            var persons = new List<Person>();
            for (var i = 0; i < resultFromDB.Count; i++)
            {
                persons.Add(new Person
                {
                    Name = resultFromDB[i].Name,
                    Dob = resultFromDB[i].Dob,
                    Sex = resultFromDB[i].Sex,
                    Roles = resultFromDB[i].Roles,
                    Films = resultFromDB[i].Films,

                    ImgPath = "person0.jpg",
                });
            }

            return persons;
        }

        public string DeleteFilm(DeletedFilm film)
        {
            var resultFromDB = _filmRepository.DeleteFilm(film);
            return resultFromDB ? "SUCCESS" : "FAILED";
        }
    }
}
