

export function EmailPreview({emailItem}) {

    return<div className="email-preview">{emailItem.from.split('@')[0]}{emailItem.subject}{emailItem.body}</div>
}

//TODO: change to a table ?