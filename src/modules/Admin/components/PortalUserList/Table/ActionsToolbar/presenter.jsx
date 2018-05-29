/*
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
 * Authors: Anton Gackovka
 * Created: May 23, 2018
 */

import BEMHelper from 'services/BemHelper';
import React, { Component } from 'react';
import { Toolbar, Button } from 'arachne-ui-components';
import { batchOperationType } from 'modules/Admin/const';

require('./style.scss');

/** @augments{ Component<any, any>} */
export default class ActionsToolbar extends Component{

  getButtons() {
    return [
      {
        onClick: console.log,
        tooltipText: 'New users',
        icon: 'fiber_new',
      },
      {
        onClick: this.props.batch.bind(null, batchOperationType.RESEND),
        tooltipText: 'Resend emails',
        icon: 'email',
      },
      {
        onClick: this.props.batch.bind(null, batchOperationType.ENABLE),
        tooltipText: 'Enable/Disable',
        icon: 'done',
      },
      {
        onClick: this.props.batch.bind(null, batchOperationType.CONFIRM),
        tooltipText: 'Confirm/Invalidate email',
        icon: 'verified_user',
      },
      {
        onClick: this.props.batch.bind(null, batchOperationType.DELETE),
        tooltipText: 'Delete',
        icon: 'delete',
      },
    ];
  }

  render() {

    const classes = new BEMHelper('admin-portal-user-list-actions-toolbar');
    const tooltipClass = new BEMHelper('tooltip');
    
    return (
      this.props.selectedUsers.length > 0 ?
        <div {...classes()}>
          <div {...classes()}>
            {
              this.getButtons().map(buttonSettings =>
                <Button onClick={buttonSettings.onClick}>
                  <i 
                    {...classes({element: 'btn-ico', extra: tooltipClass().className})}
                    aria-label={buttonSettings.tooltipText}
                    data-tootik-conf="bottom"
                  >{buttonSettings.icon}</i>
                </Button>)
            }
          </div>
          <span>{`Selected ${this.props.selectedUsers.length} elements`}</span>
        </div>
        :
        null
    );
  }
}