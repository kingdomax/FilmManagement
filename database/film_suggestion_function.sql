--Show Suggestion Films for user who give a rating
CREATE OR REPLACE FUNCTION show_suggestion(name text[]) RETURNS TABLE(id int, title text, release integer, subordinate text, genres text[]
																			   , director text, writer text, producer text, actor text, distributor text
																			   , overview text, rating integer) AS $$

DECLARE
 genres RECORD;
 genre TEXT;
 every_genre TEXT[];
 input_name text;

BEGIN
--Convert array username into string
input_name := (SELECT ARRAY_TO_STRING(name, ''));
--Check if the username is already in the database or not (User has been given rating before)
IF (SELECT EXISTS (SELECT 1 FROM public.film_storage WHERE input_name = ANY(username))) THEN
	--Select all the film genres from the film that the user has been given a rating before
	FOR genres IN SELECT film_genre FROM public.film_storage WHERE input_name = ANY(username)
	LOOP
		every_genre:= genres.film_genre; --Store every film genre in variable
	END LOOP;
	--Match the same film genre and return other films which the user has never gave a rating before
	FOREACH genre IN ARRAY every_genre
	LOOP
		--In this case, will have only 8 genres, shown as listed below;
		CASE genre
		WHEN 'Romance' THEN
			RETURN QUERY
			SELECT film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor
			, film_distributor, film_overview, film_rating FROM public.film_storage 
			WHERE 'Romance' = ANY(film_genre) AND film_rating IS NULL
			ORDER BY film_release DESC;
		WHEN 'Action' THEN
			RETURN QUERY
			SELECT film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor
			, film_distributor, film_overview, film_rating FROM public.film_storage 
			WHERE 'Action' = ANY(film_genre) AND film_rating IS NULL
			ORDER BY film_release DESC;				
		WHEN 'Sci-fi' THEN
			RETURN QUERY
			SELECT film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor
			, film_distributor, film_overview, film_rating FROM public.film_storage 
			WHERE 'Sci-fi' = ANY(film_genre) AND film_rating IS NULL
			ORDER BY film_release DESC;			
		WHEN 'Fantasy' THEN
			RETURN QUERY
			SELECT film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor
			, film_distributor, film_overview, film_rating FROM public.film_storage 
			WHERE 'Fantasy' = ANY(film_genre) AND film_rating IS NULL
			ORDER BY film_release DESC;	
		WHEN 'Spy' THEN
			RETURN QUERY
			SELECT film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor
			, film_distributor, film_overview, film_rating FROM public.film_storage 
			WHERE 'Spy' = ANY(film_genre) AND film_rating IS NULL
			ORDER BY film_release DESC;				
		WHEN 'Comedy' THEN
			RETURN QUERY
			SELECT film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor
			, film_distributor, film_overview, film_rating FROM public.film_storage 
			WHERE 'Comedy' = ANY(film_genre) AND film_rating IS NULL
			ORDER BY film_release DESC;			
		WHEN 'Drama' THEN
			RETURN QUERY
			SELECT film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor
			, film_distributor, film_overview, film_rating FROM public.film_storage 
			WHERE 'Drama' = ANY(film_genre) AND film_rating IS NULL
			ORDER BY film_release DESC;		
		WHEN 'Horror' THEN
			RETURN QUERY
			SELECT film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor
			, film_distributor, film_overview, film_rating FROM public.film_storage 
			WHERE 'Horror' = ANY(film_genre) AND film_rating IS NULL
			ORDER BY film_release DESC;	
		ELSE
			EXIT;
		END CASE;	
	END LOOP;

ELSE --If users never give a rating before, suggestion film will return nothing
	RETURN QUERY
	SELECT film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor
	, film_distributor, film_overview, film_rating FROM public.film_storage 
	WHERE input_name = ANY(username);
END IF;

END;

$$ LANGUAGE plpgsql;


--Call
SELECT * FROM show_suggestion(ARRAY['admin1']);
