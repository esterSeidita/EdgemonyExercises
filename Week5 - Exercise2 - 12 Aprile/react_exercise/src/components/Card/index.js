export const Card = (props) => {
    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
        </div>
    );
}