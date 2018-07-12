import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './Components/Navigation/Navigation';

class App extends Component {
  state = {
    baseroute: "/cloud",
    breadcrumb: [],
    files: [],
  }

  updateBreadcrumb(path) {
    this.setState({ 
      breadcrumb: path.split('/').map((item, index, array) => {
        return {route:array.map((x, y) => {if(y<=index) return x}).join('/'), folderName: item}
      })
    });
  }

  navigateTo(path) {
    this.updateBreadcrumb(path);

    switch(path){
      case "/":case "":
      this.setState({ 
        isLoaded: true, 
        files: [{name:".","url":"/.",type:"dir",last_modif:"14/12/2017 20:15"},{name:"..","url":"/..",type:"dir",last_modif:"23/05/2018 19:08"},{name:"Documents","url":"/Documents",type:"dir",last_modif:"12/11/2017 15:33"},{name:"markdown_cheatsheet.md",type:"file",url:"/markdown_cheatsheet.md",size:"2,82 Ko",last_modif:"05/06/2018 19:02"},{name:"notes.md",type:"file",url:"/notes.md",size:"2,85 Ko",last_modif:"20/12/2017 8:53"},{name:"speedshare",type:"file",url:"/speedshare",size:"245 o",last_modif:"26/09/2017 8:51"}],
      });
      break;
      case "/Documents":
      this.setState({
        isLoaded: true,
        files: [{name:"Test","url":"/Documents/Test",type:"dir",last_modif:"12/11/2017 15:33"},{name:"speedshare",type:"file",url:"/speedshare",size:"245 o",last_modif:"26/09/2017 8:51"},],
      });
      break;
      default: 
      this.setState({
        isLoaded: true,
        files: [{name:"Root","url":"",type:"dir",last_modif:"00/00/0000 00:00"},],
      });
      break;
    }
    
    /*/ Should work in prod
    this.setState({isLoaded: false});

    fetch("/api/cloud/updatepath", {method: 'POST', body: { "path": path }})
    .then(function(res){ return res.json(); })
    .then(
      (json) => {
        this.setState({ 
          isLoaded: true, 
          files : json
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
    /*/
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      console.log("Route change (" + action + "). New location : " + location.pathname + location.search + location.hash);
      switch (action) {
        case 'PUSH' : // location pathname change
        this.navigateTo(location.pathname.replace(this.state.baseroute, ''));
        break;
        case 'POP' : // location hash change
        /* TODO : update file preview */
        break;
        default: break;
      }
    });

    this.navigateTo(window.location.pathname.replace(this.state.baseroute, ''));
  }
  componentWillUnmount() {
      this.unlisten();
  }

  render() {
    const { files, breadcrumb, baseroute } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactApp</h1>
        </header>
        <div>
          <Navigation breadcrumb={breadcrumb} files={files} baseroute={baseroute} />
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
