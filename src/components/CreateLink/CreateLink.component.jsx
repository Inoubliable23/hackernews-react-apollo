import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo';
import { withRouter } from 'react-router';

const CREATE_LINK = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`

const CreateLink = ({ history }) => {

	const [createLink] = useMutation(CREATE_LINK, {
		onCompleted: () => history.push('/')
 	});

	const [description, setDescription] = useState('');
	const [url, setUrl] = useState('');

	const handleSubmit = () => {
		createLink({
			variables: {
				url,
				description
			}
		});
	}

	return (
		<div>
			<div className="flex flex-column mt3">
				<input
					className="mb2"
					value={description}
					onChange={e => setDescription(e.target.value)}
					type="text"
					placeholder="A description for the link"
				/>
				<input
					className="mb2"
					value={url}
					onChange={e => setUrl(e.target.value)}
					type="text"
					placeholder="The URL for the link"
				/>
			</div>
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
}

export default withRouter(CreateLink);