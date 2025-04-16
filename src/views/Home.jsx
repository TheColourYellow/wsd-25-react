import {useEffect, useState} from 'react';
import MediaRow from '../components/Mediarow';
import SingleView from '../components/SingleView';
import {useMedia} from '../hooks/apiHooks.js';

const Home = () => {
  const {mediaArray} = useMedia();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <h2>My Media</h2>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Owner</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Home;
