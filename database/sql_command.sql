--film_storage--

SELECT * FROM show_film();

SELECT * FROM add_film('Test Film5' ,'2022', 'test', ARRAY ['Romance','Action'], 'Monkol Film', 'This is Test movie for create SP function.','admin1');

SELECT * FROM edit_film('8', 'Dark Shadows', '2012', ARRAY ['Fantasy','Comedy','Horror'], 'Warner Bros. Pictures', 'Rich playboy Barnabas earns the wrath of Angelique, a witch, when he breaks her heart. She turns him into a vampire and buries him alive. Two centuries later, Barnabas escapes to settle old scores.', '5', 'admin2');

SELECT * FROM remove_film('Test Film1', NULL, 'Test Person1', 'Test Person1', 'Test Person2', 'Test Person2');


--film_person--

SELECT * FROM show_person();

SELECT * FROM add_person('Test Person6' ,'21/09/1992', 'F', ARRAY ['Director', 'Writer', 'Main Actor', 'Producer'], ARRAY ['Test Film5']);

SELECT * FROM edit_person('41','Test Person 4 change' ,'11/09/1992', 'M', ARRAY ['Director', 'Writer'], ARRAY ['Test Film5']);

SELECT * FROM remove_person('Test Person3',ARRAY ['Test Film5','Test Film3','Test Film4']);

--film_suggestion--

SELECT * FROM show_suggestion('admin2');