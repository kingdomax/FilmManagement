using System.Collections.Generic;

namespace FilmManagement.Models
{
    public class Person
    {
        public string Name { get; set; }
        public string Sex { get; set; }
        public string Dob { get; set; }
        public IEnumerable<string> Roles { get; set; }
        public IEnumerable<string> Films { get; set; }

        public string ImgPath { get; set; }
    }
}
