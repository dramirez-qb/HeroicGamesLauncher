import React, {useState} from "react";

import "./App.css";
import { Library } from "./components/Library";
import { Game, getLegendaryConfig } from "./helper";
import Login from './components/UI/Login';

interface State {
  user: string;
  library: Array<Game>;
}

function App() {
  const [config, setConfig] = useState({} as State);
  const [refreshing, setRefreshing] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  const handleOnClick = (action: string) => {
    setShowLogin(!showLogin)
  }

  React.useEffect(() => {
    const updateConfig = async () => {
      const newConfig = await getLegendaryConfig();
      newConfig && setConfig(newConfig);
    };
    updateConfig();
  }, [refreshing]);

  if (!Object.entries(config).length) {
    return null
  }

  const { user, library } = config;
  
    return (
      <>
        {
        showLogin ? 
        <Login user={user} refresh={setRefreshing} /> :
        <Library 
          library={library}
          user={user}
          refresh={setRefreshing}
        />
        }
        </>
    );
  }

export default App;
