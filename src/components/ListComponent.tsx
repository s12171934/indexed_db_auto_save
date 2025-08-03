import './ListComponent.css';

interface ListComponentProps {
  title: string;
  list: string[];
}

const ListComponent: React.FC<ListComponentProps> = ({ title, list }) => {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {index + 1}. {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListComponent;
