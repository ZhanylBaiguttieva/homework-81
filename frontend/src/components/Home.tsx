import {useEffect, useState} from 'react';
import {apiURL} from '../../constants.ts';
import {useAppDispatch, useAppSelector} from '../app/hooks.ts';
import {createLink} from '../containers/linkThunks.ts';
import {selectLink} from '../containers/linkSlice.ts';

const Home:React.FC = () => {
  const [state, setState] = useState({
    originalUrl: ''
  });
  const [shortState, setShortState] = useState<string>('');
  const dispatch = useAppDispatch();
  const shortUrl = useAppSelector(selectLink);

  const changeUrl = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createLink(state));
    setState({
      originalUrl: ''
    });
  };

  useEffect(() => {
    if(shortUrl){
      setShortState(apiURL + '/' + shortUrl.shortUrl);
    }
  },[shortUrl]);

  return (
    <div>
      <h1>Shorten your link!</h1>
      <form onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="originalUrl"></label>
          <input
            type="text"
            name="originalUrl"
            id="originalUrl"
            className="form-control"
            placeholder={'Add your link'}
            value={state.originalUrl}
            onChange={changeUrl}
            required
          />
        </div>
        <button className="btn btn-primary mt-3"> Shorten!</button>
      </form>
      <a href={shortUrl?.originalUrl} target="_blank">{shortState}</a>
    </div>
  );
};

export default Home;