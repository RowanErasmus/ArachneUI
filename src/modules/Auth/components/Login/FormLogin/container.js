/*
 *
 * Copyright 2018 Odysseus Data Services, inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Company: Odysseus Data Services, Inc.
 * Product Owner/Architecture: Gregory Klebanov
 * Authors: Pavel Grafkin, Alexander Saltykov, Vitaly Koulakov, Anton Gackovka, Alexandr Ryabokon, Mikhail Mironov
 * Created: December 14, 2016
 *
 */

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import actions from 'actions/index';
import { paths, loginMessages, authMethods, nodeFunctionalModes } from 'modules/Auth/const';
import { get } from 'services/Utils';
import FormLogin from './presenter';
import Auth from 'services/Auth';

function mapStateToProps(state) {
  const authMethod = get(state, 'auth.authMethod.data.result.userOrigin', authMethods.JDBC);
  const allAuthMethods = get(state, 'auth.allAuthMethods.data.result', {[authMethods.JDBC]: null});
  const isUnactivated = get(state, 'form.login.submitErrors.unactivated', false);
  const userEmail = get(state, 'form.login.values.username', '');
  const isStandalone = get(state, 'auth.nodeMode.data.mode') === nodeFunctionalModes.Standalone;

  const userRequest = Auth.getUserRequest();

  return {
    // Fallback for datanode that still relies on /auth/method endpoint while central uses /auth/methods
    allAuthMethods : allAuthMethods || {[authMethod]: null},
    remindPasswordLink: paths.remindPassword(),
    initialValues: {
      username: userRequest,
      redirectTo: state.auth.authRoutingHistory.backUrl,
    },
    isUnactivated,
    userEmail,
    userRequest,
    isStandalone,
  };
}

const mapDispatchToProps = {
  login: actions.auth.login,
  resend: actions.auth.resendEmail,
  redirect: (url) => push(url),
  principal: actions.auth.principal.query,
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  return ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    resendEmail: () => dispatchProps.resend({}, { email: stateProps.userEmail })
      .then(() => dispatchProps.redirect(paths.login(loginMessages.resendDone)))
      .catch(() => {}),
    doSubmit: (data) => dispatchProps.login(data.username, data.password)
      .then(() => Auth.clearUserRequest())
      .then(() => dispatchProps.redirect((/\/auth\/logout/i).test(stateProps.initialValues.redirectTo) ? '/'
        : stateProps.initialValues.redirectTo || '/'))
      .then(() => dispatchProps.principal()),
  });
}

const ReduxFormLogin = reduxForm({
  form: 'login',
  enableReinitialize: true,
})(FormLogin);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ReduxFormLogin);

