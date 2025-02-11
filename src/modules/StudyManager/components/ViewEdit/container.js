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
 * Created: December 13, 2016
 *
 */

import { Component, PropTypes } from 'react';
import actions from 'actions';
import { get } from 'services/Utils';
import { push as goToPage } from 'react-router-redux';
import { paths as workspacePaths } from 'modules/Workspace/const';
import { studyKind, participantRoles as roles } from 'modules/StudyManager/const';
import presenter from './presenter';
import { ActiveModuleAwareContainerBuilder } from 'modules/StudyManager/utils';
import isEmpty from 'lodash/isEmpty';
import { isViewable } from 'services/Utils';
import { isModuleEnabled } from '../../../utils';
import { modulePaths } from '../../../const';

export class ViewEditStudy extends Component {
  static get propTypes() {
    return {
      id: PropTypes.number,
      studyTitle: PropTypes.string,
      isLoading: PropTypes.bool,
      accessGranted: PropTypes.bool,
      loadTypeList: PropTypes.func,
      loadAnalysisTypeList: PropTypes.func,
      loadStatusList: PropTypes.func,
      loadStudy: PropTypes.func,
      loadInsights: PropTypes.func,
      loadTransitions: PropTypes.func,
      canView: PropTypes.bool,
      isStudyLoadingComplete: PropTypes.bool,
    };
  }

  componentWillMount() {
    this.state = {
      openedSection: 'Documents',
    };
    this.onTabChange = this.onTabChange.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps && Array.isArray(nextProps.participants) && nextProps.kind === studyKind.WORKSPACE) {
      const leadId = this.props.participants.find(v => v.role.id === roles.LEAD_INVESTIGATOR).id;
      this.props.goToWorkspace(leadId);
      return;
    }
    if (this.props.id !== nextProps.id && nextProps.id) {
      this.props.loadStudy({ id: nextProps.id });
    }
    if (this.props.isStudyLoadingComplete === false && nextProps.isStudyLoadingComplete === true
      && nextProps.canView
    ) {
      this.loadDetailedInfo(nextProps);
    }
  }

  onTabChange(openedSection) {
    this.setState({
      openedSection,
    });
  }

  loadDetailedInfo(nextProps) {
    this.props.loadTypeList();
    this.props.loadAnalysisTypeList();
    this.props.loadStatusList();
    if (this.props.isInsightEnabled) {
      this.props.loadInsights({ studyId: nextProps.id });
    }
    this.props.loadTransitions({ studyId: nextProps.id });
  }

  render() {
    return presenter({
      ...this.props,
      ...this.state,
      onTabChange: this.onTabChange,
    });
  }
}

export default class ViewEditStudyBuilder extends ActiveModuleAwareContainerBuilder {
  getComponent() {
    return ViewEditStudy;
  }

  mapStateToProps(state, ownProps) {
    const moduleState = get(state, 'studyManager');
    const studyData = get(moduleState, 'study.data', {});
    const pageTitle = [
      studyData ? get(studyData, 'title') : '',
      'My studies',
    ];
    const isStudyLoading = get(moduleState, 'study.isLoading');
    const isStudyUpdating = get(moduleState, 'study.isUpdating');
    const isTypesLoading = get(moduleState, 'typeList.isLoading');
    const participants = get(studyData, 'participants');
    const isParticipantsLoading = get(participants, 'isSaving');

    const kind = get(studyData, 'kind');
    const isStudyLoadingComplete = !isEmpty(studyData) && !isStudyLoading;
    const canView = isViewable(studyData);
    const isInsightEnabled = isModuleEnabled(state, modulePaths.insightsLibrary);

    return {
      id: parseInt(ownProps.routeParams.studyId, 10),
      studyTitle: pageTitle.join(' | '),
      isLoading: isStudyLoading || isStudyUpdating || isTypesLoading || isParticipantsLoading,
      participants,
      kind,
      canView,
      isStudyLoadingComplete,
      isInsightEnabled,
    };
  }

  /**
  * @returns { { [x: string]: any } }
  */
  getMapDispatchToProps() {
    return {
      loadTypeList: actions.studyManager.typeList.find,
      loadAnalysisTypeList: actions.studyManager.analysisTypes.find,
      loadStatusList: actions.studyManager.statusList.find,
      loadStudy: actions.studyManager.study.find,
      loadInsights: actions.studyManager.studyInsights.find,
      loadTransitions: actions.studyManager.availableTransitions.query,
      goToWorkspace: leadId => goToPage(workspacePaths.userWorkspace(leadId)),
    };
  }

  mergeProps(stateProps, dispatchProps, ownProps) {
    return {
      ...ownProps,
      ...stateProps,
      ...dispatchProps,
      onBannerActed: () => dispatchProps.loadStudy({ id: stateProps.id }),
    };
  }

  getFetchers({ params, dispatch, getState }) {
    const studyId = params.studyId;
    return {
      ...super.getFetchers({ params, dispatch, getState }),
      loadStudy: dispatch(actions.studyManager.study.find({ id: studyId }))
        .then(studyData => this.setKind(get(studyData, 'kind'))),
    };
  }

}
