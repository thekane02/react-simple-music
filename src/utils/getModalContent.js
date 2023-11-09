import CreatePlayListForm from "modules/playlist/CreatePlayListForm";

export default function getModalContent(formContent) {
  switch (formContent) {
    case "create_playlist":
      return <CreatePlayListForm></CreatePlayListForm>;

    default:
      break;
  }
}
