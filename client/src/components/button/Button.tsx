import { determineColor } from '@/utils/ComponentUtils';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  color?:
    | 'bordered-default'
    | 'white'
    | 'danger'
    | 'success'
    | 'warning'
    | 'default';
  auto?: boolean;
}

function button(props: ButtonProps) {
  const { color, auto, children, ...rest } = props;
  const btnColor = determineColor(color);

  return (
    <button
      className={`${btnColor} py-2 px-5 text-md rounded-2xl text-white disabled:cursor-not-allowed ${
        auto && 'w-full'
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default button;
