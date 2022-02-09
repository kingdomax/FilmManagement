-- Create Table film_storage
CREATE TABLE film_storage (
  film_id SERIAL NOT NULL,
  film_title TEXT,
  film_release INTEGER,
  film_subordinate TEXT,
  film_genre TEXT[],
  film_director TEXT,
  film_writer TEXT,
  film_producer TEXT,
  film_actor TEXT,
  film_distributor TEXT,
  film_overview TEXT,
  film_rating INTEGER,
  username TEXT[],
  PRIMARY KEY (film_id)
);

-- Insert Film Data
INSERT INTO public.film_storage(
	film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating, username)
	VALUES ('The Matrix Resurrections', '2021', NULL ,ARRAY['Sci-fi', 'Action'], 'Lana Wachowski', 'Lana Wachowski', 'James McTeigue', 'Keanu Reeves', 'Warner Bros. Pictures', 'To find out if his reality is a physical or mental construct, Mr. Anderson, aka Neo, will have to choose to follow the white rabbit once more. If he is learned anything, it is that choice.', NULL, NULL)
	,('The Matrix Reloaded', '2003', 'The Matrix Resurrections' ,ARRAY['Sci-fi', 'Action'], 'Lana Wachowski', 'Lana Wachowski', 'Joel Silver', 'Keanu Reeves', 'Warner Bros. Pictures', 'At the Oracle behest, Neo attempts to rescue the Keymaker and realises that to save Zion within 72 hours, he must confront the Architect. Meanwhile, Zion prepares for war against the machines.', NULL, NULL)
	,('The Matrix Revolutions', '2002', 'The Matrix Reloaded' ,ARRAY['Sci-fi', 'Action'], 'Lana Wachowski', 'Lana Wachowski', 'Joel Silver', 'Keanu Reeves', 'Warner Bros. Pictures', 'Neo, humanity only hope of stopping the war and saving Zion, attempts to broker peace between the machines and humans. However, he must first confront his arch-nemesis, the rogue Agent Smith.', NULL, NULL)
	,('The Matrix', '1999', 'The Matrix Revolutions' ,ARRAY['Sci-fi', 'Action'], 'Lana Wachowski', 'Lana Wachowski', 'Joel Silver', 'Keanu Reeves', 'Warner Bros. Pictures', 'Thomas Anderson, a computer programmer, is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.', NULL, NULL)
	,('Kingsman: The Golden Circle', '2017', 'The Kings Man' ,ARRAY['Action', 'Spy', 'Comedy'], 'Matthew Vaughn', 'Matthew Vaughn', 'Matthew Vaughn', 'Colin Firth', '20th Century Fox', 'After the enemies blow up their headquarters, the surviving agents of Kingsman band together with their American counterpart to take down a ruthless drug cartel.', NULL, NULL)
	,('The Kings Man', '2022', NULL ,ARRAY['Action', 'Spy', 'Comedy'], 'Matthew Vaughn', 'Matthew Vaughn', 'Matthew Vaughn', 'Ralph Fiennes', 'Walt Disney Studios Motion Pictures', 'One man must race against time to stop history worst tyrants and criminal masterminds as they get together to plot a war that could wipe out millions of people and destroy humanity.', NULL, NULL)
	,('Kingsman: The Secret Service', '2015', 'Kingsman: The Golden Circle' ,ARRAY['Action', 'Spy', 'Comedy'], 'Matthew Vaughn', 'Matthew Vaughn', 'Matthew Vaughn', 'Colin Firth', '20th Century Fox', 'Gary ''Eggsy'' Unwin faces several challenges when he gets recruited as a secret agent in a secret spy organisation in order to look for Richmond Valentine, an eco-terrorist.', NULL, NULL)
	,('Dark Shadows', '2012', NULL ,ARRAY['Fantasy', 'Comedy', 'Horror'], 'Tim Burton', 'John August', 'Richard D. Zanuck', 'Johnny Depp', 'Warner Bros. Pictures', 'Rich playboy Barnabas earns the wrath of Angelique, a witch, when he breaks her heart. She turns him into a vampire and buries him alive. Two centuries later, Barnabas escapes to settle old scores.', NULL, NULL)
	,('Transcendence', '2014', NULL ,ARRAY['Sci-fi', 'Action', 'Drama'], 'Wally Pfister', 'Wally Pfister', 'Wally Pfister', 'Johnny Depp', 'Warner Bros. Pictures', 'Will desperate wife uploads his consciousness into a quantum computer to save him. He soon begins making groundbreaking discoveries but also displays signs of a dark and hidden motive.', NULL, NULL)
	,('Edward Scissorhands', '1991', NULL ,ARRAY['Fantasy', 'Romance'], 'Tim Burton', 'Tim Burton', 'Denise Di Novi', 'Johnny Depp', '20th Century Fox', 'Edward, a synthetic man with scissor hands, is taken in by Peg, a kindly Avon lady, after the passing of his inventor. Things take a turn for the worse when he is blamed for a crime he did not commit.', NULL, NULL);



-- Create Table film_person
CREATE TABLE film_person (
  person_id SERIAL NOT NULL,
  person_name TEXT,
  person_dob TEXT,
  person_sex TEXT,
  person_roles TEXT[],
  relate_film TEXT[],  
  PRIMARY KEY (person_id)
);

-- Insert Person Data
INSERT INTO public.film_person(
	person_name, person_dob, person_sex, person_roles, relate_film)
	VALUES ('Lana Wachowski', '6/21/1965', 'F', ARRAY['Director', 'Writer'], ARRAY['The Matrix Resurrections', 'The Matrix Reloaded','The Matrix Revolutions','The Matrix'])
	,('James McTeigue', '12/29/1967', 'M', ARRAY['Producer'], ARRAY['The Matrix Resurrections'])
	,('Keanu Reeves', '9/2/1964', 'M', ARRAY['Main Actor'], ARRAY['The Matrix Resurrections', 'The Matrix Reloaded','The Matrix Revolutions','The Matrix'])
	,('Joel Silver', '7/14/1952', 'M', ARRAY['Producer'], ARRAY['The Matrix Reloaded','The Matrix Revolutions','The Matrix'])
	,('Matthew Vaughn', '3/7/1971', 'M', ARRAY['Director', 'Writer', 'Producer'], ARRAY['Kingsman: The Golden Circle', 'The Kings Man','Kingsman: The Secret Service'])
	,('Colin Firth', '9/10/1960', 'M', ARRAY['Main Actor'], ARRAY['Kingsman: The Golden Circle'])
	,('Ralph Fiennes', '12/22/1962', 'M', ARRAY['Main Actor'], ARRAY['The Kings Man'])
	,('Tim Burton', '8/25/1958', 'M', ARRAY['Director', 'Writer'], ARRAY['Dark Shadows', 'Edward Scissorhands'])
	,('John August', '8/4/1970', 'M', ARRAY['Writer'], ARRAY['Dark Shadows'])
	,('Wally Pfister', '7/8/1961', 'M', ARRAY['Director', 'Writer', 'Producer'], ARRAY['Transcendence'])
	,('Denise Di Novi', '3/21/1956', 'F', ARRAY['Producer'], ARRAY['Edward Scissorhands'])
	,('Johnny Depp', '6/9/1963', 'M', ARRAY['Main Actor'], ARRAY['Dark Shadows', 'Transcendence','Edward Scissorhands'])
	,('Richard D. Zanuck', '12/13/1934', 'M', ARRAY['Producer'], ARRAY['Dark Shadows']);
