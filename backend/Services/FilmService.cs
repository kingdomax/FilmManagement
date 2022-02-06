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

        public BundleResult GetBundleResult(FetchBundleRequest bundleRequest)
        {
            return new BundleResult
            {
                Films = GetFilms(null),
                Persons = GetPersons(),
                SuggestionFilms = GetFilms(bundleRequest),
            };
        }

        private IEnumerable<Film> GetFilms(FetchBundleRequest bundleRequest)
        {
            var resultFromDB = _filmRepository.FetchFilms(bundleRequest);

            var films = new List<Film>();
            for (var i=0; i<resultFromDB.Count; i++)
            {
                films.Add(new Film
                {
                    Id = resultFromDB[i].Id,
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
                    Id = resultFromDB[i].Id,
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

        public string AddFilm(AddedFilm film)
        {
            var resultFromDB = _filmRepository.AddFilm(film);
            return resultFromDB ? "SUCCESS" : "FAILED";
        }

        public string AddPerson(AddedPerson person)
        {
            var resultFromDB = _filmRepository.AddPerson(person);
            return resultFromDB ? "SUCCESS" : "FAILED";
        }

        public string EditFilm(EditedFilm film)
        {
            var resultFromDB = _filmRepository.EditFilm(film);
            return resultFromDB ? "SUCCESS" : "FAILED";
        }

        public string EditPerson(EditedPerson person)
        {
            var resultFromDB = _filmRepository.EditPerson(person);
            return resultFromDB ? "SUCCESS" : "FAILED";
        }

        public string DeleteFilm(DeletedFilm film)
        {
            var resultFromDB = _filmRepository.DeleteFilm(film);
            return resultFromDB ? "SUCCESS" : "FAILED";
        }

        public string DeletePerson(DeletedPerson person)
        {
            var resultFromDB = _filmRepository.DeletePerson(person);
            return resultFromDB ? "SUCCESS" : "FAILED";
        }
    }
}
