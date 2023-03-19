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

function determineColor(color: string | undefined) {
  switch (color) {
    case 'danger':
      return 'bg-red-700 hover:bg-red-500 disabled:bg-red-900 disabled:text-gray-300';
    case 'success':
      return 'bg-green-700 hover:bg-green-500 disabled:bg-green-900 disabled:text-gray-300';
    case 'warning':
      return 'bg-yellow-700 hover:bg-yellow-500 disabled:bg-yellow-900 disabled:text-gray-300';
    case 'white':
      return 'bg-white !text-black font-bold hover:bg-gray-300';
    case 'bordered-default':
      return 'bg-inherit border border-blue-200 hover:bg-blue-300';
    default:
      return 'bg-blue-700 disabled:bg-blue-900 disabled:text-gray-300';
  }
}

export default button;
