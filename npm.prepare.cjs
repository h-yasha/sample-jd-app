try {
	require("husky").install();
	console.info("Husky installed");
} catch (error) {
	console.error("Installing husky failed.", error);
}
