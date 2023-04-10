import React from "react";
import RecipeCard from "../components/RecipeCard";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
const recipes = [
  {
    title: "Spaghetti with Meat Sauce",
    image:
      "https://res.cloudinary.com/sjlabs/image/upload/c_scale,q_auto,f_auto,w_1024,c_fill/l_GS_Vert-Logo-one-color-white,g_south_east,fl_relative,x_0.03,y_0.03,h_0.28/74126800126.jpg",
    description: "A classic Italian dish with a hearty meat sauce.",
  },
  {
    title: "Chicken Alfredo",
    image:
      "https://iwashyoudry.com/wp-content/uploads/2022/08/Chicken-Alfredo-Low-Res-21.jpg",
    description: "Creamy fettuccine alfredo with tender chicken.",
  },
  {
    title: "Beef Stir Fry",
    image:
      "https://www.foodnetwork.com/content/dam/images/food/fullset/2015/12/16/3/FNM_010116-Beef-Stir-Fry-Recipe_s4x3.jpg",
    description:
      "A quick and easy Asian-inspired dish with tender beef and crisp vegetables.",
  },
];
const Recipes = () => {
  return (
    <div>
      <Nav />

      <div>
        <div className="mt-9 text-center algin-center">
          <SearchBar />
        </div>
        <h1 className="mt-6 text-3xl font-bold mb-6 text-center text-gray-900">
          Recipes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes &&
            recipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                title={recipe.title}
                image={recipe.image}
                description={recipe.description}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default Recipes;
