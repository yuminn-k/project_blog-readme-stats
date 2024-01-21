import { request } from "../utils/index.js";

async function fetchPost(name, tag) {
  try {
    const { data } = await axios.get("../../latest-post.json");
    return data;
  } catch (e) {
    throw new Error(e);
  }
}

export default fetchPost;
