﻿using FilmManagement.Models;
using FilmManagement.Models.Request;
using FilmManagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace FilmManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class FilmController : ControllerBase
    {
        private readonly FilmService _filmService;
        public FilmController() => _filmService = new FilmService();

        [HttpPost] // http://localhost:5000/api/film/FetchBundleResult
        public BundleResult FetchBundleResult(FetchBundleRequest bundleRequest)
        {
            return _filmService.GetBundleResult(bundleRequest);
        }

        [HttpPost] // http://localhost:5000/api/film/AddFilm
        public string AddFilm([FromBody] AddedFilm film)
        {
            return _filmService.AddFilm(film);
        }

        [HttpPost] // http://localhost:5000/api/film/AddFilm
        public string AddPerson([FromBody] AddedPerson person)
        {
            return _filmService.AddPerson(person);
        }

        [HttpPost] // http://localhost:5000/api/film/EditFilm
        public string EditFilm([FromBody] EditedFilm film)
        {
            return _filmService.EditFilm(film);
        }

        [HttpPost] // http://localhost:5000/api/film/EditPerson
        public string EditPerson([FromBody] EditedPerson person)
        {
            return _filmService.EditPerson(person);
        }

        [HttpPost] // http://localhost:5000/api/film/DeleteFilm
        public string DeleteFilm([FromBody] DeletedFilm film)
        {
            return _filmService.DeleteFilm(film);
        }

        [HttpPost] // http://localhost:5000/api/film/DeletePerson
        public string DeletePerson([FromBody] DeletedPerson person)
        {
            return _filmService.DeletePerson(person);
        }
    }
}
