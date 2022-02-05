using System.Collections.Generic;

namespace FilmManagement.Models
{
    public class Film
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int ReleaseYear { get; set; }
        public string Subordinate { get; set; }
        public IEnumerable<string> Genre { get; set; }

        public string Director { get; set; }
        public string Writer { get; set; }
        public string Producer { get; set; }
        public string Actor { get; set; }

        public string Distributor { get; set; }
        public string Overview { get; set; }
        public int Rating { get; set; } //0-5
        public string ImgPath { get; set; }
    }
}
