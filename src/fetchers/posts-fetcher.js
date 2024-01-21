import { request } from "../utils/index.js";

async function fetchPosts(name) {
  try {
    const { data } = await axios.get("../../latest-posts.json");
    return data;
  } catch (e) {
    throw new Error(e);
  }
}

export default fetchPosts;
