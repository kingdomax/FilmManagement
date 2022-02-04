namespace FilmManagement.Models.Request
{
    public class AddedFilm
    {
        public string Title { get; set; }
        public int ReleaseYear { get; set; }
        public string Subordinate { get; set; }
        public string[] Genre { get; set; }
        public string Distributor { get; set; }
        public string Overview { get; set; }
    }
}
