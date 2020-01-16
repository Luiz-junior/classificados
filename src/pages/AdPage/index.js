import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';

import { PageArea, Fake, OthersArea, BreadCrumb } from './styled';
import AddItem from '../../components/partials/AddItem';
import { PageContainer } from '../../components/MainComponentes';
import useAPI from '../../helpers/olxAPI';

const AdPage = props => {
  const api = useAPI();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [addInfo, setAddInfo] = useState({});

  useEffect(() => {
    const getAddInfo = async id => {
      const json = await api.getADD(id, true);
      setAddInfo(json);
      setLoading(false);
    }
    getAddInfo(id);
  }, []);

  const formatDate = date => {
    let cDate = new Date(date);

    let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'outubro', 'novembro', 'dezembro'];
    let cDay = cDate.getDate();
    let cMonth = cDate.getMonth();
    let cYear = cDate.getFullYear();

    return `${cDay} de ${months[cMonth]} de ${cYear}`;
  };

  return (
    <PageContainer>
      {addInfo.category &&
        <BreadCrumb>
          Você está aqui:
          <Link to="/"> Home </Link>
            /
          <Link to={`/ads?state=${addInfo.stateName}`}> {addInfo.stateName} </Link>
            /
          <Link to={`/ads?state=${addInfo.stateName}&cat=${addInfo.category.slug}`}> {addInfo.category.name} </Link>
            / {addInfo.title}
        </BreadCrumb>
      }

      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="addImage">
              {loading && <Fake height={300} />}
              {addInfo.images &&
                <Slide>
                  {addInfo.images.map((item, i) =>
                    <div key={i} className="each-slide">
                      <img src={item} alt="" />
                    </div>
                  )}
                </Slide>
              }
            </div>
            <div className="addInfo">
              <div className="addName">
                {loading && <Fake height={20} />}
                {addInfo.title &&
                  <h2>{addInfo.title}</h2>
                }
                {addInfo.dateCreated &&
                  <small>Criado em {formatDate(addInfo.dateCreated)}</small>
                }
              </div>
              <div className="addDescription">
                {loading && <Fake height={100} />}
                {addInfo.description}
                <hr />
                {addInfo.views &&
                  <small>Visualizações: {addInfo.views}</small>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="box box--padding">
            {loading && <Fake height={20} />}
            {addInfo.priceNegotiable &&
              "Preço Negociável"
            }
            {!addInfo.priceNegotiable && addInfo.price &&
              <div className="price"> Preço: <span>R$ {addInfo.price}</span> </div>
            }
          </div>

          {loading && <Fake height={50} />}
          {addInfo.userInfo &&
            <>
              <a href={`mailto:${addInfo.userInfo.email}`} target="_blank" className="contactSellerLink">Fale com o vendedor</a>
              <div className="created-by box box--padding">
                <strong>{addInfo.userInfo.email}</strong>
                <small>E-mail: {addInfo.userInfo.email}</small>
                <small>Estado: {addInfo.stateName}</small>
              </div>
            </>
          }

        </div>
      </PageArea>

      <OthersArea>
        {addInfo.others &&
          <>
            <h2>Outras ofertas do vendedor</h2>
            <div className="list">
              {addInfo.others.map((item, i) =>
                <AddItem key={i} data={item} />
              )}
            </div>
          </>
        }
      </OthersArea>
    </PageContainer>
  );
}

export default AdPage;
