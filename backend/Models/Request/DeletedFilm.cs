namespace FilmManagement.Models.Request
{
    public class DeletedFilm
    {
        public string Title { get; set; }
        public string Subordinate { get; set; }

        public string Director { get; set; }
        public string Writer { get; set; }
        public string Producer { get; set; }
        public string Actor { get; set; }
    }
}
