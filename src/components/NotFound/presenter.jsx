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
 * Authors: Pavel Grafkin
 * Created: October 19, 2017
 *
 */

import React from 'react';
import BEMHelper from 'services/BemHelper';

require('./style.scss');

function NotFound() {
  const classes = new BEMHelper('not-found');

  return (
    <div
      {...classes()}
    >
      <div {...classes('title')}>
        Page not found
      </div>
    </div>
  );
}

export default NotFound;