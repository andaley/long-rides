import "./Card.css";

type CardProps = {
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
};

function Card(props: CardProps) {
  const classes = "card " + props.className;

  return <div className={classes} onClick={props.onClick}>{props.children}</div>;
}

export default Card;
