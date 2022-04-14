import "./styles.css";

export const BookCard = ({img, title, description}) => {
    return (
        <div className="card">
            <img src={img} alt="Copertina Libro" />
            <div className="mainCard">
                <p>{title}</p>
                <p>{description}</p>
                <button>Add to cart</button>
            </div>
        </div>
    );
}