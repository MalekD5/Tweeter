import type { ButtonProps } from '@/components/Components';
import { determineColor } from '@/utils/ComponentUtils';

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
