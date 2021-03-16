import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FormComponent from "./modules/form/form";
import Gallery from "./modules/gallery/gallery";
import SingleImage from "./modules/gallery/singleImage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <FormComponent />
          </Route>
          <Route exact path="/gallery">
            <Gallery />
          </Route>
          <Route exact path="/gallery">
            <Gallery />
          </Route>
          <Route path="/gallery/:id" component={SingleImage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
