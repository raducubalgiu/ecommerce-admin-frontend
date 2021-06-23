

const SpinnerButton = (props: {className: string}) => {
    return (
        <button className={props.className} type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            <span className="sr-only">Loading...</span>
        </button>
    );
}

export default SpinnerButton;