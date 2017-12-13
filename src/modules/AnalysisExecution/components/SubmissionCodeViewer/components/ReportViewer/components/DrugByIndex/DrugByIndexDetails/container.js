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
 * Authors: Alexander Saltykov
 * Created: November 20, 2017
 *
 */

import { ContainerBuilder, get } from 'services/Utils';
import {
  convertDataToLineChartData,
} from 'components/Reports/converters';
import DrugByIndexDetails from './presenter';

const DTO = {
  xValue: 'DURATION',
  yValue: 'COUNT_VALUE',
  yPercent: 'PCT_PERSONS',
};

export default class DrugByIndexDetailsBuilder extends ContainerBuilder {
  getComponent() {
    return DrugByIndexDetails;
  }

  mapStateToProps(state, ownProps) {
    const data = get(ownProps, 'data', null);

    return {
      data: data
        ? convertDataToLineChartData(data, DTO)
        : null,
    };
  }
}