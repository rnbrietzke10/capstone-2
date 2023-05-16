-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com'),
       ('testuser2',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User2!',
        'joel@joelburton.com');

-- INSERT INTO lakes (handle,
--                        name,
--                        description,
--                        lake_acreage,
--                        depth, 
--                        angling_oppurtunities,
--                        tips,
--                        map_url)
-- VALUES ('lake-austin', 'Lake Austin','On the Colorado River in the City of Austin', 1599, 75,
--         'Lake Austin has an excellent number of largemouth bass, often   weighing between 8 and 10 pounds. Bluegill, redbreast, redear fishing, flathead and blue catfish can also be found in Lake Austin. Summer fishing is best to do in late evening and night due to high boat traffic during the day.', [
--       'The best locations to catch Largemouth bass are in the edges of the weed beds on the shore line.',
--       'During summer plan fishing trips in the early morning or at night.',
--       'Baits that work well are white spinnerbaits and topwaters, pitching jigs with heavy bait casting tackle, plastic worms or jerkbaits.',
--     ],'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55092.15992552629!2d-97.89331477086907!3d30.343560016320854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b3435dbfe386d%3A0x7036e55ce0332d2e!2sLake%20Austin!5e0!3m2!1sen!2sus!4v1683736257683!5m2!1sen!2sus'),
--         ('lake-travis', 'Lake Travis','On the Colorado River northwest of Austin', 18622, 190,
--         'The highest population of fish in Lake Travis is the Largemouth bass. Blue, channel,and flathead catfish are abundant and are found throughout the lake ', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110048.66709470155!2d-98.14704097254221!3d30.463847625461106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b234b3c3d1495%3A0x74e585eef7396b82!2sLake%20Travis!5e0!3m2!1sen!2sus!4v1683736010857!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"');

