export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  color?: 'outline-default' | 'white' | 'danger' | 'success' | 'default';
  auto?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const buttonColors = {
  danger: 'bg-red-700 hover: disabled:bg-red-900 disabled:text-gray-300',
  success:
    'bg-green-700 hover:bg-green-500 disabled:bg-green-900 disabled:text-gray-300',
  default: 'bg-blue-700 disabled:bg-blue-900 disabled:text-gray-300',
  'outline-default':
    'bg-inherit !border-solid border-2 border-blue-200 hover:bg-blue-300',
  white:
    'bg-white border-none !text-black font-bold hover:bg-gray-300 disabled:bg-gray-400'
};

const buttonSize = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl'
};

function Button(props: ButtonProps) {
  const { color, auto, size, children, ...rest } = props;

  return (
    <button
      className={`border-none py-2 px-5 text-md rounded-2xl disabled:cursor-not-allowed cursor-pointer ${
        auto && 'w-full'
      } ${buttonColors[color!]} ${buttonSize[size!]}`}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  color: 'default',
  auto: false,
  size: 'sm'
};

export default Button;
