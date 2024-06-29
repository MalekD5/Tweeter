export function Separator({ text }: { text?: string }) {
  return (
    <div className="my-4" role="separator">
      <div className="flex basis-0 flex-row items-stretch">
        {text && (
          <>
            <div className="flex grow basis-0 items-center justify-center">
              <div className="mx-2 flex h-[1px] w-full bg-zinc-700"></div>
            </div>
            <div className="basis-auto">{text}</div>
          </>
        )}
        <div className="flex grow basis-0 items-center">
          <div className="mx-2 flex h-[1px] w-full bg-zinc-700"></div>
        </div>
      </div>
    </div>
  );
}
