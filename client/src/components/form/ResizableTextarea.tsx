import { useRef } from 'react';
import type { UseFormRegister, FieldValues } from 'react-hook-form';

interface ResizableTextareaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onChange' | 'ref' | 'name'
  > {
  register?: UseFormRegister<FieldValues>;
  name: string;
}

function ResizableTextarea(props: ResizableTextareaProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const { register, name } = props;
  const handleOnChange = (target: HTMLTextAreaElement | null) => {
    if (!target) return;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  return !!register ? (
    <textarea
      {...props}
      {...register(name, {
        onChange(e) {
          handleOnChange(e.target);
        }
      })}
    />
  ) : (
    <textarea
      onChange={() => handleOnChange(ref.current)}
      ref={ref}
      {...props}
    />
  );
}

export default ResizableTextarea;
