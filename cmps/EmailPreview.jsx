

export function EmailPreview({emailItem, OnDetails}) {


    return <div>
        <p onClick={OnDetails}>{emailItem.from.split('@')[0]}        <span style={{ fontWeight: 'bold' }}>{emailItem.subject}</span>          {emailItem.body}</p>
    </div>
    }

//TODO: change to a table