import React, { useState, useEffect } from 'react';
import { PageArea } from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponentes';
import useAPI from '../../helpers/olxAPI';
import { doLogin } from '../../helpers/authHandler';

const Login = props => {
  const api = useAPI();

  const [name, setName] = useState('');
  const [stateLoc, setStateLoc] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [stateList, setStateList] = useState([]);

  const [disable, setDisabled] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates();
      setStateList(slist);
    };
    getStates();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setDisabled(true);
    setError('');

    if(password !== confirmPassword) {
      setError('Senhas não batem')
      setDisabled(false);
      return;
    };

    const json = await api.register(name, email, password, stateLoc);

    if (json.error)
      setError(json.error);
    else {
      doLogin(json.token);
      window.location.href = '/';
    };

    setDisabled(false);
  };

  return (
    <PageContainer>
      <PageTitle> Cadastro  </PageTitle>
      <PageArea>
        {error &&
          <ErrorMessage>{error}</ErrorMessage>
        }

        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Nome Completo</div>
            <div className="area--input">
              <input
                type="text"
                disabled={disable}
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Estado</div>
            <div className="area--input">
              <select value={stateLoc} onChange={e => setStateLoc(e.target.value)} required>
                <option></option>
                {stateList.map((item, i) =>
                  <option key={i} value={item._id}>{item.name}</option>
                )}
              </select>
            </div>
          </label>

          <label className="area">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input
                type="email"
                disabled={disable}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input
                type="password"
                disabled={disable}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Confirmar Senha</div>
            <div className="area--input">
              <input
                type="password"
                disabled={disable}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disable}>Fazer Cadastro</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
}

export default Login;
