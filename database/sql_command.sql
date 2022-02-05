--film_storage--

SELECT * FROM show_film();

SELECT * FROM add_film('Test Film' ,'2022', 'test', ARRAY ['Romance','Action'], 'Monkol Film', 'This is Test movie for create SP function.');

SELECT * FROM edit_film('26', 'I edit this film', '2022', 'test', ARRAY ['Romance','Action'], 'Monkol Film', 'I edit this film', '0', '');

SELECT * FROM remove_film('Test Film1', NULL, 'Test Person1', 'Test Person1', 'Test Person2', 'Test Person2');

--film_person--

SELECT * FROM show_person();

SELECT * FROM add_person('Test Person6' ,'21/09/1992', 'F', ARRAY ['Director', 'Writer', 'Main Actor', 'Producer'], ARRAY ['Test Film5']);

SELECT * FROM edit_person('41','Test Person 4 change' ,'11/09/1992', 'M', ARRAY ['Director', 'Writer'], ARRAY ['Test Film5']);

SELECT * FROM remove_person('Test Person3',ARRAY ['Test Film5','Test Film3','Test Film4']);


--film_suggestion--

SELECT * FROM show_suggestion('admin2');