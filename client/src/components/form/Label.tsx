function Label({ children }: React.PropsWithChildren) {
  return <label className='label'>{children}</label>;
}

interface TextProps {
  text: string;
  alt?: boolean;
  error?: boolean;
}

function Text({ text, error = false, alt = false }: TextProps) {
  return (
    <span
      className={`${alt ? 'label-text-alt' : 'label-text'} ${
        error && 'text-red-400'
      }`}
    >
      {text}
    </span>
  );
}

export default Object.assign(Label, {
  Text
});
