import { Entity, Schema } from "redis-om";

class User extends Entity {}

const UserSchema = new Schema(User, {
  firstName: { type: "text" },
  lastName: { type: "text" },
});

export default UserSchema;
