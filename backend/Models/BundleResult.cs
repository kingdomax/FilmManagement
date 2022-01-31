using System.Collections.Generic;

namespace FilmManagement.Models
{
    public class BundleResult
    {
        public IEnumerable<Film> Films { get; set; }
        public IEnumerable<Person> Person { get; set; }
        public IEnumerable<Film> FilmsSuggestion { get; set; }
    }
}
