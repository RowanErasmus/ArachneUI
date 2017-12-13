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
 * Created: November 14, 2017
 *
 */

import {
  treemap,
} from '@ohdsi/atlascharts/dist/atlascharts.umd';

export default (
  data,
  tableRowsMapper = (concept, normalData, i) => ({}),
  DTO = {
    path: 'CONCEPT_PATH',
  },
) => {
  const normalizedData = treemap.normalizeDataframe(data);
  if (!normalizedData[DTO.path]) {
    return [];
  }
  const tableData = normalizedData[DTO.path].map((row, i) => {
    const conceptDetails = row.split('||');

    return tableRowsMapper(conceptDetails, normalizedData, i);
  });

  return tableData;
};