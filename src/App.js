import React from 'react';
import LinkList from './components/LinkList/LinkList.component';
import CreateLink from './components/CreateLink/CreateLink.component';

function App() {
  return (
		<div>
			<CreateLink />
			<LinkList />
		</div>
  );
}

export default App;