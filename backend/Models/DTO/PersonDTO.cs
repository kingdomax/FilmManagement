﻿namespace FilmManagement.Models.DTO
{
    public class PersonDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Sex { get; set; }
        public string Dob { get; set; }
        public string[] Roles { get; set; }
        public string[] Films { get; set; }
    }
}
