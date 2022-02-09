--Show Films list Function
CREATE OR REPLACE FUNCTION show_film() RETURNS TABLE(id int, title text, release integer, subordinate text, genre text[], director text
													 , writer text, producer text, actor text, distributor text, overview text, rating integer) AS $$
BEGIN

RETURN QUERY
SELECT film_id, film_title, film_release, film_subordinate, film_genre, film_director, film_writer, film_producer, film_actor
, film_distributor, film_overview, film_rating FROM public.film_storage 
ORDER BY film_release DESC;

END;

$$ LANGUAGE plpgsql;


--Call
SELECT * FROM show_film();



--Add Film Function
CREATE OR REPLACE FUNCTION add_film(title text, release integer, subordinate text, genre text[], distributor text, overview text)
RETURNS BOOLEAN AS $$

BEGIN

--Check if the film already exists or not
IF (SELECT (SELECT 1 FROM public.film_storage WHERE film_title = title) IS NOT NULL) THEN
	RETURN FALSE;
ELSE	
	INSERT INTO public.film_storage (film_title, film_release, film_subordinate, film_genre, film_distributor, film_overview)
	VALUES ($1, $2, $3, $4, $5, $6);
	RETURN TRUE;
END IF;

END;

$$ LANGUAGE plpgsql;


--Call
SELECT * FROM add_film('Test Film2' ,'2050', NULL, ARRAY ['Romance','Action'], 'Monkol Film', 'This is Test movie for create SP function.');



--Edit current Film detail Function
--In this function will also include feature 'Add Rating', but if user did not edit rating component; on frontend side will not send 'username' to database
CREATE OR REPLACE FUNCTION edit_film(id integer, title text, release integer, subordinate text, genre text[], distributor text
									 , overview text, rating integer, username text[]) RETURNS BOOLEAN AS $$

DECLARE
 current_username text[];
 review_username text;
 
BEGIN

--Update new detail of film, in case of user did not edit the 'Rating' of film 
UPDATE public.film_storage 
SET film_title = $2,
	film_release = $3,
	film_subordinate = $4,
	film_genre = $5,
	film_distributor = $6,
	film_overview = $7,
	film_rating = $8
WHERE film_id = $1;

--Convert array username into string
review_username := (SELECT ARRAY_TO_STRING(username, ''));

--In case of user edit 'Rating' of film
--Check if this film already have username or not (Have been received review before)
IF (SELECT (SELECT film_storage.username FROM public.film_storage WHERE film_id = id) IS NOT NULL) THEN
	--If YES, store the current username in variable
	current_username := (SELECT film_storage.username FROM public.film_storage WHERE film_id = id);
	--Check user that give review is the same person or not
	IF (NOT review_username = ANY(current_username)) THEN 
	    --If not the same person, add the new username into array username
		UPDATE public.film_storage SET username = current_username || $9
		WHERE film_id = id;
	END IF;
	RETURN TRUE;
ELSE --If the film haven not been received review before, add username in the cloumn
	UPDATE public.film_storage 
	SET username = $9
	WHERE film_id = $1;
    RETURN TRUE;
END IF;

END;

$$ LANGUAGE plpgsql;

-- Call
SELECT * FROM edit_film('8', 'Dark Shadows', '2012', NULL, ARRAY ['Fantasy','Comedy','Horror'], 'Warner Bros. Pictures', 'Rich playboy Barnabas earns the wrath of Angelique, a witch, when he breaks her heart. She turns him into a vampire and buries him alive. Two centuries later, Barnabas escapes to settle old scores.', '5', ARRAY ['admin1']);



--Delete current Film Function
CREATE OR REPLACE FUNCTION remove_film(title text, subordinate text, director text, writer text, producer text, actor text) 
RETURNS BOOLEAN AS $$

BEGIN

--If the film deleted, any person related must be also delete
IF director IS NOT NULL THEN
	DELETE FROM public.film_person
	WHERE person_name = $3;
	--In case a person has been involved in other films, the name of the person must be deleted from that film too.
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

--Delete film from database
DELETE FROM public.film_storage 
WHERE film_title = $1;
--Also delete film subordinate from database
DELETE FROM public.film_storage 
WHERE film_title = $2;

--Check if the film that you want to delete is the subordinate of another film
IF (SELECT (SELECT 1 FROM public.film_storage WHERE film_subordinate = title) IS NOT NULL) THEN
--Also delete the film name out of the subordination column of the other film
UPDATE public.film_storage
SET film_subordinate = NULL
WHERE film_subordinate = $1;
END IF;

RETURN TRUE;

END;

$$ LANGUAGE plpgsql;


--Call
SELECT * FROM remove_film('Transcendence', NULL, 'Wally Pfister', 'Wally Pfister', 'Wally Pfister', 'Johnny Depp');
