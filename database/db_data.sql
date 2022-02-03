--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-02-03 19:11:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 230 (class 1255 OID 49409)
-- Name: add_film(text, integer, text, text[], text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.add_film(title text, release integer, subordinate text, genre text[], distributor text, overview text) RETURNS boolean
    LANGUAGE plpgsql
    AS $_$

BEGIN

IF (SELECT EXISTS(SELECT 1 FROM public.film_storage WHERE film_title = title)) THEN
	RETURN FALSE;
ELSE	
	INSERT INTO public.film_storage (film_title, film_release, film_subordinate, film_genre, film_distributor, film_overview)
	VALUES ($1, $2, $3, $4, $5, $6);
	RETURN TRUE;
END IF;

END;

$_$;


ALTER FUNCTION public.add_film(title text, release integer, subordinate text, genre text[], distributor text, overview text) OWNER TO postgres;

--
-- TOC entry 225 (class 1255 OID 49368)
-- Name: add_person(text, text, text, text[], text[]); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.add_person(name text, dob text, sex text, roles text[], films text[]) RETURNS boolean
    LANGUAGE plpgsql
    AS $_$

DECLARE
 role  TEXT;
 film TEXT;

BEGIN

IF (SELECT EXISTS(SELECT 1 FROM public.film_person WHERE person_name = name)) THEN
	RETURN FALSE;
ELSE	
	INSERT INTO public.film_person (person_name, person_dob, person_sex, person_roles, relate_film)
	VALUES ($1, $2, $3, $4, $5);

	FOREACH film IN ARRAY films
	LOOP
		FOREACH role IN ARRAY roles
		LOOP
			CASE role
			WHEN 'Director' THEN
				UPDATE public.film_storage 
				SET film_director = $1
				WHERE film_title = film;
			WHEN 'Writer' THEN	
				UPDATE public.film_storage 
				SET film_writer = $1
				WHERE film_title = film;
			WHEN 'Producer' THEN	
				UPDATE public.film_storage 
				SET film_producer = $1
				WHERE film_title = film;
			WHEN 'Main Actor' THEN	
				UPDATE public.film_storage 
				SET film_actor = $1
				WHERE film_title = film;
			ELSE
				EXIT;
			END CASE;
		END LOOP;
	END LOOP;
	RETURN TRUE;
END IF;

END;

$_$;


ALTER FUNCTION public.add_person(name text, dob text, sex text, roles text[], films text[]) OWNER TO postgres;

--
-- TOC entry 229 (class 1255 OID 49406)
-- Name: edit_film(integer, text, integer, text, text[], text, text, integer, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.edit_film(id integer, title text, release integer, subordinate text, genre text[], distributor text, overview text, rating integer, username text) RETURNS boolean
    LANGUAGE plpgsql
    AS $_$

BEGIN

UPDATE public.film_storage 
SET film_title = $2,
	film_release = $3,
	film_subordinate = $4,
	film_genre = $5,
	film_distributor = $6,
	film_overview = $7,
	film_rating = $8,
	username = $9
WHERE film_id = $1;
RETURN TRUE;

END;

$_$;


ALTER FUNCTION public.edit_film(id integer, title text, release integer, subordinate text, genre text[], distributor text, overview text, rating integer, username text) OWNER TO postgres;

--
-- TOC entry 227 (class 1255 OID 49373)
-- Name: edit_person(integer, text, text, text, text[], text[]); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.edit_person(id integer, name text, dob text, sex text, roles text[], films text[]) RETURNS boolean
    LANGUAGE plpgsql
    AS $_$

DECLARE
 role  TEXT;
 film TEXT;
 
BEGIN

UPDATE public.film_person 
SET person_name = $2,
	person_dob = $3,
	person_sex = $4,
	person_roles = $5,
	relate_film = $6
WHERE person_id = $1;

FOREACH film IN ARRAY films
	LOOP
		FOREACH role IN ARRAY roles
		LOOP
			CASE role
			WHEN 'Director' THEN
				UPDATE public.film_storage 
				SET film_director = $1
				WHERE film_title = film;
			WHEN 'Writer' THEN	
				UPDATE public.film_storage 
				SET film_writer = $1
				WHERE film_title = film;
			WHEN 'Producer' THEN	
				UPDATE public.film_storage 
				SET film_producer = $1
				WHERE film_title = film;
			WHEN 'Main Actor' THEN	
				UPDATE public.film_storage 
				SET film_actor = $1
				WHERE film_title = film;
			ELSE
				EXIT;
			END CASE;
		END LOOP;
	END LOOP;
	RETURN TRUE;
	
END;

$_$;


ALTER FUNCTION public.edit_person(id integer, name text, dob text, sex text, roles text[], films text[]) OWNER TO postgres;

--
-- TOC entry 228 (class 1255 OID 49408)
-- Name: remove_film(text, text, text, text, text, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.remove_film(title text, subordinate text, director text, writer text, producer text, actor text) RETURNS boolean
    LANGUAGE plpgsql
    AS $_$

BEGIN

IF director IS NOT NULL THEN
	DELETE FROM public.film_person
	WHERE person_name = $3;
	
	UPDATE public.film_storage
	SET film_director = NULL
	WHERE film_director = $3;
	
	UPDATE public.film_storage
	SET film_writer = NULL
	WHERE film_writer = $3;
	
	UPDATE public.film_storage
	SET film_producer = NULL
	WHERE film_producer = $3;
	
	UPDATE public.film_storage
	SET film_actor = NULL
	WHERE film_actor = $3;
END IF; 
	
IF writer IS NOT NULL THEN
 	DELETE FROM public.film_person
 	WHERE person_name = $4;
	
	UPDATE public.film_storage
	SET film_director = NULL
	WHERE film_director = $4;
	
	UPDATE public.film_storage
	SET film_writer = NULL
	WHERE film_writer = $4;
	
	UPDATE public.film_storage
	SET film_producer = NULL
	WHERE film_producer = $4;
	
	UPDATE public.film_storage
	SET film_actor = NULL
	WHERE film_actor = $4;
END IF; 
	
IF producer IS NOT NULL THEN
 	DELETE FROM public.film_person
 	WHERE person_name = $5;
	
	UPDATE public.film_storage
	SET film_director = NULL
	WHERE film_director = $5;
	
	UPDATE public.film_storage
	SET film_writer = NULL
	WHERE film_writer = $5;
	
	UPDATE public.film_storage
	SET film_producer = NULL
	WHERE film_producer = $5;
	
	UPDATE public.film_storage
	SET film_actor = NULL
	WHERE film_actor = $5;
END IF; 
	
IF actor IS NOT NULL THEN
	DELETE FROM public.film_person
 	WHERE person_name = $6;
	
	UPDATE public.film_storage
	SET film_director = NULL
	WHERE film_director = $6;
	
	UPDATE public.film_storage
	SET film_writer = NULL
	WHERE film_writer = $6;
	
	UPDATE public.film_storage
	SET film_producer = NULL
	WHERE film_producer = $6;
	
	UPDATE public.film_storage
	SET film_actor = NULL
	WHERE film_actor = $6;
END IF; 

DELETE FROM public.film_storage 
WHERE film_title = $1;

DELETE FROM public.film_storage 
WHERE film_title = $2;

RETURN TRUE;

END;

$_$;


ALTER FUNCTION public.remove_film(title text, subordinate text, director text, writer text, producer text, actor text) OWNER TO postgres;

--
-- TOC entry 226 (class 1255 OID 49372)
-- Name: remove_person(text, text[]); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.remove_person(name text, films text[]) RETURNS boolean
    LANGUAGE plpgsql
    AS $_$

DECLARE
 film TEXT;
 
BEGIN

DELETE FROM public.film_person
WHERE person_name = $1;

FOREACH film IN ARRAY films
LOOP
	DELETE FROM public.film_storage
	WHERE film_director = $1;

	DELETE FROM public.film_storage
	WHERE film_writer = $1;

	DELETE FROM public.film_storage
	WHERE film_producer = $1;

	DELETE FROM public.film_storage
	WHERE film_actor = $1;
END LOOP;

RETURN TRUE;

END;

$_$;


ALTER FUNCTION public.remove_person(name text, films text[]) OWNER TO postgres;

--
-- TOC entry 231 (class 1255 OID 49311)
-- Name: show_film(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.show_film() RETURNS TABLE(title text, release integer, subordinate text, genre text[], director text, writer text, producer text, actor text, distributor text, overview text, rating integer)
    LANGUAGE plpgsql
    AS $$

BEGIN

RETURN QUERY
SELECT film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating FROM public.film_storage 
ORDER BY film_release DESC;

END;

$$;


ALTER FUNCTION public.show_film() OWNER TO postgres;

--
-- TOC entry 213 (class 1255 OID 49328)
-- Name: show_person(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.show_person() RETURNS TABLE(name text, dob text, sex text, roles text[], films text[])
    LANGUAGE plpgsql
    AS $$

BEGIN

RETURN QUERY
SELECT person_name, person_dob, person_sex, person_roles, relate_film FROM public.film_person
ORDER BY person_name DESC;

END;

$$;


ALTER FUNCTION public.show_person() OWNER TO postgres;

--
-- TOC entry 232 (class 1255 OID 49386)
-- Name: show_suggestion(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.show_suggestion(name text) RETURNS TABLE(title text, release integer, subordinate text, genres text[], director text, writer text, producer text, actor text, distributor text, overview text, rating integer)
    LANGUAGE plpgsql
    AS $_$

DECLARE
 genres TEXT[];
 genre TEXT;

BEGIN

IF (SELECT EXISTS(SELECT 1 FROM public.film_storage WHERE username = name)) THEN
	genres := (SELECT film_storage.film_genre FROM public.film_storage WHERE film_storage.username = name FETCH FIRST ROW ONLY);

	FOREACH genre IN ARRAY genres
	LOOP
		CASE genre
		WHEN 'Romance' THEN
			RETURN QUERY
			SELECT film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating FROM public.film_storage 
			WHERE 'Romance' = ANY(film_genre) AND film_rating IS NULL
			ORDER BY film_release DESC;
		WHEN 'Action' THEN
			RETURN QUERY
			SELECT film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating FROM public.film_storage 
			WHERE 'Action' = ANY(film_genre) AND film_rating IS NULL
			ORDER BY film_release DESC;				
		WHEN 'Sci-fi' THEN
			RETURN QUERY
			SELECT film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating FROM public.film_storage 
			WHERE 'Sci-fi' = ANY(film_genre) AND film_rating IS NULL
			ORDER BY film_release DESC;			
		WHEN 'Fantasy' THEN
			RETURN QUERY
			SELECT film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating FROM public.film_storage 
			WHERE 'Fantasy' = ANY(film_genre) AND film_rating IS NULL
			ORDER BY film_release DESC;	
		WHEN 'Spy' THEN
			RETURN QUERY
			SELECT film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating FROM public.film_storage 
			WHERE 'Spy' = ANY(film_genre) AND film_rating IS NULL
			ORDER BY film_release DESC;				
		WHEN 'Comedy' THEN
			RETURN QUERY
			SELECT film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating FROM public.film_storage 
			WHERE 'Comedy' = ANY(film_genre) AND film_rating IS NULL
			ORDER BY film_release DESC;			
		WHEN 'Drama' THEN
			RETURN QUERY
			SELECT film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating FROM public.film_storage 
			WHERE 'Drama' = ANY(film_genre) AND film_rating IS NULL
			ORDER BY film_release DESC;		
		WHEN 'Horror' THEN
			RETURN QUERY
			SELECT film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating FROM public.film_storage 
			WHERE 'Horror' = ANY(film_genre) AND film_rating IS NULL
			ORDER BY film_release DESC;	
		ELSE
			EXIT;
		END CASE;	
	END LOOP;
ELSE
	RETURN QUERY
	SELECT * FROM public.film_storage
	WHERE username = $1;
END IF;

END;

$_$;


ALTER FUNCTION public.show_suggestion(name text) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 49397)
-- Name: film_person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.film_person (
    person_id integer NOT NULL,
    person_name text,
    person_dob text,
    person_sex text,
    person_roles text[],
    relate_film text[]
);


ALTER TABLE public.film_person OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 49396)
-- Name: film_person_person_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.film_person_person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.film_person_person_id_seq OWNER TO postgres;

--
-- TOC entry 3332 (class 0 OID 0)
-- Dependencies: 209
-- Name: film_person_person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.film_person_person_id_seq OWNED BY public.film_person.person_id;


--
-- TOC entry 212 (class 1259 OID 49411)
-- Name: film_storage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.film_storage (
    film_id integer NOT NULL,
    film_title text,
    film_release integer,
    film_subordinate text,
    film_genre text[],
    film_director text,
    film_writer text,
    film_producer text,
    film_actor text,
    film_distributor text,
    film_overview text,
    film_rating integer,
    username text
);


ALTER TABLE public.film_storage OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 49410)
-- Name: film_storage_film_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.film_storage_film_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.film_storage_film_id_seq OWNER TO postgres;

--
-- TOC entry 3333 (class 0 OID 0)
-- Dependencies: 211
-- Name: film_storage_film_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.film_storage_film_id_seq OWNED BY public.film_storage.film_id;


--
-- TOC entry 3178 (class 2604 OID 49400)
-- Name: film_person person_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.film_person ALTER COLUMN person_id SET DEFAULT nextval('public.film_person_person_id_seq'::regclass);


--
-- TOC entry 3179 (class 2604 OID 49414)
-- Name: film_storage film_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.film_storage ALTER COLUMN film_id SET DEFAULT nextval('public.film_storage_film_id_seq'::regclass);


--
-- TOC entry 3324 (class 0 OID 49397)
-- Dependencies: 210
-- Data for Name: film_person; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.film_person (person_id, person_name, person_dob, person_sex, person_roles, relate_film) VALUES (1, 'Lana Wachowski', '6/21/1965', 'F', '{Director,Writer}', '{"The Matrix Resurrections","The Matrix Reloaded","The Matrix Revolutions","The Matrix"}');
INSERT INTO public.film_person (person_id, person_name, person_dob, person_sex, person_roles, relate_film) VALUES (2, 'James McTeigue', '12/29/1967', 'M', '{Producer}', '{"The Matrix Resurrections"}');
INSERT INTO public.film_person (person_id, person_name, person_dob, person_sex, person_roles, relate_film) VALUES (3, 'Keanu Reeves', '9/2/1964', 'M', '{"Main Actor"}', '{"The Matrix Resurrections","The Matrix Reloaded","The Matrix Revolutions","The Matrix"}');
INSERT INTO public.film_person (person_id, person_name, person_dob, person_sex, person_roles, relate_film) VALUES (4, 'Joel Silver', '7/14/1952', 'M', '{Producer}', '{"The Matrix Reloaded","The Matrix Revolutions","The Matrix"}');
INSERT INTO public.film_person (person_id, person_name, person_dob, person_sex, person_roles, relate_film) VALUES (5, 'Matthew Vaughn', '3/7/1971', 'M', '{Director,Writer,Producer}', '{"Kingsman: The Golden Circle","The Kings Man","Kingsman: The Secret Service"}');
INSERT INTO public.film_person (person_id, person_name, person_dob, person_sex, person_roles, relate_film) VALUES (6, 'Colin Firth', '9/10/1960', 'M', '{"Main Actor"}', '{"Kingsman: The Golden Circle"}');
INSERT INTO public.film_person (person_id, person_name, person_dob, person_sex, person_roles, relate_film) VALUES (7, 'Ralph Fiennes', '12/22/1962', 'M', '{"Main Actor"}', '{"The Kings Man"}');
INSERT INTO public.film_person (person_id, person_name, person_dob, person_sex, person_roles, relate_film) VALUES (8, 'Tim Burton', '8/25/1958', 'M', '{Director,Writer}', '{"Dark Shadows","Edward Scissorhands"}');
INSERT INTO public.film_person (person_id, person_name, person_dob, person_sex, person_roles, relate_film) VALUES (9, 'John August', '8/4/1970', 'M', '{Writer}', '{"Dark Shadows"}');
INSERT INTO public.film_person (person_id, person_name, person_dob, person_sex, person_roles, relate_film) VALUES (10, 'Wally Pfister', '7/8/1961', 'M', '{Director,Writer,Producer}', '{Transcendence}');
INSERT INTO public.film_person (person_id, person_name, person_dob, person_sex, person_roles, relate_film) VALUES (11, 'Denise Di Novi', '3/21/1956', 'F', '{Producer}', '{"Edward Scissorhands"}');
INSERT INTO public.film_person (person_id, person_name, person_dob, person_sex, person_roles, relate_film) VALUES (12, 'Johnny Depp', '6/9/1963', 'M', '{"Main Actor"}', '{"Dark Shadows",Transcendence,"Edward Scissorhands"}');
INSERT INTO public.film_person (person_id, person_name, person_dob, person_sex, person_roles, relate_film) VALUES (13, 'Richard D. Zanuck', '12/13/1934', 'M', '{Producer}', '{"Dark Shadows"}');


--
-- TOC entry 3326 (class 0 OID 49411)
-- Dependencies: 212
-- Data for Name: film_storage; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.film_storage (film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating, username) VALUES (1, 'The Matrix Resurrections', 2021, NULL, '{Sci-fi,Action}', 'Lana Wachowski', 'Lana Wachowski', 'James McTeigue', 'Keanu Reeves', 'Warner Bros. Pictures', 'To find out if his reality is a physical or mental construct, Mr. Anderson, aka Neo, will have to choose to follow the white rabbit once more. If he is learned anything, it is that choice.', NULL, NULL);
INSERT INTO public.film_storage (film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating, username) VALUES (2, 'The Matrix Reloaded', 2003, 'The Matrix Resurrections', '{Sci-fi,Action}', 'Lana Wachowski', 'Lana Wachowski', 'Joel Silver', 'Keanu Reeves', 'Warner Bros. Pictures', 'At the Oracle behest, Neo attempts to rescue the Keymaker and realises that to save Zion within 72 hours, he must confront the Architect. Meanwhile, Zion prepares for war against the machines.', NULL, NULL);
INSERT INTO public.film_storage (film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating, username) VALUES (3, 'The Matrix Revolutions', 2002, 'The Matrix Reloaded', '{Sci-fi,Action}', 'Lana Wachowski', 'Lana Wachowski', 'Joel Silver', 'Keanu Reeves', 'Warner Bros. Pictures', 'Neo, humanity only hope of stopping the war and saving Zion, attempts to broker peace between the machines and humans. However, he must first confront his arch-nemesis, the rogue Agent Smith.', NULL, NULL);
INSERT INTO public.film_storage (film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating, username) VALUES (4, 'The Matrix', 1999, 'The Matrix Revolutions', '{Sci-fi,Action}', 'Lana Wachowski', 'Lana Wachowski', 'Joel Silver', 'Keanu Reeves', 'Warner Bros. Pictures', 'Thomas Anderson, a computer programmer, is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.', NULL, NULL);
INSERT INTO public.film_storage (film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating, username) VALUES (5, 'Kingsman: The Golden Circle', 2017, 'The Kings Man', '{Action,Spy,Comedy}', 'Matthew Vaughn', 'Matthew Vaughn', 'Matthew Vaughn', 'Colin Firth', '20th Century Fox', 'After the enemies blow up their headquarters, the surviving agents of Kingsman band together with their American counterpart to take down a ruthless drug cartel.', NULL, NULL);
INSERT INTO public.film_storage (film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating, username) VALUES (6, 'The Kings Man', 2022, NULL, '{Action,Spy,Comedy}', 'Matthew Vaughn', 'Matthew Vaughn', 'Matthew Vaughn', 'Ralph Fiennes', 'Walt Disney Studios Motion Pictures', 'One man must race against time to stop history worst tyrants and criminal masterminds as they get together to plot a war that could wipe out millions of people and destroy humanity.', NULL, NULL);
INSERT INTO public.film_storage (film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating, username) VALUES (7, 'Kingsman: The Secret Service', 2015, 'Kingsman: The Golden Circle', '{Action,Spy,Comedy}', 'Matthew Vaughn', 'Matthew Vaughn', 'Matthew Vaughn', 'Colin Firth', '20th Century Fox', 'Gary ''Eggsy'' Unwin faces several challenges when he gets recruited as a secret agent in a secret spy organisation in order to look for Richmond Valentine, an eco-terrorist.', NULL, NULL);
INSERT INTO public.film_storage (film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating, username) VALUES (8, 'Dark Shadows', 2012, NULL, '{Fantasy,Comedy,Horror}', 'Tim Burton', 'John August', 'Richard D. Zanuck', 'Johnny Depp', 'Warner Bros. Pictures', 'Rich playboy Barnabas earns the wrath of Angelique, a witch, when he breaks her heart. She turns him into a vampire and buries him alive. Two centuries later, Barnabas escapes to settle old scores.', NULL, NULL);
INSERT INTO public.film_storage (film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating, username) VALUES (9, 'Transcendence', 2014, NULL, '{Sci-fi,Action,Drama}', 'Wally Pfister', 'Wally Pfister', 'Wally Pfister', 'Johnny Depp', 'Warner Bros. Pictures', 'Will desperate wife uploads his consciousness into a quantum computer to save him. He soon begins making groundbreaking discoveries but also displays signs of a dark and hidden motive.', NULL, NULL);
INSERT INTO public.film_storage (film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor, film_distributor, film_overview, film_rating, username) VALUES (10, 'Edward Scissorhands', 1991, NULL, '{Fantasy,Romance}', 'Tim Burton', 'Tim Burton', 'Denise Di Novi', 'Johnny Depp', '20th Century Fox', 'Edward, a synthetic man with scissor hands, is taken in by Peg, a kindly Avon lady, after the passing of his inventor. Things take a turn for the worse when he is blamed for a crime he did not commit.', NULL, NULL);


--
-- TOC entry 3334 (class 0 OID 0)
-- Dependencies: 209
-- Name: film_person_person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.film_person_person_id_seq', 13, true);


--
-- TOC entry 3335 (class 0 OID 0)
-- Dependencies: 211
-- Name: film_storage_film_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.film_storage_film_id_seq', 10, true);


--
-- TOC entry 3181 (class 2606 OID 49404)
-- Name: film_person film_person_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.film_person
    ADD CONSTRAINT film_person_pkey PRIMARY KEY (person_id);


--
-- TOC entry 3183 (class 2606 OID 49418)
-- Name: film_storage film_storage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.film_storage
    ADD CONSTRAINT film_storage_pkey PRIMARY KEY (film_id);


-- Completed on 2022-02-03 19:11:31

--
-- PostgreSQL database dump complete
--

