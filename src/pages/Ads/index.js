import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { PageContainer } from '../../components/MainComponentes';
import AddItem from '../../components/partials/AddItem';
import { PageArea } from './styled';
import useAPI from '../../helpers/olxAPI';

const Home = props => {
  const api = useAPI();

  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [addList, setAddList] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    }
    getStates();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    }
    getCategories();
  }, []);

  useEffect(() => {
    const getRecentADS = async () => {
      const json = await api.getADS({
        sort: 'desc',
        limit: 8,
      });
      setAddList(json.ads);
    }
    getRecentADS();
  }, []);

  return (
    <PageContainer>
      <PageArea>
        <div className="leftSide">
          <form method="GET">
            <input type="text" name="q" />
            <div className="filterName">Estado:</div>
            <select name="state">
              <option></option>
              {stateList.map((item, i) =>
                <option key={i} value={item.name}>{item.name}</option>
              )}
            </select>

            <div className="filterName">Categoria:</div>
            <ul>
              {categories.map((item, i) =>
                <li key={i} className="categoryItem">
                  <img src={item.img} alt="" />
                  <span>{item.name}</span>
                </li>
              )}
            </ul>
          </form>
        </div>
        <div className="rightSide">
          ...
        </div>
      </PageArea>
    </PageContainer>
  );
}

export default Home;
