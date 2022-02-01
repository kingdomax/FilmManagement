using System.Collections.Generic;

namespace FilmManagement.Models
{
    public class BundleResult
    {
        public IEnumerable<Film> Films { get; set; }
        public IEnumerable<Person> Persons { get; set; }
        public IEnumerable<Film> SuggestionFilms { get; set; }
    }
}
