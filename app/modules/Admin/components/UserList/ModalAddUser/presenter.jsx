/**
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
 * Created: April 24, 2017
 *
 */

import React from 'react';
import { Modal } from 'arachne-components';
import { Form } from 'arachne-components';
import { FormInput } from 'arachne-components';
import { FormAutocomplete } from 'arachne-components';
import BEMHelper from 'services/BemHelper';

require('./style.scss');

function ModalAddUser(props) {
  const classes = new BEMHelper('admin-panel-modal-add-user');
  
  const fields = [
    {
      name: 'userId',
      InputComponent: {
        component: FormAutocomplete,
        props: {
          mods: ['bordered'],
          placeholder: 'Search by name',
          options: props.userOptions,
          fetchOptions: props.loadUserOptions,
          clearable: false,
        }
      }
    },
  ];

  const submitBtn = {
    label: 'Add',
    loadingLabel: 'Adding...',
    mods: ['success', 'rounded'],
  }

  const cancelBtn = {
    label: 'Cancel',
  }

  return (
  	<Modal modal={props.modal} title="Add user">
  		<div {...classes()}>
  			<Form
          mods="spacing-sm"
  				fields={fields}
  				submitBtn={submitBtn}
          cancelBtn={cancelBtn}
  				onSubmit={props.doSubmit}
          onCancel={props.modal.close}
  				{...props}
  			/>
  		</div>
  	</Modal>
  );
}

export default ModalAddUser;