﻿using FilmManagement.Models;
using FilmManagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace FilmManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmController : ControllerBase
    {
        private readonly FilmService _filmService;
        public FilmController() => _filmService = new FilmService();

        [HttpGet("{username}")]  // http://localhost:5000/api/film/admin2
        public BundleResult Get(string username)
        {
            // todo: need to modify to POST since we need userid for suggestionfilmes
            return _filmService.GetBundleResult(username);
        }

        #region example
        // GET api/<FilmController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<FilmController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<FilmController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<FilmController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        #endregion
    }
}
