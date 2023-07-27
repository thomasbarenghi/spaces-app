type ButtonProps = {
  src: string;
  alt: string;
  size: "small" | "medium" | "large" | undefined;
  className?: string;
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
};

export default function Button({
  text,
  onClick,
  type,
  disabled,
  size,
  className,
}: ButtonProps) {
  return (
    <button
      className={`button ${size} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
