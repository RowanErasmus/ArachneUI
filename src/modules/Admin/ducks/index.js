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
 * Created: October 02, 2017
 *
 */

import adminList from './adminList';
import tenantList from './tenantList';
import adminOptionList from './adminOptionList';
import portalUserConfirmEmail from './portalUserConfirmEmail';
import portalUserEnable from './portalUserEnable';
import portalUserList from './portalUserList';
import solrIndex from './solrIndex';
import systemSettings from './systemSettings';
import userOptionList from './userOptionList';
import userList from './userList';
import usersGroup from './usersGroup';
import reindexProcess from './reindexProcess';
import portalUserListSelectedUsers from './portalUserListSelectedUsers';
import countries from './countries';
import provinces from './provinces';
import engineStatus from './engineStatus';

const actions = {
  adminList: adminList.actions,
  tenantList: tenantList.actions,
  adminOptionList: adminOptionList.actions,
  portalUserConfirmEmail: portalUserConfirmEmail.actions,
  portalUserEnable: portalUserEnable.actions,
  portalUserList: portalUserList.actions,
  solrIndex: solrIndex.actions,
  systemSettings: systemSettings.actions,
  engineStatus: engineStatus.actions,
  userOptionList: userOptionList.actions,
  userList: userList.actions,
  usersGroup: usersGroup.actions,
  reindexProcess: reindexProcess.actions,
  portalUserListSelectedUsers: portalUserListSelectedUsers.actions,
  countries: countries.actions,
  provinces: provinces.actions,
};

const reducer = {
  adminList: adminList.reducer,
  tenantList: tenantList.reducer,
  adminOptionList: adminOptionList.reducer,
  portalUserConfirmEmail: portalUserConfirmEmail.reducer,
  portalUserEnable: portalUserEnable.reducer,
  portalUserList: portalUserList.reducer,
  solrIndex: solrIndex.reducer,
  systemSettings: systemSettings.reducer,
  engineStatus: engineStatus.reducer,
  userOptionList: userOptionList.reducer,
  userList: userList.reducer,
  usersGroup: usersGroup.reducer,
  reindexProcess: reindexProcess.reducer,
  portalUserListSelectedUsers: portalUserListSelectedUsers.reducer,
  countries: countries.reducer,
  provinces: provinces.reducer,
};

export default {
  actions,
  reducer,
};
