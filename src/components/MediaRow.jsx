// src/components/MediaRow.jsx
import PropTypes from 'prop-types';
import {Link} from 'react-router';

const MediaRow = (props) => {
  const {item, setSelectedItem} = props;

  const handleClick = () => {
    setSelectedItem(item);
  };
  return (
    // TODO: move <tr> element in foreach from Home.jsx here
    <tr className="*:border-2 *:border-[#ccc] *:p-4" key={item.media_id}>
      <td>
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-52 object-cover"
        />
      </td>
      <td>{item.title}</td>
      <td>{item.username}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td className="p-0!">
        {/* <button onClick={handleClick}>View</button> */}
        <Link
          className="p-8 hover:bg-amber-300 hover:text-gray-900"
          to="/single"
          state={{item}}
          onClick={(event) => {
            event.preventDefault();
            setSelectedItem(item);
          }}
        >
          View
        </Link>
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;
