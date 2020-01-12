import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { PageContainer } from '../../components/MainComponentes';
import AddItem from '../../components/partials/AddItem';
import { PageArea, SearchArea } from './styled';
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
    <>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form method="GET" action="/ads">
              <input type="text" name="q" placeholder="O que você procura?" />
              <select name="state">
                {stateList.map((item, i) =>
                  <option key={i} value={item.name}>{item.name}</option>
                )}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>
          <div className="categoryList">
            {categories.map((item, i) =>
              <Link key={i} to={`/ads?cat=${item.slug}`} className="categoryItem">
                <img src={item.img} alt="" />
                <span>{ item.name }</span>
              </Link>
            )}
          </div>
        </PageContainer>
      </SearchArea>

      <PageContainer>
        <PageArea>
          <h2>Anúncios Recentes</h2>
          <div className="list">
            {addList.map((item, i) => 
              <AddItem key={i} data={item} />
            )}
          </div>
          <Link to="/ads" className="seeAllLink"> Ver todos </Link>
          <hr />

          <p>
            Loerem ca camicioandoicandiocand acnaodjcnaodncaoidcnaoidchad cahdcoadhco
          </p>
      </PageArea>
      </PageContainer>
    </>
  );
}

export default Home;
