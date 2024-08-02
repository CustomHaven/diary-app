DROP TABLE IF EXISTS diary;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(75) NOT NULL,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(65) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

CREATE TABLE diary (
    diary_id INT GENERATED ALWAYS AS IDENTITY,
    entry_date DATE NOT NULL,
    title VARCHAR(255),
    content TEXT NOT NULL,
    mood VARCHAR(50),
    tags VARCHAR(255)[],
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (diary_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


-- ---------------------------- SEED ---------------------------------

INSERT INTO users (username, email, password, admin) VALUES
('bob', 'bob@example.com', 'test_pass', TRUE),
('alice', 'alice@example.com', '$2b$10$C9v5O0bPz9oLwF6aRkM4tOeOe7A6A6U3STf3nBlD1vub5aHDQ3A0y', FALSE),
('charlie', 'charlie@example.com', '$2b$10$9A6T0bKSl0D7c0d5JgkQY.I9PblxFQX5HbLFAwOzHztb1bPxX7Fmq', FALSE);


INSERT INTO diary (entry_date, title, content, mood, tags, user_id)
VALUES 
('2024-06-02', 'My First Entry', 'Today was a great day! I felt very productive.', 'happy', ARRAY['productivity', 'happy', 'daily'], 1),
('2024-06-03', 'A Fresh Start', 'Today I began a new project at work. Feeling excited about the challenges ahead!', 'excited', ARRAY['work', 'new', 'challenge'], 1),
('2024-06-10', 'Rainy Day Musings', 'It rained all day, which made me feel cozy and contemplative. I love the sound of rain.', 'calm', ARRAY['rain', 'cozy', 'thoughtful'], 1),
('2024-06-15', 'Productivity High', 'I accomplished a lot today. Managed to finish all my tasks ahead of schedule.', 'productive', ARRAY['work', 'accomplishment', 'productive'], 1),
('2024-06-20', 'Learning SQL', 'Spent the day learning about SQL and databases. It''s quite interesting and useful.', 'curious', ARRAY['learning', 'SQL', 'education'], 1),
('2024-06-25', 'Summer Adventure', 'Went hiking with friends. The view from the top was breathtaking!', 'adventurous', ARRAY['hiking', 'summer', 'friends'], 1),
('2024-07-01', 'Unexpected Kindness', 'A stranger helped me when my car broke down today. Restores my faith in humanity.', 'grateful', ARRAY['kindness', 'gratitude', 'humanity'], 1),
('2024-07-08', 'Spring Walk', 'Took a long walk in the park today. The flowers are blooming, and it was rejuvenating.', 'happy', ARRAY['nature', 'spring', 'relaxation'], 1),
('2024-07-14', 'Reflecting on Progress', 'Looking back at the past months, I see a lot of personal growth. Feeling proud.', 'reflective', ARRAY['growth', 'reflection', 'pride'], 1),
('2024-07-20', 'Family Reunion', 'Had a wonderful time with family today. It''s always great to catch up and share stories.', 'joyful', ARRAY['family', 'reunion', 'joy'], 1),
('2024-07-25', 'Winter Blues', 'The weather has been gloomy and it''s affecting my mood. I miss the sunshine.', 'sad', ARRAY['weather', 'mood', 'winter'], 1),
('2024-07-29', 'Autumn Vibes', 'The leaves are turning colors, and it''s a beautiful sight. I love this time of year.', 'content', ARRAY['autumn', 'nature', 'beauty'], 1),
('2024-08-01', 'Holiday Cheer', 'Spent the day with loved ones, enjoying holiday traditions and good food.', 'festive', ARRAY['holiday', 'family', 'tradition'], 1);