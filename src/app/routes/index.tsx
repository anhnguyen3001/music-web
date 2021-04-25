import { MainLayout } from "app/layouts/MainLayout";
import AlbumDetail from "app/pages/album-detail";
import Home from 'app/pages/home';
import GenreList from "app/pages/genre-list";
import GenreDetail from "app/pages/genre-detail";
import SearchPage from "app/pages/search";
import SingerDetail from "app/pages/singer-detail";
import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RoutePaths } from "../constants";
import SingerList from "app/pages/singer-list";

interface RoutesProps {
  basename: string;
}

export const Routes = connect(
)(({ basename }: RoutesProps) => {

  return (
    <>
      <Router basename={basename}>
        <MainLayout>
          <Switch>
            <Route path={RoutePaths.Home.Index} exact component={Home} />
            <Route path={`${RoutePaths.Album.Detail}`} exact component={AlbumDetail} />
            <Route path={`${RoutePaths.Genre.Index}`} exact component={GenreList} />
            <Route path={`${RoutePaths.Genre.Detail}`} component={GenreDetail} />
            <Route path={`${RoutePaths.Singer.Detail}`} exact component={SingerDetail} />
            <Route path={`${RoutePaths.Singer.Index}`} exact component={SingerList} />
            <Route path={`${RoutePaths.Search.Index}/:keyword`} exact component={SearchPage} />
          </Switch>
        </MainLayout>
      </Router>
    </>
  );
});
