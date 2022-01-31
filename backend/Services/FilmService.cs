using FilmManagement.Models;
using System.Collections.Generic;
using FilmManagement.Repositories;

namespace FilmManagement.Services
{
    public class FilmService
    {
        private readonly FilmRepository _filmRepository;
        public FilmService() => _filmRepository = new FilmRepository();

        public BundleResult GetBundleResult()
        {
            return new BundleResult
            {
                Films = GetFilms(),
                Person = GetPerson(),
                FilmsSuggestion = GetFilmsSuggestion(),
            };
        }

        private IEnumerable<Film> GetFilms()
        {
            var films = new List<Film>();
            var resultFromDB = _filmRepository.FetchAllFilms();

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
                    ImgPath = $"film{i%8}.jpg",
                });
            }

            return films;
        }

        private IEnumerable<Person> GetPerson()
        {
            return new List<Person>();
        }

        private IEnumerable<Film> GetFilmsSuggestion()
        {
            return new List<Film>();
        }
    }
}
