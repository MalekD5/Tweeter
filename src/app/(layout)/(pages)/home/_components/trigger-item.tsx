import { Trigger } from '@radix-ui/react-tabs';

export default function TriggerItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <Trigger
      className="relative w-fit text-sm data-[state=active]:font-bold data-[state=inactive]:text-muted-foreground"
      value={value}
    >
      {children}

      <div className="absolute w-full">
        <Trigger
          className="rounded-full data-[state=active]:h-1.5 data-[state=active]:w-full data-[state=active]:bg-bluish"
          value={value}
          asChild
        >
          <div></div>
        </Trigger>
      </div>
    </Trigger>
  );
}
