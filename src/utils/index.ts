export const getContainerWidth = (width: number) => {
	if (width > 1000) {
		return "calc(100% - 400px)";
	} else if (width > 800) {
		return "calc(100% - 300px)";
	} else if (width > 600) {
		return "calc(100% - 100px)";
	} else {
		return "calc(100% - 60px)";
	}
};
