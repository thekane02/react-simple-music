import { fileUrl } from "constants/global";

export default function generateImg(id) {
  return `${fileUrl}${id}`;
}
