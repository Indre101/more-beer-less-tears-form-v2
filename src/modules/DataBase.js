// get beer info
const GetBeerTypes = async () => {
	const beerData = await fetch(
		"https://more-beers-less-tears-data.herokuapp.com/beertypes"
	);

	const response = await beerData.json();
	return response;
};

// get all bar data
const GetData = async () => {
	const barData = await fetch("https://more-beers-less-tears-data.herokuapp.com");
	const response = await barData.json();
	return response;
};

// post order
const PostOrder = async (newOrder, setordderNumber) => {
	const data = await fetch(`https://more-beers-less-tears-data.herokuapp.com/order`, {
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json; charset=utf-8",
		},
		body: JSON.stringify(newOrder),
	});

	const response = await data.json();
	return response;
};
const DataBase = { PostOrder, GetBeerTypes, GetData };

export default DataBase;
