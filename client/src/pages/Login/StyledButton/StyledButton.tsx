import "./styled-button.css";

type StyledButtonProps = {
  text: string;
  onClick: (ev: any) => void;
};
const StyledButton = (props: StyledButtonProps) => {
  return (
    <button onClick={props.onClick} className="styled-button">
      {props.text}
    </button>
  );
};

export default StyledButton;
