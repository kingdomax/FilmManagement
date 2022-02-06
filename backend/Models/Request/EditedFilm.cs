namespace FilmManagement.Models.Request
{
    public class EditedFilm
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int ReleaseYear { get; set; }
        public string Subordinate { get; set; }
        public string[] Genre { get; set; }
        public string Distributor { get; set; }
        public string Overview { get; set; }
        
        public int Rating { get; set; } //0-5
        public string[] Username { get; set; }
    }
}
