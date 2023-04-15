Description: FoodMatch is a social networking platform for food lovers around the world. Users can create profiles, share recipes, review restaurants, and connect with other foodies in their area. The platform features a recommendation engine that suggests dishes and restaurants based on users' preferences and previous activity. FoodMatch also hosts virtual cooking classes and food-related events, allowing users to learn new skills and connect with like-minded individuals. Whether you're a seasoned chef or a beginner cook, FoodMatch is the perfect platform for discovering new flavors and building a community around your love of food.



I built a recipe site using NEXTJS & planetscale, the user is registered, he is logged in automatically, a TOKEN and a cookie are saved, currently the passwords in the database are not encrypted
The user table looks like this:

TABLE `users` (
`id` int NOT NULL AUTO_INCREMENT,
`name` varchar(255),
`email` varchar(255),
`password` varchar(255),
PRIMARY KEY (`id`)
) ENGINE InnoDB,
   CHARSET utf8mb4,
   COLLATE utf8mb4_0900_ai_ci;


In addition, I have more tables, events, likes, recipes, tokens,

Right now I want to add security to encrypt the passwords to a database: