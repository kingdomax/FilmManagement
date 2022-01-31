using System.Collections.Generic;

namespace FilmManagement.Models.DTO
{
    public class FilmDTO
    {
        public string Title { get; set; }
        public int ReleaseYear { get; set; }
        public string Subordinate { get; set; }
        public string[] Genre { get; set; }

        public string Director { get; set; }
        public string Writer { get; set; }
        public string Producer { get; set; }
        public string Actor { get; set; }

        public string Distributor { get; set; }
        public string Overview { get; set; }
        public int Rating { get; set; } //1-5
    }
}
