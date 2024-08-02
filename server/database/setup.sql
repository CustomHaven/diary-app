DROP TABLE IF EXISTS diary;

CREATE TABLE diary (
    id SERIAL PRIMARY KEY,     -- Unique identifier for each entry
    entry_date DATE NOT NULL,        -- Date of the diary entry
    title VARCHAR(255),              -- Title of the entry
    content TEXT NOT NULL,           -- Content of the entry
    mood VARCHAR(50),                -- Mood associated with the entry
    tags VARCHAR(255)[],             -- Array of tags for categorization
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp of last update
);


INSERT INTO diary (entry_date, title, content, mood, tags)
VALUES ('2024-08-02', 'My First Entry', 'Today was a great day! I felt very productive.', 'happy', ARRAY['productivity', 'happy', 'daily']);
('2024-01-15', 'A Fresh Start', 'Today I began a new project at work. Feeling excited about the challenges ahead!', 'excited', ARRAY['work', 'new', 'challenge']),
('2024-02-10', 'Winter Blues', 'The weather has been gloomy and it\'s affecting my mood. I miss the sunshine.', 'sad', ARRAY['weather', 'mood', 'winter']),
('2024-03-05', 'Productivity High', 'I accomplished a lot today. Managed to finish all my tasks ahead of schedule.', 'productive', ARRAY['work', 'accomplishment', 'productive']),
('2024-04-12', 'Spring Walk', 'Took a long walk in the park today. The flowers are blooming, and it was rejuvenating.', 'happy', ARRAY['nature', 'spring', 'relaxation']),
('2024-05-23', 'Family Reunion', 'Had a wonderful time with family today. It\'s always great to catch up and share stories.', 'joyful', ARRAY['family', 'reunion', 'joy']),
('2024-06-30', 'Learning SQL', 'Spent the day learning about SQL and databases. It\'s quite interesting and useful.', 'curious', ARRAY['learning', 'SQL', 'education']),
('2024-07-14', 'Summer Adventure', 'Went hiking with friends. The view from the top was breathtaking!', 'adventurous', ARRAY['hiking', 'summer', 'friends']),
('2024-08-02', 'Reflecting on Progress', 'Looking back at the past months, I see a lot of personal growth. Feeling proud.', 'reflective', ARRAY['growth', 'reflection', 'pride']),
('2024-09-10', 'Unexpected Kindness', 'A stranger helped me when my car broke down today. Restores my faith in humanity.', 'grateful', ARRAY['kindness', 'gratitude', 'humanity']),
('2024-10-21', 'Autumn Vibes', 'The leaves are turning colors, and it\'s a beautiful sight. I love this time of year.', 'content', ARRAY['autumn', 'nature', 'beauty']),
('2024-11-05', 'Rainy Day Musings', 'It rained all day, which made me feel cozy and contemplative. I love the sound of rain.', 'calm', ARRAY['rain', 'cozy', 'thoughtful']),
('2024-12-24', 'Holiday Cheer', 'Spent the day with loved ones, enjoying holiday traditions and good food.', 'festive', ARRAY['holiday', 'family', 'tradition']);