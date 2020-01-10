import React, { useState } from 'react';
import { PageArea } from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponentes';
import useAPI from '../../helpers/olxAPI';
import { doLogin } from '../../helpers/authHandler';

const Login = props => {
  const api = useAPI();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [disable, setDisabled] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setDisabled(true);
    setError('');

    const json = await api.login(email, password);

    if (json.error)
      setError(json.error);
    else {
      doLogin(json.token, rememberPassword);
      window.location.href = '/';
    };

    setDisabled(false);
  };

  return (
    <PageContainer>
      <PageTitle> Login </PageTitle>
      <PageArea>
        { error &&
          <ErrorMessage>{ error }</ErrorMessage>
        }

        <form onSubmit={handleSubmit}>
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
            <div className="area--title">Lembrar Senha</div>
            <div className="area">
              <input
                type="checkbox"
                disabled={disable}
                checked={rememberPassword}
                onChange={() => setRememberPassword(!rememberPassword)}
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disable}>Fazer Login</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  );
}

export default Login;
