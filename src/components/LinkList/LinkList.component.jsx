import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import Link from '../Link/Link.component';

const FEED_QUERY = gql`
	{
		feed {
			links {
				id
				createdAt
				url
				description
			}
		}
	}
`

const LinkList = () => {

	const { loading, data } = useQuery(FEED_QUERY);

	return (
		<div>
			{
				loading ?
				<div>Loading...</div>
				:
				data.feed.links.map(link => (
					<Link key={link.id} link={link} />
				))
			}
		</div>
	);
}

export default LinkList;