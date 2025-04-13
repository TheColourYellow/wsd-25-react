import {useEffect, useState} from 'react';
import MediaRow from '../components/Mediarow';
import SingleView from '../components/SingleView';
import {fetchData} from '../../utils/fetchData.js';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);
  //const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log(selectedItem);

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
      );
      //setMediaArray(mediaData);

      //const userIds = data.map(({user_id}) => user_id);
      const url = import.meta.env.VITE_AUTH_API;
      const newData = await Promise.all(
        mediaData.map(async (item) => {
          const data = await fetchData(`${url}/users/${item.user_id}`);
          return {...item, username: data.username};
        }),
      );
      console.log('newdata', newData);
      setMediaArray(newData);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  console.log('mediaArray', mediaArray);

  return (
    <>
      <h2>My Media</h2>
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
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
    </>
  );
};
export default Home;
