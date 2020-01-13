import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageArea, Fake } from './styled';
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
      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="addImage">
              {loading && <Fake height={300} />}
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
          </div>
          <div className="box box--padding">
            {loading && <Fake height={50} />}
          </div>
        </div>
      </PageArea>
    </PageContainer>
  );
}

export default AdPage;
