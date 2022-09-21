import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../routes';

class Layout extends Component {

    getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.layout === "/admin") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        render={props => (
                            <prop.component
                                {...props}
                            />
                        )}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    render() {
        return (
            <div>

                <Switch>{this.getRoutes(routes)}</Switch>

            </div>
        )
    }
}
export default Layout; 