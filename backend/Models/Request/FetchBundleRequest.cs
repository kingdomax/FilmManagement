namespace FilmManagement.Models.Request
{
    public class FetchBundleRequest
    {
        public int EditedFilmId { get; set; }
        public string[] Username { get; set; }
    }
}
