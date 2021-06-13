

const SpinnerButton = () => {
    return (
        <button className="btn btn-primary btn-user btn-block" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
            <span className="sr-only">Loading...</span>
        </button>
    );
}

export default SpinnerButton;