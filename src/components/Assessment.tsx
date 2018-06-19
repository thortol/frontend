import { Button, Card, Dialog, NonIdealState, Spinner, Text } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import * as React from 'react'

import Workspace from '../containers/workspace'
import { OwnProps as ControlBarOwnProps } from './workspace/ControlBar'
import { SideContentTab } from './workspace/side-content'

export type AssessmentInfo = {
  longSummary: string
  dueDate: string
  studentBriefed: boolean
}

export type AssessmentProps = DispatchProps & OwnProps & StateProps

export type StateProps = {
  assessmentInfo?: AssessmentInfo
}

export type OwnProps = { missionId: number }

export type DispatchProps = {
  handleAssessmentInfoFetch: (missionId: number) => void
}

class Assessment extends React.Component<AssessmentProps, { showOverlay: boolean }> {
  public state = { showOverlay: true }

  public render() {
    if (this.props.assessmentInfo === undefined) {
      this.props.handleAssessmentInfoFetch(this.props.missionId)
      return (
        <NonIdealState
          className="Assessment pt-dark"
          description="Getting mission ready..."
          visual={<Spinner large={true} />}
        />
      )
    }
    const briefing = <Text> {this.props.assessmentInfo.longSummary} </Text>
    const overlay = (
      <Dialog
        className="mission-briefing"
        isOpen={this.state.showOverlay && !this.props.assessmentInfo.studentBriefed}
      >
        <Card>
          {briefing}
          <Button
            className="mission-briefing-button"
            // tslint:disable-next-line jsx-no-lambda
            onClick={() => this.setState({ showOverlay: false })}
            text="Continue"
          />
        </Card>
      </Dialog>
    )
    const briefingTab: SideContentTab = {
      label: 'Briefing',
      icon: IconNames.BRIEFCASE,
      body: briefing
    }
    const controlBarOptions: ControlBarOwnProps = {
      hasChapterSelect: false,
      hasNextButton: true,
      hasPreviousButton: true,
      hasSaveButton: true,
      hasShareButton: false
    }
    return (
      <div className="Assessment pt-dark">
        {overlay}
        <Workspace controlBarOptions={controlBarOptions} sideContentTabs={[briefingTab]} />
      </div>
    )
  }
}

export default Assessment