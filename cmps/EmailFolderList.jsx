import { useNavigate, useParams } from "react-router-dom";
import { EmailCompose } from "./EmailCompose";

export function EmailFolderList({ unradCount }) {
  console.log("EmailFolderList: ", unradCount);
  const navigate = useNavigate();
  const { folder } = useParams();

  function onFolderClick(status) {
    navigate(`/email/${status.toLowerCase()}/`);
  }

  function handleComposeClick() {
    navigate(`/email/${folder}/?compose=new`);
  }

  return (
    <div className="email-folder-list">
      <div
        onClick={(e) => {
          e.preventDefault();
          handleComposeClick();
        }}
        className="email-compose"
      >
        Compose
      </div>
      <div onClick={() => onFolderClick("Inbox")} className="folder-item">
        Inbox ({<span style={{ fontSize: "0.8em" }}>{unradCount}</span>})
      </div>
      <div onClick={() => onFolderClick("Sent")} className="folder-item">
        Sent
      </div>
      <div onClick={() => onFolderClick("Starred")} className="folder-item">
        Starred
      </div>
      <div onClick={() => onFolderClick("Trash")} className="folder-item">
        Trash
      </div>
      <div onClick={() => onFolderClick("Draft")} className="folder-item">
        Draft
      </div>
    </div>
  );
}

// onClick={(e) => { e.preventDefault(); e.stopPropagation();
