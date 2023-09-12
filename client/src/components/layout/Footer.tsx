import "remixicon/fonts/remixicon.css";

export default function Footer() {
    function renderCurrentYear() {
        const year = new Date();
        return year.getFullYear();
    }

    return (
        <div>
            <hr />
            <div className="flex flex-row">
                <p>
                    <i className="ri-copyright-line"></i> Marshall Blatz{" "}
                    {renderCurrentYear()}
                </p>
            </div>
        </div>
    );
}
