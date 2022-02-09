--Show Person list Function
CREATE OR REPLACE FUNCTION show_person() RETURNS TABLE(id int, name text, dob text, sex text, roles text[], films text[])
AS $$

BEGIN

RETURN QUERY
SELECT person_id, person_name, person_dob, person_sex, person_roles, relate_film FROM public.film_person
ORDER BY person_name DESC;

END;

$$ LANGUAGE plpgsql;


--Call
SELECT * FROM show_person();



--Add Person Function
--Person can only add on the existing film
CREATE OR REPLACE FUNCTION add_person(name text, dob text, sex text, roles text[], films text[])
RETURNS BOOLEAN AS $$

DECLARE
 role  TEXT;
 film TEXT;

BEGIN
--Check if person already exists or not
IF (SELECT (SELECT 1 FROM public.film_person WHERE person_name = name) IS NOT NULL) THEN
	RETURN FALSE;
ELSE	
	INSERT INTO public.film_person (person_name, person_dob, person_sex, person_roles, relate_film)
	VALUES ($1, $2, $3, $4, $5);
    --For the person who has been involved in many films, must update the name of that person in each role in every film
	FOREACH film IN ARRAY films
	LOOP
		FOREACH role IN ARRAY roles
		LOOP
			CASE role
			WHEN 'Director' THEN
				UPDATE public.film_storage 
				SET film_director = name
				WHERE film_title = film;
			WHEN 'Writer' THEN	
				UPDATE public.film_storage 
				SET film_writer = name
				WHERE film_title = film;
			WHEN 'Producer' THEN	
				UPDATE public.film_storage 
				SET film_producer = name
				WHERE film_title = film;
			WHEN 'Main Actor' THEN	
				UPDATE public.film_storage 
				SET film_actor = name
				WHERE film_title = film;
			ELSE
				EXIT;
			END CASE;
		END LOOP;
	END LOOP;
	RETURN TRUE;
END IF;

END;

$$ LANGUAGE plpgsql;


--Call
SELECT * FROM add_person('Test Person1' ,'21/09/1992', 'F', ARRAY ['Director'], ARRAY ['Transcendence','The Matrix Reloaded']);




--Edit current Person Detail Function
CREATE OR REPLACE FUNCTION edit_person(id integer, name text, dob text, sex text, roles text[], films text[])
RETURNS BOOLEAN AS $$

DECLARE
 role  TEXT;
 film TEXT;
 
BEGIN
--Update new detail of person
UPDATE public.film_person 
SET person_name = $2,
	person_dob = $3,
	person_sex = $4,
	person_roles = $5,
	relate_film = $6
WHERE person_id = $1;
--Also update the person name in every film involve
FOREACH film IN ARRAY films
	LOOP
		FOREACH role IN ARRAY roles
		LOOP
			CASE role
			WHEN 'Director' THEN
				UPDATE public.film_storage 
				SET film_director = name
				WHERE film_title = film;
			WHEN 'Writer' THEN	
				UPDATE public.film_storage 
				SET film_writer = name
				WHERE film_title = film;
			WHEN 'Producer' THEN	
				UPDATE public.film_storage 
				SET film_producer = name
				WHERE film_title = film;
			WHEN 'Main Actor' THEN	
				UPDATE public.film_storage 
				SET film_actor = name
				WHERE film_title = film;
			ELSE
				EXIT;
			END CASE;
		END LOOP;
	END LOOP;
	RETURN TRUE;
	
END;

$$ LANGUAGE plpgsql;


--Call
SELECT * FROM edit_person('1','Peter Park' ,'11/09/1992', 'M', ARRAY ['Director', 'Writer'], ARRAY ['The Matrix Resurrections']);




--Delete current Person Function
CREATE OR REPLACE FUNCTION remove_person(name text, films text[]) RETURNS BOOLEAN AS $$

DECLARE
 film TEXT;
 
BEGIN
--Delete person from database
DELETE FROM public.film_person
WHERE person_name = $1;
--If the person deleted, any film related must be also delete
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
	--In case of a film already deleted, the film name which involved another person must be deleted too
	UPDATE public.film_person
	SET relate_film = (SELECT ARRAY_REMOVE(relate_film,film));
END LOOP;

RETURN TRUE;

END;

$$ LANGUAGE plpgsql;


--Call
SELECT * FROM remove_person('James McTeigue',ARRAY ['The Matrix Resurrections']);
