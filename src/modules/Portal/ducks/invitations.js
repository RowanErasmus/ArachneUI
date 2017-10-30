/*
 *
 * Copyright 2017 Observational Health Data Sciences and Informatics
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
 * Created: October 06, 2017
 *
 */

import Duck from 'services/Duck';
import api from 'services/Api';
import { apiPaths } from 'modules/Portal/const';

const invitation = new Duck({
  name: 'PORTAL_INVITATION',
  urlBuilder: apiPaths.invitations,
});

function subscritionChanged() {
  return {
    type: 'PORTAL_INVITATION_SUBSCRIPTION',
    payload: null,
  };
}

export default {
  actions: {
    ...invitation.actions,
    acceptInvitation: urlParams =>
      invitation.actions.create({}, { accepted: true, ...urlParams }),
    rejectInvitation: urlParams =>
      invitation.actions.create({}, { accepted: false, ...urlParams }),
    subscribeToInvitations: () => {
      return (dispatch) => {
        dispatch(subscritionChanged());
        api.subscribe(apiPaths.invitationsSubscription(), () => {
          dispatch(invitation.actions.query());
        });
      };
    },
    unsubscribeOfInvitations: () => {
      return (dispatch) => {
        dispatch(subscritionChanged());
        api.unsubscribe(apiPaths.invitationsSubscription());
      };
    },
  },
  reducer: invitation.reducer,
};
