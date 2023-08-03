interface CloseSidebarButtonProps {
  onClick: () => void;
}

export default function CloseSidebarButton({
  onClick,
}: CloseSidebarButtonProps) {
  return (
    <button type="button" className="-m-2.5 p-2.5" onClick={onClick}>
      <span className="sr-only">Close sidebar</span>
      <i className="fa-solid fa-xmark h-6 w-6 text-white" aria-hidden="true" />
    </button>
  );
}
