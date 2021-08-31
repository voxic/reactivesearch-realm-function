import { RSQuery } from 'src/types';

// TODO set return type
export const getSearchQuery = (query: RSQuery<string>): any => {
	console.log(typeof query.value);
	const search: any = {
		text: {
			query: query.value,
			path: query.dataField,
		},
	};

	if (query.index) {
		search.index = query.index;
	}

	return [
		{ $search: search },
		{ $limit: query.size || 10 },
		{ $skip: query.from || 0 },
	];
};
