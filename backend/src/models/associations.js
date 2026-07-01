import users from "./users.model.js";
import posts from "./posts.model.js";

users.hasMany(posts, {
    foreignKey: "creatorId",
});

posts.belongsTo(users, {
    foreignKey: "creatorId",
});

export { users, posts };