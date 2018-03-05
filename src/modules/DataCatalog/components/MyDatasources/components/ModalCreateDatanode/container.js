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
  * Created: Wednesday, February 14, 2018 3:07 PM
  *
  */

//@ts-check
import { Component, PropTypes } from 'react';
import actions from 'actions';
import { ContainerBuilder, get } from 'services/Utils';
import { modal } from 'modules/DataCatalog/const';
import { ModalUtils } from 'arachne-ui-components';

import presenter from './presenter';


export class ModalCreateDatanode extends Component {
  static get propTypes() {
    return {
    };
  } 

  render() {
    return presenter(this.props);
  }
}
 
export default class ModalCreateDatanodeBuilder extends ContainerBuilder {
  getComponent() {
    return ModalCreateDatanode;
  }
  
  getModalParams() {
    return {
      name: modal.modalCreateDatanode,
    };
  }  
 
  mapStateToProps(state, ownProps) {     

    return {
    };
  }

  /**
   * @returns { { [x: string]: any } }
   */
  getMapDispatchToProps() {
    return {
      closeModal: () => ModalUtils.actions.toggle(modal.modalCreateDatanode, false),
      createDN: actions.dataCatalog.dataNode.create,
      openCreateDataSourceModal: dataNodeId => ModalUtils.actions.toggle(modal.modalCreateDataSource, true, { dataNodeId }),
    };
  }

  mergeProps(stateProps, dispatchProps, ownProps) {
    return {
      ...stateProps,
      ...dispatchProps,
      ...ownProps,
      async createDataNode({ name, description }) {
        const dataNode = await dispatchProps.createDN({}, { name, description });
        await dispatchProps.closeModal();
        dispatchProps.openCreateDataSourceModal(dataNode.centralId);
        return dataNode;
      },
    };
  }
}