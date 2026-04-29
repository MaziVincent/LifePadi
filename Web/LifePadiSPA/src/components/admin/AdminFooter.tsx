const AdminFooter = () => {
	return (
		<footer className="fixed inset-x-0 bottom-0 z-30 border-t bg-card px-4 py-3 md:ml-[220px] md:px-6">
			<p className="text-center text-xs text-muted-foreground">
				&copy; {new Date().getFullYear()}{" "}
				<a
					href="https://listacc.com/"
					className="hover:underline"
					target="_blank"
					rel="noopener noreferrer">
					Listacc
				</a>
				. All rights reserved.
			</p>
		</footer>
	);
};

export default AdminFooter;
