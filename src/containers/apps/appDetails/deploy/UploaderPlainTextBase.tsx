import { Button, Input, Row } from 'antd'
import Toaster from '../../../../utils/Toaster'
import ApiComponent from '../../../global/ApiComponent'

export default abstract class UploaderPlainTextBase extends ApiComponent<
    {
        appName: string
        onUploadSucceeded: () => void
    },
    {
        userEnteredValue: string
        uploadInProcess: boolean
    }
> {
    constructor(props: any) {
        super(props)
        this.state = {
            userEnteredValue: '',
            uploadInProcess: false,
        }
    }

    protected abstract getPlaceHolderValue(): string

    protected abstract convertDataToSoteriaDefinition(
        userEnteredValue: string
    ): string

    protected isSingleLine(): boolean {
        return false
    }

    startDeploy(soteriaDefinitionToBeUploaded: string) {
        const self = this

        Promise.resolve() //
            .then(function () {
                self.setState({ uploadInProcess: true })
                return self.apiManager.uploadSoteriaDefinitionContent(
                    self.props.appName,
                    JSON.parse(soteriaDefinitionToBeUploaded),
                    '',
                    true
                )
            })
            .then(function () {
                self.setState({ userEnteredValue: '' })
                self.props.onUploadSucceeded()
            })
            .catch(Toaster.createCatcher())
            .then(function () {
                self.setState({ uploadInProcess: false })
            })
    }

    createTextArea() {
        const self = this
        if (self.isSingleLine()) {
            return (
                <Input
                    className="code-input"
                    placeholder={self.getPlaceHolderValue()}
                    value={self.state.userEnteredValue}
                    onChange={(e) => {
                        self.setState({
                            userEnteredValue: e.target.value,
                        })
                    }}
                />
            )
        }

        return (
            <Input.TextArea
                className="code-input"
                placeholder={self.getPlaceHolderValue()}
                rows={7}
                value={self.state.userEnteredValue}
                onChange={(e) => {
                    self.setState({
                        userEnteredValue: e.target.value,
                    })
                }}
            />
        )
    }

    render() {
        const self = this
        return (
            <div style={{ padding: 16 }}>
                <Row>{self.createTextArea()}</Row>
                <div style={{ height: 20 }} />
                <Row justify="end">
                    <Button
                        disabled={
                            self.state.uploadInProcess ||
                            !self.state.userEnteredValue.trim()
                        }
                        type="primary"
                        onClick={() =>
                            self.startDeploy(
                                self.convertDataToSoteriaDefinition(
                                    self.state.userEnteredValue
                                )
                            )
                        }
                    >
                        Deploy Now
                    </Button>
                </Row>
            </div>
        )
    }
}
