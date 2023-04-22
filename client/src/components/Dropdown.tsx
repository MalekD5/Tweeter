import { usePopper } from 'react-popper';
import { useState } from 'react';
import { Placement } from '@popperjs/core';
import { useClickOutside } from '@mantine/hooks';

export type ElementType = HTMLElement | null;

interface DropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  reference: ElementType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  placement?: Placement;
}

function Dropdown(props: DropdownProps) {
  const { reference, placement, children, open, setOpen, ...rest } = props;
  const [popperElement, setPopperElement] = useState<ElementType>(null);
  const { styles, attributes } = usePopper(reference, popperElement, {
    placement: placement
  });

  useClickOutside(() => setOpen(false), null, [popperElement]);
  return (
    <>
      {open && (
        <div
          ref={setPopperElement}
          {...attributes.popper}
          style={{ ...styles.popper, marginBottom: '.5rem' }}
          {...rest}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default Dropdown;
