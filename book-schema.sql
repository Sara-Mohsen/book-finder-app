CREATE TABLE saved_searches (

    id INT PRIMARY KEY AUTO_INCREMENT,

    search_query VARCHAR(255),

    searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);