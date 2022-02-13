import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import DeliveryList from '~/pages/Delivery/List';
import DeliveryForm from '~/pages/Delivery/Form';
import DeliverymanList from '~/pages/Deliveryman/List';
import DeliverymanForm from '~/pages/Deliveryman/Form';
import RecipientList from '~/pages/Recipient/List';
import RecipientForm from '~/pages/Recipient/Form';
import DeliveryProblemList from '~/pages/DeliveryProblem/List';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" isPrivate component={DeliveryList} />
      <Route path="/delivery/new" isPrivate component={DeliveryForm} />
      <Route
        path="/delivery/:id/edit"
        exact
        isPrivate
        component={DeliveryForm}
      />

      <Route path="/deliverymen" isPrivate component={DeliverymanList} />
      <Route path="/deliveryman/new" isPrivate component={DeliverymanForm} />
      <Route
        path="/deliveryman/:id/edit"
        isPrivate
        component={DeliverymanForm}
      />

      <Route path="/recipients" isPrivate component={RecipientList} />
      <Route path="/recipient/new" isPrivate component={RecipientForm} />
      <Route path="/recipient/:id/edit" isPrivate component={RecipientForm} />

      <Route
        path="/delivery-problems"
        isPrivate
        component={DeliveryProblemList}
      />
    </Switch>
  );
}
