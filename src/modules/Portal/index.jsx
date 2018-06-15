/*
 *
 * Copyright 2018 Observational Health Data Sciences and Informatics
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
 * Created: January 30, 2017
 *
 */

import { combineReducers } from 'redux';
import React from 'react';
import ducks from './ducks';
import AboutInfo from './components/AboutInfo/index';
import SearchInput from './components/Search/NavbarInput';
import MenuDropdown from './components/MenuDropdown';
import MenuUsername from './components/MenuDropdown/Username';

require('./styles/index.scss');

// if this is Node, allow if to show build number
const module = {
  actions: () => ducks.actions,
  reducer: () => combineReducers(ducks.reducer),
};

if (__APP_TYPE_CENTRAL__) {
  const InvitationList = require('./components/InvitationList/index').default;  // eslint-disable-line global-require,
	module.routes = () => require('./routes').default(); // eslint-disable-line global-require,
  module.menuItems = () => [
    <SearchInput />,
    <InvitationList />,
    <MenuDropdown />,
  ];
}

if (__APP_TYPE_NODE__) {
  module.menuItems = () => [
    <MenuUsername mods={['standalone']} />,
  ];
}

export default module;
