import axios from "axios";

async function spinUpServer() {
  try {
    await axios.get("/");
  } catch (error) {
    return error;
  }
}

async function createUser(data) {
  try {
    let result = await axios.post("/users", data);
    return result;
  } catch (error) {
    return error;
  }
}

export { spinUpServer };
