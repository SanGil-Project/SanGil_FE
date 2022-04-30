import styled from "styled-components";

const Icon = (props) => {
  const { type, width, height, maxWidth, maxHeight } = props;
  const styles = { width, height, maxWidth, maxHeight };
  return (
    <Vector {...styles} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="20" fill="white" />
      <path
        d="M20 13.9C21.16 13.9 22.1 14.84 22.1 16C22.1 17.16 21.16 18.1 20 18.1C18.84 18.1 17.9 17.16 17.9 16C17.9 14.84 18.84 13.9 20 13.9ZM20 22.9C22.97 22.9 26.1 24.36 26.1 25V26.1H13.9V25C13.9 24.36 17.03 22.9 20 22.9ZM20 12C17.79 12 16 13.79 16 16C16 18.21 17.79 20 20 20C22.21 20 24 18.21 24 16C24 13.79 22.21 12 20 12ZM20 21C17.33 21 12 22.34 12 25V28H28V25C28 22.34 22.67 21 20 21Z"
        fill="black"
      />
    </Vector>
  );
};

const Vector = styled.svg`
  width: ${(props) => `${props.width}`};
  max-width: ${(props) => `${props.maxWidth}`};
  height: ${(props) => `${props.height}`};
  max-height:${(props) => `${props.maxHeight}`}
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  border-radius: 100%;
`;

export default Icon;