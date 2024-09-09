export function EmailPreview({
  emailItem,
  starButton,
  onEmailDelete,
  onMarkUnread,
  onStarMark,
  readUnreadButton,
  deleteButton,
}) {
  return (
    <>
      <div className="email-name">
        {emailItem.from?.includes("@")
          ? emailItem.from.split("@")[0]
          : emailItem.from}
      </div>
      <div className="email-body">
        {emailItem.subject} {emailItem.body}
      </div>
      <div className="email-date">
        {emailItem.sentAt instanceof Date
          ? emailItem.sentAt.toLocaleString()
          : emailItem.sentAt}
        <br />
      </div>

      <div className="email-buttons">
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEmailDelete(emailItem.id);
          }}
        >
          {deleteButton(emailItem)}
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onMarkUnread(emailItem.id);
          }}
        >
          {readUnreadButton(emailItem)}
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onStarMark(emailItem.id);
          }}
        >
          {starButton(emailItem)}
        </div>
      </div>
    </>
  );
}

<div></div>;
