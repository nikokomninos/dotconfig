const OSBadge = ({ icon, os }: { icon: React.ReactNode; os: string }) => {
  return (
    <div className="flex flex-row justify-center items-center gap-2 px-4 py-2 rounded-md border border-(--border) text-sm">
      {icon}
      {os}
    </div>
  );
};

export default OSBadge;
