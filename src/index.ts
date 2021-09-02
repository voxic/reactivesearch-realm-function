import { getGeoQuery } from './targets/geo';
import { getRangeQuery } from './targets/range';
import { getSearchQuery } from './targets/search';
import { getTermQuery } from './targets/term';
import { ConfigType } from './types';

export class Realm {
	config: ConfigType;

	constructor(config?: ConfigType) {
		if (config) {
			this.config = config;
		}
	}

	// TODO define type for mongo query
	query = (data: any[]) => {
		// TODO decide query format from set of multiple queries

		// pipeline used by mongodb aggregation
		// TODO set type as per mongo query type
		let aggPipeline: any = [];

		data.forEach((item) => {
			if (item.type === `search`) {
				aggPipeline = [...aggPipeline, ...getSearchQuery(item)];
			}

			if (item.type === `geo`) {
				aggPipeline = [...aggPipeline, ...getGeoQuery(item)];
			}

			if (item.type == `term`) {
				aggPipeline = [...aggPipeline, ...getTermQuery(item)];
			}

			if (item.type == `range`) {
				aggPipeline = [...aggPipeline, ...getRangeQuery(item)];
			}
		});

		return aggPipeline;
	};
}
