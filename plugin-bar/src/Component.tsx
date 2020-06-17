/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import axios from "axios";

interface IHit {
  objectID: string;
  title: string;
  url: string;
}

interface IData {
  hits: IHit[];
}

interface IProps {
  text: string;
}

const defaultText =
  "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

const Component = ({ text }: IProps) => {
  const [data, setData] = React.useState<IData>({ hits: [] });
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(`http://hn.algolia.com/api/v1/search?query=${search}`);
      setData(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, [search]);

  return (
    <div className="custom-plugin">
      <div>
        <b>Custom plugin with css,fetch and lazy loading:</b> {text || defaultText}
      </div>
      <input type="text" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search" />
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Component;
