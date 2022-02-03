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

        [HttpGet("{username}")] // http://localhost:5000/api/film/Get/admin2
        public BundleResult Get(string username)
        {
            return _filmService.GetBundleResult(username);
        }

        [HttpPost] // http://localhost:5000/api/film/DeleteFilm
        public string DeleteFilm([FromBody] DeletedFilm film)
        {
            return _filmService.DeleteFilm(film);
        }
    }
}
