import { useNavigate, useSearchParams, useParams} from "react-router-dom";


// export function EmailCompose( {onEmailCompose} ) {
export function EmailCompose( {onEmailCompose} ) {
    const { folder } = useParams()
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    console.log('folder: ', folder);

    function handleComposeClick() {
        navigate(`/email/${folder}/?compose=new`);
    }
    function onEmailCompose() {
        
    }

    return (
        <div onClick={handleComposeClick} className="email-compose">
            Compose
        </div>
    );
}